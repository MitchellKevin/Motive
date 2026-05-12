import { buildCar, type CompactCarSpec } from "./carFactory";
import type { Car } from "./cars";

// Format: { id, make, model, year, type, fuel, len, wid, ht, seats, boot, hp, acc, price, cons, evR? }
// Dimensions in mm. Prices in EUR. Consumption in L/100km or kWh/100km for EVs.

const specs: CompactCarSpec[] = [

  // ── CITY / A-SEGMENT ──────────────────────────────────────────────────────
  { id: "toyota-aygo-x", make: "Toyota", model: "Aygo X", year: 2024, type: "hatchback", fuel: "petrol", len: 3700, wid: 1665, ht: 1500, seats: 5, boot: 231, hp: 72, acc: 14.9, price: 15900, cons: 5.2 },
  { id: "kia-picanto", make: "Kia", model: "Picanto", year: 2024, type: "hatchback", fuel: "petrol", len: 3595, wid: 1595, ht: 1490, seats: 5, boot: 255, hp: 85, acc: 13.5, price: 14900, cons: 5.3 },
  { id: "hyundai-i10", make: "Hyundai", model: "i10", year: 2024, type: "hatchback", fuel: "petrol", len: 3675, wid: 1680, ht: 1505, seats: 5, boot: 252, hp: 100, acc: 12.0, price: 15900, cons: 5.2 },
  { id: "vw-up", make: "Volkswagen", model: "Up!", year: 2023, type: "hatchback", fuel: "petrol", len: 3600, wid: 1645, ht: 1478, seats: 4, boot: 251, hp: 75, acc: 14.4, price: 14800, cons: 4.9 },
  { id: "renault-twingo", make: "Renault", model: "Twingo", year: 2023, type: "hatchback", fuel: "petrol", len: 3615, wid: 1646, ht: 1545, seats: 4, boot: 219, hp: 95, acc: 12.5, price: 15500, cons: 5.5 },
  { id: "fiat-500", make: "Fiat", model: "500", year: 2024, type: "hatchback", fuel: "petrol", len: 3571, wid: 1627, ht: 1488, seats: 4, boot: 185, hp: 70, acc: 13.5, price: 17500, cons: 5.3 },
  { id: "smart-fortwo", make: "Smart", model: "ForTwo", year: 2023, type: "hatchback", fuel: "petrol", len: 2695, wid: 1663, ht: 1555, seats: 2, boot: 185, hp: 90, acc: 10.9, price: 16500, cons: 5.0 },

  // ── SUPERMINIS / B-SEGMENT ────────────────────────────────────────────────
  { id: "vw-polo", make: "Volkswagen", model: "Polo", year: 2024, type: "hatchback", fuel: "petrol", len: 4053, wid: 1751, ht: 1461, seats: 5, boot: 351, hp: 95, acc: 10.4, price: 24500, cons: 5.1 },
  { id: "peugeot-208", make: "Peugeot", model: "208", year: 2024, type: "hatchback", fuel: "petrol", len: 4055, wid: 1745, ht: 1430, seats: 5, boot: 311, hp: 100, acc: 9.9, price: 23900, cons: 5.3 },
  { id: "renault-clio", make: "Renault", model: "Clio", year: 2024, type: "hatchback", fuel: "hybrid", len: 4050, wid: 1798, ht: 1440, seats: 5, boot: 391, hp: 140, acc: 9.9, price: 24500, cons: 4.5 },
  { id: "seat-ibiza", make: "SEAT", model: "Ibiza", year: 2024, type: "hatchback", fuel: "petrol", len: 4059, wid: 1780, ht: 1444, seats: 5, boot: 355, hp: 110, acc: 9.4, price: 21900, cons: 5.2 },
  { id: "hyundai-i20", make: "Hyundai", model: "i20", year: 2024, type: "hatchback", fuel: "petrol", len: 4040, wid: 1780, ht: 1450, seats: 5, boot: 352, hp: 100, acc: 10.2, price: 22500, cons: 5.5 },
  { id: "kia-rio", make: "Kia", model: "Rio", year: 2023, type: "hatchback", fuel: "petrol", len: 4065, wid: 1725, ht: 1455, seats: 5, boot: 325, hp: 100, acc: 10.5, price: 20900, cons: 5.4 },
  { id: "ford-fiesta", make: "Ford", model: "Fiesta", year: 2023, type: "hatchback", fuel: "petrol", len: 4064, wid: 1735, ht: 1476, seats: 5, boot: 311, hp: 125, acc: 9.0, price: 22500, cons: 5.3 },
  { id: "opel-corsa", make: "Opel", model: "Corsa", year: 2024, type: "hatchback", fuel: "petrol", len: 4060, wid: 1765, ht: 1430, seats: 5, boot: 309, hp: 100, acc: 9.9, price: 22400, cons: 5.4 },
  { id: "skoda-fabia", make: "Škoda", model: "Fabia", year: 2024, type: "hatchback", fuel: "petrol", len: 4108, wid: 1780, ht: 1470, seats: 5, boot: 380, hp: 110, acc: 9.8, price: 22900, cons: 5.2 },
  { id: "toyota-yaris", make: "Toyota", model: "Yaris", year: 2024, type: "hatchback", fuel: "hybrid", len: 3940, wid: 1745, ht: 1500, seats: 5, boot: 286, hp: 116, acc: 9.9, price: 23900, cons: 3.8 },
  { id: "mazda2", make: "Mazda", model: "2", year: 2023, type: "hatchback", fuel: "petrol", len: 4065, wid: 1695, ht: 1500, seats: 5, boot: 280, hp: 90, acc: 11.0, price: 22500, cons: 5.3 },
  { id: "honda-jazz", make: "Honda", model: "Jazz", year: 2024, type: "hatchback", fuel: "hybrid", len: 3995, wid: 1694, ht: 1525, seats: 5, boot: 304, hp: 109, acc: 10.8, price: 26500, cons: 4.5 },
  { id: "dacia-sandero", make: "Dacia", model: "Sandero", year: 2024, type: "hatchback", fuel: "petrol", len: 4088, wid: 1771, ht: 1520, seats: 5, boot: 328, hp: 90, acc: 11.2, price: 13500, cons: 5.8 },
  { id: "citroen-c3", make: "Citroën", model: "C3", year: 2024, type: "hatchback", fuel: "petrol", len: 3981, wid: 1756, ht: 1576, seats: 5, boot: 315, hp: 100, acc: 10.5, price: 19900, cons: 5.5 },
  { id: "mini-cooper", make: "MINI", model: "Cooper", year: 2024, type: "hatchback", fuel: "petrol", len: 3821, wid: 1727, ht: 1414, seats: 4, boot: 211, hp: 136, acc: 8.3, price: 29900, cons: 5.5 },
  { id: "suzuki-swift", make: "Suzuki", model: "Swift", year: 2024, type: "hatchback", fuel: "hybrid", len: 3860, wid: 1735, ht: 1480, seats: 5, boot: 265, hp: 82, acc: 10.7, price: 18900, cons: 4.7 },
  { id: "nissan-micra", make: "Nissan", model: "Micra", year: 2023, type: "hatchback", fuel: "petrol", len: 4075, wid: 1743, ht: 1455, seats: 5, boot: 300, hp: 117, acc: 9.9, price: 22500, cons: 5.5 },

  // ── COMPACT / C-SEGMENT ───────────────────────────────────────────────────
  { id: "vw-golf", make: "Volkswagen", model: "Golf", year: 2024, type: "hatchback", fuel: "hybrid", len: 4284, wid: 1789, ht: 1491, seats: 5, boot: 380, hp: 130, acc: 8.5, price: 33500, cons: 5.2 },
  { id: "toyota-corolla", make: "Toyota", model: "Corolla", year: 2024, type: "hatchback", fuel: "hybrid", len: 4375, wid: 1780, ht: 1435, seats: 5, boot: 217, hp: 140, acc: 7.9, price: 31900, cons: 4.4 },
  { id: "peugeot-308", make: "Peugeot", model: "308", year: 2024, type: "hatchback", fuel: "petrol", len: 4365, wid: 1852, ht: 1444, seats: 5, boot: 412, hp: 130, acc: 9.3, price: 29900, cons: 5.7 },
  { id: "ford-focus", make: "Ford", model: "Focus", year: 2023, type: "hatchback", fuel: "petrol", len: 4378, wid: 1825, ht: 1471, seats: 5, boot: 375, hp: 125, acc: 9.5, price: 28500, cons: 5.7 },
  { id: "opel-astra", make: "Opel", model: "Astra", year: 2024, type: "hatchback", fuel: "petrol", len: 4374, wid: 1860, ht: 1430, seats: 5, boot: 422, hp: 130, acc: 9.2, price: 29500, cons: 5.6 },
  { id: "hyundai-i30", make: "Hyundai", model: "i30", year: 2024, type: "hatchback", fuel: "petrol", len: 4340, wid: 1795, ht: 1455, seats: 5, boot: 395, hp: 120, acc: 10.0, price: 27500, cons: 5.8 },
  { id: "kia-ceed", make: "Kia", model: "Ceed", year: 2024, type: "hatchback", fuel: "petrol", len: 4310, wid: 1780, ht: 1455, seats: 5, boot: 395, hp: 120, acc: 10.1, price: 26900, cons: 5.7 },
  { id: "mazda3", make: "Mazda", model: "3", year: 2024, type: "hatchback", fuel: "petrol", len: 4460, wid: 1797, ht: 1440, seats: 5, boot: 358, hp: 150, acc: 8.5, price: 29500, cons: 5.8 },
  { id: "seat-leon", make: "SEAT", model: "León", year: 2024, type: "hatchback", fuel: "petrol", len: 4368, wid: 1799, ht: 1440, seats: 5, boot: 380, hp: 130, acc: 8.9, price: 27500, cons: 5.6 },
  { id: "cupra-leon", make: "Cupra", model: "León", year: 2024, type: "hatchback", fuel: "phev", len: 4368, wid: 1799, ht: 1440, seats: 5, boot: 345, hp: 245, acc: 6.7, price: 39900, cons: 1.4, evR: 63 },
  { id: "skoda-scala", make: "Škoda", model: "Scala", year: 2024, type: "hatchback", fuel: "petrol", len: 4362, wid: 1793, ht: 1471, seats: 5, boot: 467, hp: 116, acc: 9.7, price: 26900, cons: 5.5 },
  { id: "bmw-1series", make: "BMW", model: "1 Series", year: 2024, type: "hatchback", fuel: "petrol", len: 4361, wid: 1799, ht: 1434, seats: 5, boot: 380, hp: 136, acc: 8.5, price: 38500, cons: 5.9 },
  { id: "audi-a3", make: "Audi", model: "A3", year: 2024, type: "hatchback", fuel: "petrol", len: 4343, wid: 1816, ht: 1426, seats: 5, boot: 380, hp: 150, acc: 8.4, price: 38500, cons: 5.7 },
  { id: "mercedes-aclass", make: "Mercedes-Benz", model: "A-Class", year: 2023, type: "hatchback", fuel: "petrol", len: 4419, wid: 1796, ht: 1410, seats: 5, boot: 370, hp: 136, acc: 8.7, price: 39900, cons: 6.1 },
  { id: "honda-civic", make: "Honda", model: "Civic", year: 2024, type: "hatchback", fuel: "hybrid", len: 4550, wid: 1802, ht: 1415, seats: 5, boot: 415, hp: 184, acc: 8.4, price: 35900, cons: 4.6 },
  { id: "renault-megane", make: "Renault", model: "Mégane", year: 2023, type: "hatchback", fuel: "petrol", len: 4359, wid: 1814, ht: 1445, seats: 5, boot: 435, hp: 140, acc: 8.9, price: 26900, cons: 5.9 },
  { id: "cupra-born", make: "Cupra", model: "Born", year: 2024, type: "hatchback", fuel: "electric", len: 4322, wid: 1809, ht: 1540, seats: 5, boot: 385, hp: 231, acc: 7.0, price: 39900, cons: 15.9, evR: 420 },

  // ── FAMILY WAGONS ─────────────────────────────────────────────────────────
  { id: "skoda-octavia-combi", make: "Škoda", model: "Octavia Combi", year: 2024, type: "wagon", fuel: "petrol", len: 4689, wid: 1829, ht: 1470, seats: 5, boot: 640, bootMax: 1700, hp: 150, acc: 8.0, price: 32900, cons: 5.8 },
  { id: "vw-golf-variant", make: "Volkswagen", model: "Golf Variant", year: 2024, type: "wagon", fuel: "petrol", len: 4633, wid: 1789, ht: 1513, seats: 5, boot: 611, bootMax: 1642, hp: 130, acc: 8.9, price: 36500, cons: 5.6 },
  { id: "toyota-corolla-touring", make: "Toyota", model: "Corolla Touring", year: 2024, type: "wagon", fuel: "hybrid", len: 4650, wid: 1780, ht: 1460, seats: 5, boot: 596, bootMax: 1554, hp: 196, acc: 7.5, price: 38900, cons: 4.7 },
  { id: "ford-focus-estate", make: "Ford", model: "Focus Estate", year: 2023, type: "wagon", fuel: "petrol", len: 4665, wid: 1825, ht: 1498, seats: 5, boot: 575, hp: 125, acc: 9.9, price: 31500, cons: 6.0 },
  { id: "opel-astra-st", make: "Opel", model: "Astra Sports Tourer", year: 2024, type: "wagon", fuel: "petrol", len: 4642, wid: 1860, ht: 1478, seats: 5, boot: 516, hp: 130, acc: 9.4, price: 33500, cons: 5.9 },
  { id: "peugeot-308sw", make: "Peugeot", model: "308 SW", year: 2024, type: "wagon", fuel: "petrol", len: 4637, wid: 1852, ht: 1468, seats: 5, boot: 608, bootMax: 1634, hp: 130, acc: 9.7, price: 34500, cons: 5.7 },
  { id: "hyundai-i30-wagon", make: "Hyundai", model: "i30 Wagon", year: 2024, type: "wagon", fuel: "petrol", len: 4585, wid: 1795, ht: 1485, seats: 5, boot: 602, hp: 120, acc: 10.2, price: 31500, cons: 6.0 },
  { id: "kia-ceed-sw", make: "Kia", model: "Ceed SW", year: 2024, type: "wagon", fuel: "petrol", len: 4600, wid: 1780, ht: 1475, seats: 5, boot: 625, hp: 120, acc: 10.3, price: 30900, cons: 5.9 },
  { id: "volvo-v60", make: "Volvo", model: "V60", year: 2024, type: "wagon", fuel: "hybrid", len: 4761, wid: 1850, ht: 1432, seats: 5, boot: 529, hp: 250, acc: 6.7, price: 54900, cons: 5.2 },
  { id: "bmw-3series-touring", make: "BMW", model: "3 Series Touring", year: 2024, type: "wagon", fuel: "petrol", len: 4709, wid: 1827, ht: 1440, seats: 5, boot: 500, bootMax: 1500, hp: 184, acc: 7.5, price: 56900, cons: 6.5 },

  // ── EXECUTIVE SALOONS / D-SEGMENT ─────────────────────────────────────────
  { id: "vw-passat-variant", make: "Volkswagen", model: "Passat Variant", year: 2024, type: "wagon", fuel: "hybrid", len: 4916, wid: 1852, ht: 1517, seats: 5, boot: 690, bootMax: 1920, hp: 150, acc: 8.7, price: 46900, cons: 5.9 },
  { id: "skoda-superb-combi", make: "Škoda", model: "Superb Combi", year: 2024, type: "wagon", fuel: "petrol", len: 4902, wid: 1849, ht: 1474, seats: 5, boot: 690, bootMax: 1800, hp: 150, acc: 8.8, price: 44900, cons: 5.8 },
  { id: "bmw-3series", make: "BMW", model: "3 Series", year: 2024, type: "sedan", fuel: "petrol", len: 4709, wid: 1827, ht: 1435, seats: 5, boot: 480, hp: 184, acc: 7.5, price: 51900, cons: 6.5 },
  { id: "bmw-5series", make: "BMW", model: "5 Series", year: 2024, type: "sedan", fuel: "petrol", len: 5060, wid: 1900, ht: 1515, seats: 5, boot: 520, hp: 245, acc: 6.2, price: 68900, cons: 7.0 },
  { id: "mercedes-cclass", make: "Mercedes-Benz", model: "C-Class", year: 2024, type: "sedan", fuel: "petrol", len: 4751, wid: 1820, ht: 1438, seats: 5, boot: 455, hp: 204, acc: 7.3, price: 53900, cons: 6.9 },
  { id: "mercedes-eclass", make: "Mercedes-Benz", model: "E-Class", year: 2024, type: "sedan", fuel: "petrol", len: 4949, wid: 1880, ht: 1468, seats: 5, boot: 540, hp: 204, acc: 7.3, price: 65900, cons: 7.2 },
  { id: "audi-a4", make: "Audi", model: "A4", year: 2023, type: "sedan", fuel: "petrol", len: 4762, wid: 1847, ht: 1430, seats: 5, boot: 480, hp: 150, acc: 8.5, price: 47900, cons: 6.3 },
  { id: "audi-a6", make: "Audi", model: "A6", year: 2024, type: "sedan", fuel: "petrol", len: 4939, wid: 1886, ht: 1457, seats: 5, boot: 530, hp: 204, acc: 7.7, price: 63900, cons: 7.0 },
  { id: "volvo-s60", make: "Volvo", model: "S60", year: 2024, type: "sedan", fuel: "phev", len: 4761, wid: 1850, ht: 1431, seats: 5, boot: 442, hp: 455, acc: 4.5, price: 58900, cons: 1.6, evR: 90 },
  { id: "toyota-camry", make: "Toyota", model: "Camry", year: 2024, type: "sedan", fuel: "hybrid", len: 4885, wid: 1840, ht: 1445, seats: 5, boot: 524, hp: 218, acc: 8.3, price: 43900, cons: 5.0 },

  // ── SMALL CROSSOVERS / SUV-B ──────────────────────────────────────────────
  { id: "vw-troc", make: "Volkswagen", model: "T-Roc", year: 2024, type: "suv", fuel: "petrol", len: 4234, wid: 1819, ht: 1582, seats: 5, boot: 445, hp: 150, acc: 8.4, price: 34500, cons: 6.2 },
  { id: "peugeot-2008", make: "Peugeot", model: "2008", year: 2024, type: "suv", fuel: "petrol", len: 4300, wid: 1770, ht: 1550, seats: 5, boot: 434, hp: 130, acc: 8.9, price: 28900, cons: 5.8 },
  { id: "renault-captur", make: "Renault", model: "Captur", year: 2024, type: "suv", fuel: "hybrid", len: 4227, wid: 1797, ht: 1577, seats: 5, boot: 422, hp: 145, acc: 9.3, price: 27900, cons: 4.6 },
  { id: "opel-mokka", make: "Opel", model: "Mokka", year: 2024, type: "suv", fuel: "petrol", len: 4151, wid: 1791, ht: 1534, seats: 5, boot: 350, hp: 130, acc: 9.0, price: 28500, cons: 6.0 },
  { id: "toyota-chr", make: "Toyota", model: "C-HR", year: 2024, type: "suv", fuel: "hybrid", len: 4360, wid: 1800, ht: 1565, seats: 5, boot: 387, hp: 198, acc: 7.9, price: 37900, cons: 4.8 },
  { id: "kia-stonic", make: "Kia", model: "Stonic", year: 2024, type: "suv", fuel: "petrol", len: 4215, wid: 1760, ht: 1520, seats: 5, boot: 352, hp: 100, acc: 10.7, price: 22900, cons: 5.7 },
  { id: "hyundai-kona", make: "Hyundai", model: "Kona", year: 2024, type: "suv", fuel: "petrol", len: 4355, wid: 1825, ht: 1575, seats: 5, boot: 466, hp: 120, acc: 10.5, price: 28900, cons: 6.0 },
  { id: "citroen-c3-aircross", make: "Citroën", model: "C3 Aircross", year: 2024, type: "suv", fuel: "petrol", len: 4390, wid: 1795, ht: 1610, seats: 5, boot: 410, hp: 110, acc: 10.4, price: 26900, cons: 5.8 },
  { id: "nissan-juke", make: "Nissan", model: "Juke", year: 2024, type: "suv", fuel: "hybrid", len: 4221, wid: 1800, ht: 1595, seats: 5, boot: 422, hp: 143, acc: 9.8, price: 27900, cons: 5.0 },
  { id: "seat-arona", make: "SEAT", model: "Arona", year: 2024, type: "suv", fuel: "petrol", len: 4138, wid: 1780, ht: 1548, seats: 5, boot: 400, hp: 110, acc: 9.9, price: 24500, cons: 5.5 },
  { id: "skoda-kamiq", make: "Škoda", model: "Kamiq", year: 2024, type: "suv", fuel: "petrol", len: 4241, wid: 1793, ht: 1576, seats: 5, boot: 400, hp: 116, acc: 9.5, price: 26900, cons: 5.7 },
  { id: "ford-puma", make: "Ford", model: "Puma", year: 2024, type: "crossover", fuel: "hybrid", len: 4208, wid: 1805, ht: 1537, seats: 5, boot: 456, hp: 125, acc: 9.6, price: 30900, cons: 5.3 },
  { id: "dacia-duster", make: "Dacia", model: "Duster", year: 2024, type: "suv", fuel: "petrol", len: 4340, wid: 1804, ht: 1693, seats: 5, boot: 467, hp: 130, acc: 10.6, price: 19900, cons: 7.2 },
  { id: "mg-zs", make: "MG", model: "ZS", year: 2024, type: "suv", fuel: "petrol", len: 4314, wid: 1809, ht: 1644, seats: 5, boot: 448, hp: 110, acc: 10.5, price: 21900, cons: 6.5 },
  { id: "cupra-formentor", make: "Cupra", model: "Formentor", year: 2024, type: "suv", fuel: "petrol", len: 4450, wid: 1839, ht: 1511, seats: 5, boot: 420, hp: 150, acc: 8.6, price: 32900, cons: 6.5 },
  { id: "honda-hrv", make: "Honda", model: "HR-V", year: 2024, type: "suv", fuel: "hybrid", len: 4385, wid: 1790, ht: 1581, seats: 5, boot: 333, hp: 131, acc: 10.6, price: 32900, cons: 5.0 },
  { id: "mazda-cx30", make: "Mazda", model: "CX-30", year: 2024, type: "suv", fuel: "petrol", len: 4395, wid: 1795, ht: 1540, seats: 5, boot: 430, hp: 122, acc: 9.7, price: 28900, cons: 6.5 },
  { id: "suzuki-vitara", make: "Suzuki", model: "Vitara", year: 2024, type: "suv", fuel: "hybrid", len: 4175, wid: 1775, ht: 1610, seats: 5, boot: 375, hp: 129, acc: 10.4, price: 26900, cons: 5.6 },
  { id: "mitsubishi-asx", make: "Mitsubishi", model: "ASX", year: 2024, type: "suv", fuel: "petrol", len: 4249, wid: 1806, ht: 1571, seats: 5, boot: 380, hp: 130, acc: 9.2, price: 27900, cons: 6.6 },
  { id: "jeep-renegade", make: "Jeep", model: "Renegade", year: 2024, type: "suv", fuel: "phev", len: 4255, wid: 1805, ht: 1689, seats: 5, boot: 351, hp: 240, acc: 7.1, price: 36500, cons: 2.3, evR: 50 },
  { id: "bmw-2series-at", make: "BMW", model: "2 Series Active Tourer", year: 2024, type: "crossover", fuel: "phev", len: 4386, wid: 1824, ht: 1576, seats: 5, boot: 470, hp: 245, acc: 6.7, price: 48500, cons: 1.8, evR: 80 },

  // ── MID-SIZE SUVs / SUV-C ─────────────────────────────────────────────────
  { id: "vw-tiguan", make: "Volkswagen", model: "Tiguan", year: 2024, type: "suv", fuel: "petrol", len: 4539, wid: 1859, ht: 1642, seats: 5, boot: 652, bootMax: 1655, hp: 150, acc: 8.5, price: 41900, cons: 6.7 },
  { id: "toyota-rav4", make: "Toyota", model: "RAV4", year: 2024, type: "suv", fuel: "hybrid", len: 4600, wid: 1855, ht: 1685, seats: 5, boot: 580, hp: 222, acc: 7.8, price: 49900, cons: 5.7 },
  { id: "hyundai-tucson", make: "Hyundai", model: "Tucson", year: 2024, type: "suv", fuel: "petrol", len: 4500, wid: 1865, ht: 1650, seats: 5, boot: 620, hp: 150, acc: 9.5, price: 38500, cons: 7.1 },
  { id: "kia-sportage", make: "Kia", model: "Sportage", year: 2024, type: "suv", fuel: "hybrid", len: 4515, wid: 1865, ht: 1645, seats: 5, boot: 587, hp: 230, acc: 8.0, price: 39900, cons: 5.7 },
  { id: "mazda-cx5", make: "Mazda", model: "CX-5", year: 2024, type: "suv", fuel: "petrol", len: 4575, wid: 1842, ht: 1680, seats: 5, boot: 506, hp: 165, acc: 9.7, price: 36900, cons: 7.3 },
  { id: "ford-kuga", make: "Ford", model: "Kuga", year: 2024, type: "suv", fuel: "phev", len: 4614, wid: 1882, ht: 1687, seats: 5, boot: 405, hp: 225, acc: 9.2, price: 43900, cons: 1.3, evR: 69 },
  { id: "peugeot-3008", make: "Peugeot", model: "3008", year: 2024, type: "suv", fuel: "petrol", len: 4447, wid: 1847, ht: 1632, seats: 5, boot: 520, hp: 130, acc: 9.7, price: 38900, cons: 6.3 },
  { id: "opel-grandland", make: "Opel", model: "Grandland", year: 2024, type: "suv", fuel: "petrol", len: 4476, wid: 1906, ht: 1609, seats: 5, boot: 514, hp: 130, acc: 9.5, price: 37500, cons: 6.5 },
  { id: "skoda-karoq", make: "Škoda", model: "Karoq", year: 2024, type: "suv", fuel: "petrol", len: 4382, wid: 1841, ht: 1605, seats: 5, boot: 521, hp: 150, acc: 8.7, price: 36900, cons: 6.2 },
  { id: "bmw-x3", make: "BMW", model: "X3", year: 2024, type: "suv", fuel: "petrol", len: 4716, wid: 1891, ht: 1676, seats: 5, boot: 550, hp: 184, acc: 7.4, price: 60900, cons: 7.7 },
  { id: "mercedes-glc", make: "Mercedes-Benz", model: "GLC", year: 2024, type: "suv", fuel: "petrol", len: 4716, wid: 1890, ht: 1640, seats: 5, boot: 620, hp: 204, acc: 6.9, price: 64900, cons: 8.1 },
  { id: "audi-q5", make: "Audi", model: "Q5", year: 2024, type: "suv", fuel: "petrol", len: 4662, wid: 1893, ht: 1664, seats: 5, boot: 520, hp: 204, acc: 7.0, price: 62900, cons: 7.5 },
  { id: "volvo-xc40", make: "Volvo", model: "XC40", year: 2024, type: "suv", fuel: "hybrid", len: 4425, wid: 1863, ht: 1652, seats: 5, boot: 452, hp: 163, acc: 8.5, price: 44900, cons: 6.8 },
  { id: "volvo-xc60", make: "Volvo", model: "XC60", year: 2024, type: "suv", fuel: "phev", len: 4688, wid: 1902, ht: 1658, seats: 5, boot: 490, hp: 455, acc: 4.9, price: 74900, cons: 1.6, evR: 90 },
  { id: "nissan-qashqai", make: "Nissan", model: "Qashqai", year: 2024, type: "suv", fuel: "hybrid", len: 4425, wid: 1838, ht: 1625, seats: 5, boot: 504, hp: 158, acc: 8.9, price: 37900, cons: 5.1 },
  { id: "renault-austral", make: "Renault", model: "Austral", year: 2024, type: "suv", fuel: "hybrid", len: 4510, wid: 1858, ht: 1623, seats: 5, boot: 575, hp: 200, acc: 8.4, price: 38900, cons: 5.0 },
  { id: "mitsubishi-outlander", make: "Mitsubishi", model: "Outlander", year: 2024, type: "suv", fuel: "phev", len: 4710, wid: 1860, ht: 1745, seats: 7, boot: 466, hp: 302, acc: 5.6, price: 51900, cons: 1.9, evR: 87 },
  { id: "honda-crv", make: "Honda", model: "CR-V", year: 2024, type: "suv", fuel: "hybrid", len: 4694, wid: 1866, ht: 1689, seats: 5, boot: 589, hp: 184, acc: 9.5, price: 47900, cons: 5.1 },
  { id: "jeep-compass", make: "Jeep", model: "Compass", year: 2024, type: "suv", fuel: "phev", len: 4395, wid: 1825, ht: 1640, seats: 5, boot: 438, hp: 240, acc: 7.3, price: 42900, cons: 2.1, evR: 50 },
  { id: "mazda-cx60", make: "Mazda", model: "CX-60", year: 2024, type: "suv", fuel: "phev", len: 4745, wid: 1890, ht: 1680, seats: 5, boot: 570, hp: 327, acc: 5.8, price: 57900, cons: 1.5, evR: 69 },
  { id: "subaru-forester", make: "Subaru", model: "Forester", year: 2024, type: "suv", fuel: "petrol", len: 4640, wid: 1815, ht: 1730, seats: 5, boot: 509, hp: 150, acc: 11.0, price: 39900, cons: 7.2 },

  // ── LARGE SUVs / SUV-D ─────────────────────────────────────────────────────
  { id: "vw-touareg", make: "Volkswagen", model: "Touareg", year: 2024, type: "suv", fuel: "phev", len: 4878, wid: 1984, ht: 1702, seats: 5, boot: 810, hp: 462, acc: 5.1, price: 74900, cons: 2.0, evR: 48 },
  { id: "bmw-x5", make: "BMW", model: "X5", year: 2024, type: "suv", fuel: "phev", len: 4922, wid: 2004, ht: 1745, seats: 5, boot: 650, hp: 394, acc: 5.6, price: 88900, cons: 1.6, evR: 87 },
  { id: "mercedes-gle", make: "Mercedes-Benz", model: "GLE", year: 2024, type: "suv", fuel: "phev", len: 4924, wid: 1976, ht: 1796, seats: 5, boot: 630, hp: 381, acc: 6.0, price: 87900, cons: 1.7, evR: 100 },
  { id: "audi-q7", make: "Audi", model: "Q7", year: 2024, type: "suv", fuel: "phev", len: 5063, wid: 1968, ht: 1741, seats: 7, boot: 770, hp: 381, acc: 5.9, price: 86900, cons: 1.5, evR: 44 },
  { id: "volvo-xc90", make: "Volvo", model: "XC90", year: 2024, type: "suv", fuel: "phev", len: 4953, wid: 2008, ht: 1776, seats: 7, boot: 721, hp: 455, acc: 4.9, price: 86900, cons: 1.5, evR: 59 },
  { id: "land-rover-defender-110", make: "Land Rover", model: "Defender", year: 2024, type: "suv", fuel: "petrol", len: 5022, wid: 1996, ht: 1967, seats: 5, boot: 786, hp: 300, acc: 8.1, price: 72900, cons: 10.5 },
  { id: "hyundai-santafe", make: "Hyundai", model: "Santa Fe", year: 2024, type: "suv", fuel: "phev", len: 4830, wid: 1900, ht: 1720, seats: 7, boot: 634, hp: 253, acc: 9.9, price: 56900, cons: 1.8, evR: 51 },
  { id: "kia-sorento", make: "Kia", model: "Sorento", year: 2024, type: "suv", fuel: "phev", len: 4810, wid: 1900, ht: 1700, seats: 7, boot: 605, hp: 265, acc: 8.7, price: 55900, cons: 1.6, evR: 67 },
  { id: "skoda-kodiaq", make: "Škoda", model: "Kodiaq", year: 2024, type: "suv", fuel: "petrol", len: 4758, wid: 1882, ht: 1659, seats: 7, boot: 910, hp: 150, acc: 9.7, price: 44900, cons: 7.0 },
  { id: "peugeot-5008", make: "Peugeot", model: "5008", year: 2024, type: "suv", fuel: "petrol", len: 4791, wid: 1894, ht: 1641, seats: 7, boot: 780, hp: 130, acc: 9.8, price: 44900, cons: 6.6 },
  { id: "toyota-landcruiser", make: "Toyota", model: "Land Cruiser", year: 2024, type: "suv", fuel: "diesel", len: 4920, wid: 1980, ht: 1930, seats: 7, boot: 909, hp: 227, acc: 10.5, price: 79900, cons: 9.8 },
  { id: "ford-explorer", make: "Ford", model: "Explorer", year: 2024, type: "suv", fuel: "electric", len: 4467, wid: 1871, ht: 1607, seats: 5, boot: 450, hp: 286, acc: 5.3, price: 54900, cons: 19.2, evR: 602 },

  // ── PURE ELECTRIC ─────────────────────────────────────────────────────────
  { id: "tesla-model3", make: "Tesla", model: "Model 3", year: 2024, type: "sedan", fuel: "electric", len: 4720, wid: 1921, ht: 1441, seats: 5, boot: 594, hp: 358, acc: 4.4, price: 42990, cons: 14.9, evR: 629 },
  { id: "tesla-modely", make: "Tesla", model: "Model Y", year: 2024, type: "suv", fuel: "electric", len: 4751, wid: 1921, ht: 1624, seats: 5, boot: 854, hp: 299, acc: 5.9, price: 44990, cons: 16.9, evR: 565 },
  { id: "vw-id3", make: "Volkswagen", model: "ID.3", year: 2024, type: "hatchback", fuel: "electric", len: 4261, wid: 1809, ht: 1568, seats: 5, boot: 385, hp: 204, acc: 7.3, price: 40900, cons: 15.4, evR: 426 },
  { id: "vw-id4", make: "Volkswagen", model: "ID.4", year: 2024, type: "suv", fuel: "electric", len: 4584, wid: 1865, ht: 1640, seats: 5, boot: 543, hp: 204, acc: 8.5, price: 46900, cons: 17.6, evR: 527 },
  { id: "vw-id5", make: "Volkswagen", model: "ID.5", year: 2024, type: "suv", fuel: "electric", len: 4599, wid: 1852, ht: 1585, seats: 5, boot: 549, hp: 286, acc: 6.3, price: 52900, cons: 17.3, evR: 546 },
  { id: "kia-ev6", make: "Kia", model: "EV6", year: 2024, type: "crossover", fuel: "electric", len: 4680, wid: 1880, ht: 1550, seats: 5, boot: 490, hp: 325, acc: 5.1, price: 56900, cons: 17.0, evR: 506 },
  { id: "kia-niro-ev", make: "Kia", model: "Niro EV", year: 2024, type: "suv", fuel: "electric", len: 4420, wid: 1825, ht: 1545, seats: 5, boot: 475, hp: 204, acc: 7.8, price: 42900, cons: 16.5, evR: 463 },
  { id: "hyundai-ioniq5", make: "Hyundai", model: "Ioniq 5", year: 2024, type: "crossover", fuel: "electric", len: 4635, wid: 1890, ht: 1605, seats: 5, boot: 531, hp: 325, acc: 5.1, price: 54900, cons: 17.9, evR: 507 },
  { id: "hyundai-ioniq6", make: "Hyundai", model: "Ioniq 6", year: 2024, type: "sedan", fuel: "electric", len: 4855, wid: 1880, ht: 1495, seats: 5, boot: 401, hp: 325, acc: 5.1, price: 51900, cons: 15.0, evR: 614 },
  { id: "hyundai-kona-ev", make: "Hyundai", model: "Kona", year: 2024, type: "suv", fuel: "electric", len: 4355, wid: 1825, ht: 1575, seats: 5, boot: 466, hp: 218, acc: 7.8, price: 41900, cons: 14.7, evR: 514 },
  { id: "bmw-i4", make: "BMW", model: "i4", year: 2024, type: "sedan", fuel: "electric", len: 4783, wid: 1852, ht: 1448, seats: 5, boot: 470, hp: 340, acc: 5.7, price: 60900, cons: 16.4, evR: 590 },
  { id: "bmw-ix3", make: "BMW", model: "iX3", year: 2024, type: "suv", fuel: "electric", len: 4734, wid: 1891, ht: 1668, seats: 5, boot: 510, hp: 286, acc: 6.8, price: 65900, cons: 18.5, evR: 461 },
  { id: "audi-q4etron", make: "Audi", model: "Q4 e-tron", year: 2024, type: "suv", fuel: "electric", len: 4588, wid: 1865, ht: 1632, seats: 5, boot: 520, hp: 204, acc: 8.5, price: 49900, cons: 17.7, evR: 519 },
  { id: "mercedes-eqa", make: "Mercedes-Benz", model: "EQA", year: 2024, type: "suv", fuel: "electric", len: 4463, wid: 1834, ht: 1624, seats: 5, boot: 340, hp: 190, acc: 8.9, price: 49900, cons: 16.8, evR: 458 },
  { id: "mercedes-eqb", make: "Mercedes-Benz", model: "EQB", year: 2024, type: "suv", fuel: "electric", len: 4684, wid: 1834, ht: 1667, seats: 5, boot: 495, hp: 190, acc: 8.9, price: 55900, cons: 17.3, evR: 419 },
  { id: "renault-megane-etech", make: "Renault", model: "Mégane E-Tech", year: 2024, type: "hatchback", fuel: "electric", len: 4200, wid: 1768, ht: 1505, seats: 5, boot: 440, hp: 220, acc: 7.4, price: 37900, cons: 15.0, evR: 470 },
  { id: "peugeot-e208", make: "Peugeot", model: "e-208", year: 2024, type: "hatchback", fuel: "electric", len: 4055, wid: 1745, ht: 1430, seats: 5, boot: 311, hp: 136, acc: 8.1, price: 35900, cons: 13.6, evR: 400 },
  { id: "opel-corsa-e", make: "Opel", model: "Corsa Electric", year: 2024, type: "hatchback", fuel: "electric", len: 4060, wid: 1765, ht: 1430, seats: 5, boot: 309, hp: 136, acc: 8.1, price: 36500, cons: 13.6, evR: 402 },
  { id: "toyota-bz4x", make: "Toyota", model: "bZ4X", year: 2024, type: "suv", fuel: "electric", len: 4690, wid: 1860, ht: 1600, seats: 5, boot: 452, hp: 218, acc: 7.7, price: 48900, cons: 18.5, evR: 516 },
  { id: "nissan-leaf", make: "Nissan", model: "Leaf", year: 2024, type: "hatchback", fuel: "electric", len: 4490, wid: 1788, ht: 1540, seats: 5, boot: 435, hp: 150, acc: 7.9, price: 35900, cons: 15.0, evR: 385 },
  { id: "nissan-ariya", make: "Nissan", model: "Ariya", year: 2024, type: "suv", fuel: "electric", len: 4595, wid: 1850, ht: 1660, seats: 5, boot: 470, hp: 218, acc: 7.5, price: 48900, cons: 17.8, evR: 533 },
  { id: "fiat-500e", make: "Fiat", model: "500e", year: 2024, type: "hatchback", fuel: "electric", len: 3631, wid: 1683, ht: 1527, seats: 4, boot: 185, hp: 118, acc: 9.0, price: 29900, cons: 14.0, evR: 320 },
  { id: "mg4-ev", make: "MG", model: "MG4", year: 2024, type: "hatchback", fuel: "electric", len: 4287, wid: 1836, ht: 1504, seats: 5, boot: 363, hp: 204, acc: 7.7, price: 32900, cons: 15.8, evR: 450 },
  { id: "volvo-ex30", make: "Volvo", model: "EX30", year: 2024, type: "suv", fuel: "electric", len: 4233, wid: 1837, ht: 1550, seats: 5, boot: 318, hp: 272, acc: 5.3, price: 39900, cons: 17.5, evR: 476 },
  { id: "volvo-ex40", make: "Volvo", model: "EX40", year: 2024, type: "suv", fuel: "electric", len: 4425, wid: 1863, ht: 1652, seats: 5, boot: 419, hp: 238, acc: 7.4, price: 51900, cons: 18.3, evR: 460 },
  { id: "polestar2", make: "Polestar", model: "2", year: 2024, type: "sedan", fuel: "electric", len: 4607, wid: 1859, ht: 1481, seats: 5, boot: 405, hp: 299, acc: 4.5, price: 54900, cons: 16.5, evR: 592 },
  { id: "skoda-enyaq", make: "Škoda", model: "Enyaq", year: 2024, type: "suv", fuel: "electric", len: 4653, wid: 1879, ht: 1616, seats: 5, boot: 585, hp: 204, acc: 8.7, price: 46900, cons: 17.4, evR: 553 },
  { id: "mini-cooper-e", make: "MINI", model: "Cooper E", year: 2024, type: "hatchback", fuel: "electric", len: 3858, wid: 1774, ht: 1460, seats: 4, boot: 200, hp: 184, acc: 7.1, price: 35900, cons: 15.2, evR: 305 },
  { id: "dacia-spring", make: "Dacia", model: "Spring", year: 2024, type: "hatchback", fuel: "electric", len: 3701, wid: 1622, ht: 1519, seats: 4, boot: 290, hp: 65, acc: 19.0, price: 17900, cons: 13.9, evR: 220 },
  { id: "citroen-e-c4", make: "Citroën", model: "ë-C4", year: 2024, type: "hatchback", fuel: "electric", len: 4361, wid: 1800, ht: 1530, seats: 5, boot: 380, hp: 136, acc: 9.5, price: 38900, cons: 16.6, evR: 420 },
  { id: "mg5-ev", make: "MG", model: "MG5", year: 2024, type: "wagon", fuel: "electric", len: 4600, wid: 1818, ht: 1543, seats: 5, boot: 479, hp: 177, acc: 7.7, price: 37900, cons: 16.0, evR: 400 },
  { id: "toyota-chr-ev", make: "Toyota", model: "C-HR", year: 2024, type: "suv", fuel: "electric", len: 4360, wid: 1800, ht: 1565, seats: 5, boot: 388, hp: 156, acc: 8.3, price: 41900, cons: 15.0, evR: 400 },
  { id: "kia-ev9", make: "Kia", model: "EV9", year: 2024, type: "suv", fuel: "electric", len: 5010, wid: 1980, ht: 1755, seats: 7, boot: 333, hp: 204, acc: 9.4, price: 70900, cons: 21.0, evR: 563 },
  { id: "genesis-gv60", make: "Genesis", model: "GV60", year: 2024, type: "suv", fuel: "electric", len: 4515, wid: 1890, ht: 1580, seats: 5, boot: 432, hp: 314, acc: 4.0, price: 55900, cons: 17.7, evR: 470 },

  // ── MPV / MINIVANS ─────────────────────────────────────────────────────────
  { id: "vw-touran", make: "Volkswagen", model: "Touran", year: 2024, type: "minivan", fuel: "petrol", len: 4527, wid: 1829, ht: 1635, seats: 7, boot: 743, hp: 150, acc: 9.2, price: 38900, cons: 6.3 },
  { id: "ford-smax", make: "Ford", model: "S-Max", year: 2023, type: "minivan", fuel: "phev", len: 4781, wid: 1916, ht: 1676, seats: 7, boot: 285, hp: 225, acc: 9.1, price: 49900, cons: 1.5, evR: 53 },
  { id: "citroen-berlingo", make: "Citroën", model: "Berlingo", year: 2024, type: "minivan", fuel: "petrol", len: 4403, wid: 1848, ht: 1843, seats: 5, boot: 775, hp: 110, acc: 11.5, price: 28900, cons: 6.5 },
  { id: "peugeot-rifter", make: "Peugeot", model: "Rifter", year: 2024, type: "minivan", fuel: "petrol", len: 4403, wid: 1848, ht: 1849, seats: 5, boot: 775, hp: 110, acc: 11.5, price: 29900, cons: 6.5 },
  { id: "renault-scenic", make: "Renault", model: "Scénic", year: 2024, type: "suv", fuel: "electric", len: 4470, wid: 1863, ht: 1571, seats: 5, boot: 545, hp: 218, acc: 8.4, price: 43900, cons: 16.0, evR: 620 },

  // ── LUXURY / PREMIUM ──────────────────────────────────────────────────────
  { id: "bmw-7series", make: "BMW", model: "7 Series", year: 2024, type: "sedan", fuel: "phev", len: 5391, wid: 1950, ht: 1544, seats: 5, boot: 520, hp: 490, acc: 4.7, price: 119900, cons: 1.5, evR: 90 },
  { id: "mercedes-sclass", make: "Mercedes-Benz", model: "S-Class", year: 2024, type: "sedan", fuel: "phev", len: 5289, wid: 1954, ht: 1503, seats: 5, boot: 550, hp: 510, acc: 4.3, price: 129900, cons: 1.6, evR: 100 },
  { id: "audi-a8", make: "Audi", model: "A8", year: 2024, type: "sedan", fuel: "phev", len: 5179, wid: 1945, ht: 1475, seats: 5, boot: 405, hp: 449, acc: 4.9, price: 109900, cons: 1.8, evR: 60 },
  { id: "volvo-s90", make: "Volvo", model: "S90", year: 2024, type: "sedan", fuel: "phev", len: 4963, wid: 1879, ht: 1436, seats: 5, boot: 500, hp: 455, acc: 4.5, price: 71900, cons: 1.5, evR: 90 },

  // ── ALFA ROMEO ────────────────────────────────────────────────────────────
  { id: "alfa-tonale", make: "Alfa Romeo", model: "Tonale", year: 2024, type: "suv", fuel: "phev", len: 4528, wid: 1835, ht: 1600, seats: 5, boot: 405, hp: 280, acc: 6.2, price: 51900, cons: 2.0, evR: 60 },
  { id: "alfa-stelvio", make: "Alfa Romeo", model: "Stelvio", year: 2024, type: "suv", fuel: "petrol", len: 4686, wid: 1903, ht: 1670, seats: 5, boot: 525, hp: 280, acc: 5.7, price: 58900, cons: 8.5 },
  { id: "alfa-giulia", make: "Alfa Romeo", model: "Giulia", year: 2024, type: "sedan", fuel: "petrol", len: 4643, wid: 1869, ht: 1436, seats: 5, boot: 480, hp: 280, acc: 5.2, price: 54900, cons: 7.8 },
];

export const allCars: Car[] = specs.map(buildCar);

export function getCarById(id: string): Car | undefined {
  return allCars.find((c) => c.id === id);
}

export function getCarsByIds(ids: string[]): Car[] {
  return ids.map((id) => allCars.find((c) => c.id === id)).filter(Boolean) as Car[];
}
