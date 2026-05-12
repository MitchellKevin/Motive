import { Car } from "@/lib/data/cars";
import { allCars as cars } from "@/lib/data/allCars";

export type DrivingStyle = "city" | "mixed" | "highway";
export type GarageType = "compact" | "standard" | "large" | "street";
export type Priority =
  | "low_costs"
  | "reliability"
  | "comfort"
  | "family_space"
  | "parking_ease"
  | "performance"
  | "ev_range"
  | "road_trips";

export interface UserPreferences {
  budget: number;
  familySize: number; // 1–5+
  yearlyKm: number;
  hasHomeCharging: boolean;
  drivingStyle: DrivingStyle;
  garageType: GarageType;
  priorities: Priority[];
}

export interface ScoredCar {
  car: Car;
  matchScore: number; // 0–100
  breakdown: {
    budget: number;
    driving: number;
    family: number;
    priorities: number;
    ev: number;
    parking: number;
  };
  yearlyCost: number;
  warnings: string[];
}

const PRIORITY_WEIGHTS: Record<Priority, { score: keyof Car; label: string }> = {
  low_costs: { score: "runningCostScore", label: "Running Costs" },
  reliability: { score: "reliabilityScore", label: "Reliability" },
  comfort: { score: "comfortScore", label: "Comfort" },
  family_space: { score: "familyScore", label: "Family Space" },
  parking_ease: { score: "parkingScore", label: "Parking Ease" },
  performance: { score: "performanceScore", label: "Performance" },
  ev_range: { score: "evScore", label: "EV Range" },
  road_trips: { score: "roadTripScore", label: "Road Trips" },
};

function calcYearlyCost(car: Car, yearlyKm: number): number {
  const fuelMultiplier = yearlyKm / 20000;
  const fuel =
    car.fuelType === "electric"
      ? (car.fuelConsumption * yearlyKm * 0.3) / 100 // kWh at €0.30
      : (car.fuelConsumption * yearlyKm * 1.85) / 100; // L at €1.85
  return Math.round(car.yearlyInsurance + car.yearlyMaintenance + fuel * fuelMultiplier);
}

export function scoreCarForUser(car: Car, prefs: UserPreferences): ScoredCar | null {
  const warnings: string[] = [];
  let totalScore = 0;
  const breakdown = { budget: 0, driving: 0, family: 0, priorities: 0, ev: 0, parking: 0 };

  // --- Budget (25 points) ---
  if (car.priceNew > prefs.budget * 1.2) {
    // More than 20% over budget — exclude
    return null;
  }
  if (car.priceNew <= prefs.budget) {
    breakdown.budget = 25;
  } else {
    // 0–20% over budget: linear penalty
    const overBy = (car.priceNew - prefs.budget) / prefs.budget;
    breakdown.budget = Math.round(25 * (1 - overBy / 0.2));
  }
  totalScore += breakdown.budget;

  // --- Driving style (15 points) ---
  let drivingScore: number;
  if (prefs.drivingStyle === "city") {
    drivingScore = car.cityScore;
  } else if (prefs.drivingStyle === "highway") {
    drivingScore = car.highwayScore;
  } else {
    drivingScore = (car.cityScore + car.highwayScore) / 2;
  }
  breakdown.driving = Math.round((drivingScore / 10) * 15);
  totalScore += breakdown.driving;

  // --- Family / seats (15 points) ---
  if (prefs.familySize >= 5 && car.seats < 5) {
    warnings.push("Only 4 seats — tight for larger groups");
    breakdown.family = 3;
  } else if (prefs.familySize >= 4 && car.familyScore < 7) {
    warnings.push("Limited space for a family of 4");
    breakdown.family = Math.round((car.familyScore / 10) * 10);
  } else {
    breakdown.family = Math.round((car.familyScore / 10) * 15);
  }
  totalScore += breakdown.family;

  // --- Priorities (30 points total, split across selected priorities) ---
  const activePriorities =
    prefs.priorities.length > 0
      ? prefs.priorities
      : (["reliability", "low_costs", "comfort"] as Priority[]);
  const pointsEach = 30 / activePriorities.length;
  let priorityTotal = 0;
  for (const p of activePriorities) {
    const key = PRIORITY_WEIGHTS[p].score;
    const val = car[key] as number;
    priorityTotal += (val / 10) * pointsEach;

    // EV range priority without home charging
    if (p === "ev_range" && car.fuelType !== "electric" && car.fuelType !== "phev") {
      // Non-EV car with EV-range priority — partial score
      priorityTotal -= pointsEach * 0.4;
    }
  }
  breakdown.priorities = Math.round(Math.max(0, priorityTotal));
  totalScore += breakdown.priorities;

  // --- EV penalties/bonuses (10 points) ---
  const isEV = car.fuelType === "electric" || car.fuelType === "phev";
  if (isEV && !prefs.hasHomeCharging) {
    breakdown.ev = -8;
    warnings.push("No home charging — running costs increase significantly");
  } else if (isEV && prefs.hasHomeCharging) {
    breakdown.ev = 10;
  } else if (!isEV && prefs.priorities.includes("ev_range")) {
    breakdown.ev = 0;
  } else {
    breakdown.ev = 5; // neutral
  }
  totalScore += breakdown.ev;

  // Yearly km + EV range check
  if (car.fuelType === "electric" && car.evRange && prefs.yearlyKm > 40000) {
    if (car.evRange < 400) {
      warnings.push("High mileage — will need frequent public charging");
    }
  }

  // --- Parking (5 points) ---
  const garageMaxLength: Record<GarageType, number> = {
    compact: 4200,
    standard: 5000,
    large: 6000,
    street: 5500,
  };
  if (car.length > garageMaxLength[prefs.garageType]) {
    breakdown.parking = 0;
    warnings.push(`Car length (${(car.length / 1000).toFixed(2)}m) may be tight for your garage`);
  } else {
    breakdown.parking = Math.round((car.parkingScore / 10) * 5);
  }
  totalScore += breakdown.parking;

  // Clamp to 0–100
  const matchScore = Math.min(100, Math.max(0, Math.round(totalScore)));

  return {
    car,
    matchScore,
    breakdown,
    yearlyCost: calcYearlyCost(car, prefs.yearlyKm),
    warnings,
  };
}

export function getTopMatches(prefs: UserPreferences, limit = 5): ScoredCar[] {
  const scored = cars
    .map((car) => scoreCarForUser(car, prefs))
    .filter((s): s is ScoredCar => s !== null)
    .sort((a, b) => b.matchScore - a.matchScore);

  return scored.slice(0, limit);
}

export const SCORE_LABELS: Record<Priority, string> = {
  low_costs: "Running Costs",
  reliability: "Reliability",
  comfort: "Comfort",
  family_space: "Family",
  parking_ease: "Parking",
  performance: "Performance",
  ev_range: "EV Range",
  road_trips: "Road Trips",
};

export const ALL_SCORES = [
  { key: "familyScore", label: "Family" },
  { key: "cityScore", label: "City" },
  { key: "highwayScore", label: "Highway" },
  { key: "reliabilityScore", label: "Reliability" },
  { key: "runningCostScore", label: "Running Costs" },
  { key: "parkingScore", label: "Parking" },
  { key: "roadTripScore", label: "Road Trips" },
  { key: "comfortScore", label: "Comfort" },
] as const;
