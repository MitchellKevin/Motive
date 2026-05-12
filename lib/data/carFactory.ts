import type { Car, BodyType, FuelType } from "./cars";

// ─── Brand data tables ───────────────────────────────────────────────────────

const RELIABILITY: Record<string, number> = {
  toyota: 9.5, honda: 9.0, mazda: 8.5, lexus: 9.0, subaru: 8.5,
  hyundai: 8.0, kia: 8.0, genesis: 8.0, dacia: 8.0,
  volkswagen: 7.5, skoda: 7.5, seat: 7.5, cupra: 7.5, porsche: 8.0,
  volvo: 7.5, ford: 7.5, nissan: 7.5, mitsubishi: 7.5,
  suzuki: 8.0, mg: 7.0, polestar: 7.0,
  bmw: 7.0, mercedes: 7.0, "mercedes-benz": 7.0, audi: 7.0,
  opel: 6.5, vauxhall: 6.5, peugeot: 6.5, citroën: 6.5, citroen: 6.5,
  renault: 6.5, fiat: 6.0, "alfa romeo": 6.0, lancia: 6.0,
  tesla: 6.5, mini: 6.5, "land rover": 6.0, jeep: 6.0,
  chrysler: 5.5, dodge: 5.5, chevrolet: 6.5, buick: 7.0,
};

const MAINTENANCE_BASE: Record<string, number> = {
  toyota: 550, honda: 600, dacia: 600, suzuki: 600,
  hyundai: 650, kia: 650, nissan: 700, ford: 700, opel: 700, vauxhall: 700,
  volkswagen: 800, skoda: 800, seat: 800, cupra: 900, renault: 750,
  peugeot: 750, citroën: 750, citroen: 750, fiat: 800, volvo: 950,
  bmw: 1200, mercedes: 1300, audi: 1100, porsche: 1500,
  "land rover": 1600, jeep: 900, tesla: 450, mini: 1000, polestar: 600,
  mg: 650, genesis: 850, "alfa romeo": 1100, mazda: 650,
};

const INSURANCE_FACTOR: Record<string, number> = {
  dacia: 0.025, toyota: 0.027, honda: 0.027, suzuki: 0.027,
  hyundai: 0.028, kia: 0.028, mazda: 0.028, nissan: 0.028,
  volkswagen: 0.030, skoda: 0.029, seat: 0.029, ford: 0.030, opel: 0.030,
  renault: 0.030, peugeot: 0.030, citroën: 0.030, citroen: 0.030,
  fiat: 0.031, volvo: 0.031, mg: 0.029,
  bmw: 0.034, mercedes: 0.035, audi: 0.033, porsche: 0.040,
  tesla: 0.040, mini: 0.033, "land rover": 0.038, jeep: 0.031,
  polestar: 0.035, cupra: 0.031, genesis: 0.032, "alfa romeo": 0.034,
};

// ─── Imagin.studio slug mapping ──────────────────────────────────────────────

const IMAGIN_MAKE: Record<string, string> = {
  "mercedes-benz": "mercedes-benz",
  "alfa romeo": "alfa-romeo",
  "land rover": "land-rover",
};

const IMAGIN_MODEL: Record<string, string> = {
  "3 series": "3-series", "5 series": "5-series", "7 series": "7-series",
  "1 series": "1-series", "2 series": "2-series", "4 series": "4-series",
  "x1": "x1", "x2": "x2", "x3": "x3", "x5": "x5", "ix3": "ix3", "i4": "i4",
  "c-class": "c-class", "e-class": "e-class", "s-class": "s-class",
  "a-class": "a-class", "b-class": "b-class", "glc": "glc", "gle": "gle",
  "gla": "gla", "glb": "glb", "eqa": "eqa", "eqb": "eqb", "eqc": "eqc",
  "model 3": "model-3", "model y": "model-y", "model s": "model-s",
  "id.3": "id.3", "id.4": "id.4", "id.5": "id.5", "id.7": "id.7",
  "q4 e-tron": "q4-e-tron", "q5": "q5", "q7": "q7", "q3": "q3", "q8": "q8",
  "cx-5": "cx5", "cx-30": "cx30", "cx-60": "cx60",
  "niro ev": "niro", "niro": "niro",
  "ioniq 5": "ioniq5", "ioniq 6": "ioniq6",
  "3008": "3008", "5008": "5008", "2008": "2008",
  "c3 aircross": "c3-aircross", "c4": "c4", "c5 x": "c5x",
  "kona": "kona", "santa fe": "santa-fe", "tucson": "tucson",
  "i10": "i10", "i20": "i20", "i30": "i30",
  "c-hr": "c-hr", "bz4x": "bz4x", "aygo x": "aygo",
  "leaf": "leaf", "ariya": "ariya", "qashqai": "qashqai",
  "formentor": "formentor", "born": "born",
  "enyaq": "enyaq", "octavia": "octavia", "fabia": "fabia", "scala": "scala",
  "superb": "superb", "kodiaq": "kodiaq", "karoq": "karoq", "kamiq": "kamiq",
  "tiguan": "tiguan", "t-roc": "t-roc", "touareg": "touareg",
  "passat": "passat", "golf": "golf", "polo": "polo",
  "xc40": "xc40", "xc60": "xc60", "xc90": "xc90",
  "v60": "v60", "s60": "s60", "ex30": "ex30", "ex40": "ex40",
  "mégane e-tech": "megane", "mégane": "megane", "megane e-tech": "megane", "megane": "megane",
  "clio": "clio", "captur": "captur", "austral": "austral",
  "puma": "puma", "kuga": "kuga", "focus": "focus", "fiesta": "fiesta", "explorer": "explorer",
  "sandero": "sandero", "duster": "duster",
  "stelvio": "stelvio", "giulia": "giulia", "tonale": "tonale",
  "defender": "defender", "compass": "compass",
  "outlander": "outlander",
  "sportage": "sportage", "sorento": "sorento", "ev6": "ev6", "stonic": "stonic", "ceed": "ceed",
  "mg4": "mg4", "zs": "mgzs",
  "2 series active tourer": "2-series-active-tourer",
};

