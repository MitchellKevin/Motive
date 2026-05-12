"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/ui/Nav";
import ScoreBar from "@/components/ui/ScoreBar";
import { allCars as ALL_CARS, getCarsByIds } from "@/lib/data/allCars";
import type { Car } from "@/lib/data/cars";
import { ALL_SCORES } from "@/lib/scoring";

const DIMENSIONS = [
  { label: "Length", key: "length", format: (v: number) => `${(v / 1000).toFixed(2)} m` },
  { label: "Width", key: "width", format: (v: number) => `${(v / 1000).toFixed(2)} m` },
  { label: "Height", key: "height", format: (v: number) => `${(v / 1000).toFixed(2)} m` },
  { label: "Boot", key: "bootLiters", format: (v: number) => `${v} L` },
  { label: "Seats", key: "seats", format: (v: number) => String(v) },
  { label: "Power", key: "horsePower", format: (v: number) => `${v} hp` },
  { label: "0–100 km/h", key: "acceleration", format: (v: number) => `${v}s` },
  { label: "Consumption", key: "fuelConsumption", format: (v: number, car: Car) => car.fuelType === "electric" ? `${v} kWh/100km` : `${v} L/100km` },
  { label: "EV Range", key: "evRange", format: (v: number | null) => v ? `${v} km` : "—" },
  { label: "Price", key: "priceNew", format: (v: number) => `€${v.toLocaleString("nl-NL")}` },
  { label: "Yearly insurance", key: "yearlyInsurance", format: (v: number) => `€${v.toLocaleString("nl-NL")}` },
  { label: "Yearly maintenance", key: "yearlyMaintenance", format: (v: number) => `€${v.toLocaleString("nl-NL")}` },
];

function bestVal(key: string, carList: Car[]): number | null {
  const vals = carList.map((c) => c[key as keyof Car] as number).filter((v) => typeof v === "number" && !isNaN(v));
  if (!vals.length) return null;
  const lower = ["priceNew", "yearlyInsurance", "yearlyMaintenance", "fuelConsumption", "acceleration"];
  return lower.includes(key) ? Math.min(...vals) : Math.max(...vals);
}

function CarSelector({
  selected,
  slot,
  onSelect,
  onRemove,
}: {
  selected: Car | null;
  slot: number;
  onSelect: (id: string) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {selected ? (
        <div className="group relative aspect-video rounded-2xl overflow-hidden bg-border">
          <img src={selected.imageUrl} alt={selected.model} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-xs text-white/50 mb-0.5">{selected.make}</p>
            <p className="text-lg font-bold text-white leading-tight">{selected.model}</p>
          </div>
          <button
            onClick={onRemove}
            className="absolute top-3 right-3 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs"
          >
            ×
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-full aspect-video rounded-2xl border-2 border-dashed border-border hover:border-ink/30 flex flex-col items-center justify-center gap-2 transition-colors bg-white"
        >
          <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center text-xl">+</div>
          <span className="text-sm text-muted">Add car {slot}</span>
        </button>
      )}

      {open && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-border rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto">
          {ALL_CARS.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                onSelect(c.id);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-surface text-sm flex items-center gap-3 transition-colors"
            >
              <img src={c.imageUrl} alt={c.model} className="w-12 h-8 object-cover rounded-lg flex-shrink-0" />
              <div>
                <div className="font-bold">{c.make} {c.model}</div>
                <div className="text-xs text-muted">{c.variant}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CompareContent() {
  const params = useSearchParams();
  const initialIds = (params.get("cars") ?? "").split(",").filter(Boolean).slice(0, 3);

  const [selectedIds, setSelectedIds] = useState<(string | null)[]>([
    initialIds[0] ?? null,
    initialIds[1] ?? null,
    initialIds[2] ?? null,
  ]);

  function setSlot(slot: number, id: string) {
    setSelectedIds((prev) => {
      const next = [...prev];
      next[slot] = id;
      return next;
    });
  }
  function removeSlot(slot: number) {
    setSelectedIds((prev) => {
      const next = [...prev];
      next[slot] = null;
      return next;
    });
  }

  const selectedCars = selectedIds.map((id) =>
    id ? ALL_CARS.find((c) => c.id === id) ?? null : null
  );
  const activeCars = selectedCars.filter(Boolean) as Car[];

  return (
    <main className="min-h-screen bg-surface text-ink">
      <Nav />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-32">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase text-muted mb-2">Side-by-side</p>
          <h1 className="text-5xl font-black tracking-tight">Compare</h1>
          <p className="text-muted text-sm mt-2">Select up to 3 cars to compare.</p>
        </div>

        {/* Car selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[0, 1, 2].map((slot) => (
            <CarSelector
              key={slot}
              selected={selectedCars[slot]}
              slot={slot + 1}
              onSelect={(id) => setSlot(slot, id)}
              onRemove={() => removeSlot(slot)}
            />
          ))}
        </div>

        {activeCars.length < 2 && (
          <div className="text-center py-24">
            <p className="text-muted">Select at least 2 cars to compare.</p>
            <Link href="/quiz" className="text-sm text-ink underline mt-2 inline-block">
              Find cars from your preferences →
            </Link>
          </div>
        )}

        {activeCars.length >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            {/* PRACTICAL SCORES */}
            <div>
              <h2 className="text-2xl font-black mb-6 tracking-tight">Practical scores</h2>
              <div className="space-y-4">
                {ALL_SCORES.map((s) => {
                  const vals = activeCars.map((c) => c[s.key as keyof Car] as number);
                  const maxVal = Math.max(...vals);
                  return (
                    <div key={s.key} className="bg-white rounded-2xl border border-border p-5">
                      <p className="text-xs tracking-widest uppercase text-muted mb-4">{s.label}</p>
                      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${activeCars.length}, 1fr)` }}>
                        {activeCars.map((car, i) => {
                          const val = car[s.key as keyof Car] as number;
                          const isWinner = val === maxVal;
                          return (
                            <div key={car.id}>
                              <p className="text-xs font-bold mb-2">
                                {car.make} {car.model}
                                {isWinner && (
                                  <span className="ml-1.5 text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                                    Best
                                  </span>
                                )}
                              </p>
                              <ScoreBar label="" value={val} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DIMENSIONS & SPECS */}
            <div>
              <h2 className="text-2xl font-black mb-6 tracking-tight">Specs & dimensions</h2>
              <div className="bg-white border border-border rounded-2xl overflow-hidden">
                {/* Header row */}
                <div
                  className="grid border-b border-border"
                  style={{ gridTemplateColumns: `180px repeat(${activeCars.length}, 1fr)` }}
                >
                  <div className="p-4 bg-surface" />
                  {activeCars.map((car) => (
                    <div key={car.id} className="p-4 text-center border-l border-border">
                      <p className="text-xs text-muted">{car.make}</p>
                      <p className="font-bold text-sm">{car.model}</p>
                    </div>
                  ))}
                </div>

                {DIMENSIONS.map((dim, i) => {
                  const best = bestVal(dim.key, activeCars);
                  return (
                    <div
                      key={dim.key}
                      className={`grid border-b border-border last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-surface/50"}`}
                      style={{ gridTemplateColumns: `180px repeat(${activeCars.length}, 1fr)` }}
                    >
                      <div className="p-4 flex items-center">
                        <span className="text-xs text-muted font-medium">{dim.label}</span>
                      </div>
                      {activeCars.map((car) => {
                        const val = car[dim.key as keyof Car] as number | null;
                        const formatted = dim.format(val as never, car);
                        const isBest = val !== null && val === best;
                        return (
                          <div
                            key={car.id}
                            className={`p-4 text-center border-l border-border flex items-center justify-center ${
                              isBest ? "font-black" : ""
                            }`}
                          >
                            <span className={`text-sm ${isBest ? "text-emerald-600" : "text-ink"}`}>
                              {formatted}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* OWNERSHIP INSIGHTS */}
            <div>
              <h2 className="text-2xl font-black mb-6 tracking-tight">Ownership realities</h2>
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: `repeat(${activeCars.length}, 1fr)` }}
              >
                {activeCars.map((car) => (
                  <div key={car.id} className="bg-white border border-border rounded-2xl p-6">
                    <div className="text-xs text-muted mb-4 font-bold">{car.make} {car.model}</div>
                    <div className="space-y-2 mb-4">
                      {car.pros.map((p, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {car.cons.map((c, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-muted">
                          <span className="text-amber-500 mt-0.5 flex-shrink-0">⚠</span>
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DIMENSION VISUAL */}
            <div>
              <h2 className="text-2xl font-black mb-6 tracking-tight">Size at a glance</h2>
              <div className="bg-white border border-border rounded-2xl p-8 overflow-x-auto">
                <div className="flex items-end justify-center gap-8 min-w-[400px]">
                  {activeCars.map((car, i) => {
                    const maxLen = Math.max(...activeCars.map((c) => c.length));
                    const widthPct = (car.length / maxLen) * 220;
                    const heightPct = (car.height / Math.max(...activeCars.map((c) => c.height))) * 80;
                    const colors = ["#0A0A0A", "#6B6B6B", "#D4D4D4"];
                    return (
                      <div key={car.id} className="flex flex-col items-center gap-3">
                        <div
                          className="rounded-lg flex items-center justify-center"
                          style={{
                            width: `${widthPct}px`,
                            height: `${heightPct}px`,
                            background: colors[i],
                          }}
                        />
                        <div className="text-center">
                          <p className="text-xs font-bold">{car.make} {car.model}</p>
                          <p className="text-[10px] text-muted">{(car.length / 1000).toFixed(2)}m long</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-muted text-center mt-6">Proportional length comparison</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-muted text-sm">Loading…</div></div>}>
      <CompareContent />
    </Suspense>
  );
}