function imaginstudioUrl(make: string, model: string): string {
  const makeKey = make.toLowerCase();
  const modelKey = model.toLowerCase();
  const imMake = IMAGIN_MAKE[makeKey] ?? makeKey.replace(/\s+/g, "-");
  const imModel = IMAGIN_MODEL[modelKey] ?? modelKey.replace(/\s+/g, "-").replace(/[^a-z0-9-\.]/g, "");
  return `https://cdn.imagin.studio/getimage?customer=img&zoomType=fullscreen&angle=29&make=${imMake}&modelFamily=${imModel}`;
}

// ─── Score calculators ───────────────────────────────────────────────────────

function clamp(val: number, min = 0, max = 10) {
  return Math.min(max, Math.max(min, val));
}

function parkingScore(length: number, width: number) {
  let s = 10;
  if (length > 4100) s -= (length - 4100) / 250;
  if (length > 4600) s -= (length - 4600) / 150;
  if (width > 1800) s -= (width - 1800) / 150;
  return clamp(Math.round(s * 10) / 10);
}

function familyScore(seats: number, boot: number) {
  const seatPts = seats >= 7 ? 5 : seats >= 5 ? 4 : seats === 4 ? 2 : 1;
  const bootPts = boot >= 600 ? 5 : boot >= 450 ? 4 : boot >= 350 ? 3 : boot >= 250 ? 2 : 1;
  return clamp(seatPts + bootPts);
}

function cityScore(length: number, lkm: number, fuelType: FuelType) {
  const lenPts = clamp((4400 - length) / 120, 0, 5);
  const fuelPts = fuelType === "electric" ? 5 : fuelType === "hybrid" ? 4 : clamp(5 - (lkm - 4) * 0.4, 0, 5);
  return clamp(Math.round((lenPts + fuelPts) * 10) / 10);
}

function highwayScore(body: BodyType, hp: number, acc: number) {
  const bodyBase: Record<BodyType, number> = {
    wagon: 8.5, sedan: 8.0, suv: 7.5, crossover: 7.5,
    hatchback: 7.0, coupe: 8.0, minivan: 7.0,
  };
  let s = bodyBase[body] ?? 7.0;
  if (hp > 200) s += 0.5;
  if (hp > 300) s += 0.5;
  if (acc < 7) s += 0.5;
  return clamp(Math.round(s * 10) / 10);
}

function runningCostScore(fuelType: FuelType, lkm: number, make: string) {
  const maintBase = MAINTENANCE_BASE[make.toLowerCase()] ?? 800;
  const maintPts = clamp((1400 - maintBase) / 120, 0, 5);
  let fuelPts: number;
  if (fuelType === "electric") {
    fuelPts = 5.0; // cheap to run
  } else if (fuelType === "hybrid") {
    fuelPts = clamp(5 - (lkm - 3.5) * 0.4, 0, 5);
  } else {
    fuelPts = clamp(5 - (lkm - 4.5) * 0.5, 0, 5);
  }
  return clamp(Math.round((maintPts + fuelPts) * 10) / 10);
}

function performanceScore(hp: number, acc: number) {
  const hpPts = clamp((hp - 90) / 50, 0, 5);
  const accPts = clamp((12 - acc) / 1.0, 0, 5);
  return clamp(Math.round((hpPts + accPts) * 10) / 10);
}

function comfortScore(body: BodyType, length: number, hp: number) {
  const base: Record<BodyType, number> = {
    sedan: 8.5, wagon: 8.0, suv: 8.0, minivan: 8.5,
    hatchback: 7.0, crossover: 7.5, coupe: 7.5,
  };
  let s = base[body] ?? 7.0;
  if (length > 4500) s += 0.5;
  if (hp > 150) s += 0.3;
  return clamp(Math.round(s * 10) / 10);
}

function roadTripScore(body: BodyType, boot: number, hp: number, fuelType: FuelType) {
  const base: Record<BodyType, number> = {
    wagon: 9.0, suv: 8.5, sedan: 8.0, crossover: 8.0,
    minivan: 8.5, hatchback: 7.0, coupe: 6.5,
  };
  let s = base[body] ?? 7.0;
  if (boot >= 600) s += 0.5;
  if (boot >= 700) s += 0.5;
  if (hp > 180) s += 0.3;
  if (fuelType === "electric") s -= 0.5; // range anxiety for long trips
  return clamp(Math.round(s * 10) / 10);
}

function evScore(evRange: number | null, fuelType: FuelType): number {
  if (!evRange || (fuelType !== "electric" && fuelType !== "phev")) return 0;
  if (fuelType === "phev") return clamp(2 + evRange / 25);
  return clamp(4 + (evRange - 200) / 80);
}

function yearlyInsurance(make: string, price: number): number {
  const factor = INSURANCE_FACTOR[make.toLowerCase()] ?? 0.030;
  return Math.round(price * factor / 50) * 50;
}

function yearlyMaintenance(make: string, fuelType: FuelType): number {
  const base = MAINTENANCE_BASE[make.toLowerCase()] ?? 800;
  const evDiscount = fuelType === "electric" ? 0.65 : fuelType === "hybrid" ? 0.85 : 1.0;
  return Math.round((base * evDiscount) / 50) * 50;
}

function yearlyFuelCost(fuelType: FuelType, consumption: number, km: number): number {
  if (fuelType === "electric") {
    return Math.round(((consumption * km) / 100) * 0.30 / 10) * 10; // €0.30/kWh home
  }
  if (fuelType === "phev") {
    return Math.round(((consumption * km * 0.5) / 100) * 1.90 / 10) * 10;
  }
  const pricePerL = fuelType === "diesel" ? 1.75 : 1.90;
  return Math.round(((consumption * km) / 100) * pricePerL / 10) * 10;
}

// ─── Tagline generator ────────────────────────────────────────────────────────

function tagline(make: string, model: string, body: BodyType, fuel: FuelType, reliScore: number, pScore: number, fScore: number, cityS: number, hwS: number): string {
  if (fuel === "electric" && pScore >= 8) return `${make}'s most capable EV — fast and efficient`;
  if (fuel === "electric") return `Practical electric car for smart daily driving`;
  if (fuel === "phev") return `Plug-in hybrid — best of both worlds`;
  if (body === "wagon" && fScore >= 8.5) return `Spacious family wagon with class-leading practicality`;
  if (body === "suv" && fScore >= 8) return `Family SUV built for real life`;
  if (body === "suv" && pScore >= 8) return `Capable SUV for adventurous families`;
  if (body === "crossover" && cityS >= 8) return `Compact crossover — versatile city and weekend car`;
  if (reliScore >= 9) return `The reliable choice — fewer surprises over 5 years`;
  if (cityS >= 9) return `The perfect city companion — small, nimble, efficient`;
  if (hwS >= 9) return `Built for motorway comfort and long-distance driving`;
  return `Versatile ${body} that covers all bases`;
}

// ─── Pros/cons generator ─────────────────────────────────────────────────────

function autoPros(
  make: string, body: BodyType, fuel: FuelType,
  reliScore: number, pScore: number, fScore: number, rcScore: number, evR: number | null
): string[] {
  const pros: string[] = [];
  if (reliScore >= 9) pros.push("Outstanding long-term reliability track record");
  else if (reliScore >= 8) pros.push("Above-average reliability for peace of mind");
  if (rcScore >= 8.5) pros.push("Very low running costs over the ownership period");
  if (pScore >= 9) pros.push("Fits in the tightest parking spots with ease");
  if (fScore >= 9) pros.push("Exceptional family space — comfortable for 5 adults");
  else if (fScore >= 8) pros.push("Generous passenger and luggage space");
  if (fuel === "electric" && evR && evR >= 500) pros.push(`${evR}km range — no range anxiety on European trips`);
  else if (fuel === "electric") pros.push("Low electricity costs vs petrol equivalent");
  if (fuel === "hybrid") pros.push("Self-charging hybrid — no plug required");
  if (fuel === "phev") pros.push("Short commutes on electric, long trips on petrol");
  if (body === "wagon") pros.push("Class-leading boot space for families and gear");
  return pros.slice(0, 4);
}

function autoCons(
  make: string, body: BodyType, fuel: FuelType,
  reliScore: number, pScore: number, fScore: number, rcScore: number,
  length: number, price: number, evR: number | null
): string[] {
  const cons: string[] = [];
  if (reliScore <= 6.5) cons.push("Below-average reliability — budget for unexpected repairs");
  if (pScore <= 5) cons.push(`Long body (${(length / 1000).toFixed(2)}m) — challenging in tight urban spaces`);
  if (rcScore <= 6) cons.push("Higher running costs than segment average");
  if (fuel === "electric" && (!evR || evR < 350)) cons.push("Limited range — best suited for home-charging commuters");
  const maintBase = MAINTENANCE_BASE[make.toLowerCase()] ?? 800;
  if (maintBase >= 1100) cons.push("Premium servicing costs — factor into total ownership");
  if (price > 55000) cons.push("Premium price tag may not suit all budgets");
  if (body === "suv" && length > 4600) cons.push("Wide footprint — difficult to park in older city centres");
  if (fuel === "diesel" && length < 4200) cons.push("Diesel best suited for higher annual mileage");
  return cons.slice(0, 3);
}

// ─── Public factory function ─────────────────────────────────────────────────

export interface CompactCarSpec {
  id: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  type: BodyType;
  fuel: FuelType;
  len: number;   // mm
  wid: number;   // mm
  ht: number;    // mm
  seats: number;
  boot: number;  // liters
  bootMax?: number;
  hp: number;
  acc: number;   // 0–100 s
  price: number; // EUR
  cons: number;  // L or kWh / 100km
  evR?: number;  // km WLTP
  // Optional overrides
  tag?: string;
  reliOverride?: number;
}

export function buildCar(s: CompactCarSpec): Car {
  const reliScore = s.reliOverride ?? RELIABILITY[s.make.toLowerCase()] ?? 7.0;
  const pScore = parkingScore(s.len, s.wid);
  const fScore = familyScore(s.seats, s.boot);
  const cityS = cityScore(s.len, s.cons, s.fuel);
  const hwS = highwayScore(s.type, s.hp, s.acc);
  const rcScore = runningCostScore(s.fuel, s.cons, s.make);
  const perfScore = performanceScore(s.hp, s.acc);
  const comfScore = comfortScore(s.type, s.len, s.hp);
  const roadScore = roadTripScore(s.type, s.boot, s.hp, s.fuel);
  const evS = evScore(s.evR ?? null, s.fuel);

  const ins = yearlyInsurance(s.make, s.price);
  const maint = yearlyMaintenance(s.make, s.fuel);
  const fuel20k = yearlyFuelCost(s.fuel, s.cons, 20000);

  return {
    id: s.id,
    make: s.make,
    model: s.model,
    variant: s.variant ?? `${s.hp}hp · ${s.year}`,
    year: s.year,
    bodyType: s.type,
    fuelType: s.fuel,
    length: s.len,
    width: s.wid,
    height: s.ht,
    seats: s.seats,
    bootLiters: s.boot,
    bootLitersMax: s.bootMax ?? Math.round(s.boot * 2.4),
    horsePower: s.hp,
    acceleration: s.acc,
    topSpeed: Math.round(Math.sqrt(s.hp * 1600)),
    priceNew: s.price,
    fuelConsumption: s.cons,
    evRange: s.evR ?? null,
    yearlyInsurance: ins,
    yearlyMaintenance: maint,
    yearlyFuelCost: fuel20k,
    reliabilityScore: reliScore,
    familyScore: fScore,
    cityScore: cityS,
    highwayScore: hwS,
    runningCostScore: rcScore,
    parkingScore: pScore,
    roadTripScore: roadScore,
    performanceScore: perfScore,
    comfortScore: comfScore,
    evScore: evS,
    tagline: s.tag ?? tagline(s.make, s.model, s.type, s.fuel, reliScore, pScore, fScore, cityS, hwS),
    pros: autoPros(s.make, s.type, s.fuel, reliScore, pScore, fScore, rcScore, s.evR ?? null),
    cons: autoCons(s.make, s.type, s.fuel, reliScore, pScore, fScore, rcScore, s.len, s.price, s.evR ?? null),
    imageUrl: imaginstudioUrl(s.make, s.model),
    color: "#C8C8C0",
  };
}
