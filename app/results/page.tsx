"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/ui/Nav";
import ScoreBar from "@/components/ui/ScoreBar";
import MatchBadge from "@/components/ui/MatchBadge";
import { getTopMatches, ALL_SCORES, type UserPreferences, type ScoredCar } from "@/lib/scoring";

function ResultsContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [compareList, setCompareList] = useState<string[]>([]);

  const prefs: UserPreferences = useMemo(
    () => ({
      budget: Number(params.get("budget") ?? 35000),
      familySize: Number(params.get("family") ?? 2),
      yearlyKm: Number(params.get("km") ?? 20000),
      hasHomeCharging: params.get("charging") === "true",
      drivingStyle:
        (params.get("style") as UserPreferences["drivingStyle"]) ?? "mixed",
      garageType:
        (params.get("garage") as UserPreferences["garageType"]) ?? "standard",
      priorities:
        params
          .get("priorities")
          ?.split(",")
          .filter(Boolean) as UserPreferences["priorities"] ?? [],
    }),
    [params]
  );

  const results = useMemo(() => getTopMatches(prefs, 5), [prefs]);

  function toggleCompare(id: string) {
    setCompareList((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  }

  function goCompare() {
    router.push(`/compare?cars=${compareList.join(",")}`);
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-2xl font-bold">No matches found</p>
        <p className="text-muted">Try increasing your budget.</p>
        <Link href="/quiz" className="underline text-sm">
          Start over
        </Link>
      </div>
    );
  }

  const [best, ...rest] = results;

  return (
    <main className="min-h-screen bg-surface text-ink">
      <Nav />

      {/* Compare bar */}
      {compareList.length > 0 && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink text-surface px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl"
        >
          <span className="text-sm font-bold">{compareList.length} car{compareList.length > 1 ? "s" : ""} selected</span>
          {compareList.length >= 2 && (
            <button
              onClick={goCompare}
              className="bg-surface text-ink text-xs font-black px-4 py-1.5 rounded-full hover:bg-surface/90 transition-colors"
            >
              Compare now →
            </button>
          )}
          <button
            onClick={() => setCompareList([])}
            className="text-white/40 hover:text-white text-xs"
          >
            Clear
          </button>
        </motion.div>
      )}

      {/* HERO MATCH */}
      <HeroMatch scored={best} onToggleCompare={toggleCompare} compareList={compareList} />

      {/* TOP 5 LIST */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 pt-8 pb-32">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-1">Your results</p>
            <h2 className="text-3xl font-black tracking-tight">All matches</h2>
          </div>
          <Link href="/quiz" className="text-sm text-muted hover:text-ink transition-colors">
            ← Adjust preferences
          </Link>
        </div>

        <div className="space-y-4">
          {rest.map((scored, i) => (
            <ResultCard
              key={scored.car.id}
              scored={scored}
              rank={i + 2}
              delay={i * 0.08}
              onToggleCompare={toggleCompare}
              compareList={compareList}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function HeroMatch({
  scored,
  onToggleCompare,
  compareList,
}: {
  scored: ScoredCar;
  onToggleCompare: (id: string) => void;
  compareList: string[];
}) {
  const { car, matchScore, yearlyCost, warnings } = scored;
  const inCompare = compareList.includes(car.id);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end bg-ink overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={car.imageUrl}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 lg:px-8 pb-16 pt-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-xs tracking-widest uppercase text-white/40">Best match</span>
          <div className="flex items-center gap-1.5 bg-emerald-500 px-3 py-1 rounded-full">
            <span className="text-xs font-black text-white">{matchScore}% match</span>
          </div>
        </motion.div>

        {/* Car name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-black text-white leading-[0.9] tracking-tighter mb-2"
        >
          {car.make}
          <br />
          {car.model}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-white/40 text-sm mb-4"
        >
          {car.variant} · {car.year}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/80 text-lg max-w-xl leading-relaxed mb-10"
        >
          {car.tagline}
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap gap-6 mb-10 border-t border-white/10 pt-8"
        >
          {[
            { label: "Purchase price", value: `€${car.priceNew.toLocaleString("nl-NL")}` },
            { label: "Est. yearly cost", value: `€${yearlyCost.toLocaleString("nl-NL")}` },
            {
              label: car.fuelType === "electric" ? "EV range" : "Fuel",
              value:
                car.fuelType === "electric"
                  ? `${car.evRange} km`
                  : `${car.fuelConsumption}L/100km`,
            },
            { label: "Seats", value: String(car.seats) },
            { label: "Boot", value: `${car.bootLiters}L` },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-[10px] tracking-widest uppercase text-white/30 mb-1">{s.label}</div>
              <div className="text-xl font-black text-white">{s.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Scores grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-3 mb-10"
        >
          {ALL_SCORES.slice(0, 4).map((s, i) => (
            <div key={s.key} className="[&_.text-muted]:text-white/40 [&_.bg-border]:bg-white/10 [&_.text-xs.font-bold]:text-white">
              <ScoreBar
                label={s.label}
                value={car[s.key as keyof typeof car] as number}
                delay={0.3 + i * 0.05}
              />
            </div>
          ))}
        </motion.div>

        {/* Insights */}
        {warnings.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mb-8 space-y-2"
          >
            {warnings.map((w, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-amber-400">
                <span>⚠️</span>
                <span>{w}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => onToggleCompare(car.id)}
            className={`px-6 py-3 rounded-full text-sm font-bold border transition-all ${
              inCompare
                ? "bg-white text-ink border-white"
                : "border-white/30 text-white hover:border-white/60"
            }`}
          >
            {inCompare ? "✓ Added to compare" : "+ Add to compare"}
          </button>
          <Link href="/quiz" className="text-sm text-white/40 hover:text-white transition-colors">
            Adjust preferences →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ResultCard({
  scored,
  rank,
  delay,
  onToggleCompare,
  compareList,
}: {
  scored: ScoredCar;
  rank: number;
  delay: number;
  onToggleCompare: (id: string) => void;
  compareList: string[];
}) {
  const { car, matchScore, yearlyCost, warnings } = scored;
  const inCompare = compareList.includes(car.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white border border-border rounded-2xl overflow-hidden hover:border-ink/20 transition-colors"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative sm:w-72 h-48 sm:h-auto flex-shrink-0">
          <img
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              #{rank}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl font-black tracking-tight">
                {car.make} {car.model}
              </h3>
              <p className="text-xs text-muted mt-0.5">{car.variant} · {car.year}</p>
            </div>
            <MatchBadge score={matchScore} />
          </div>

          <p className="text-sm text-muted mb-4 leading-relaxed">{car.tagline}</p>

          {/* Mini scores */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4">
            {ALL_SCORES.slice(0, 4).map((s) => (
              <ScoreBar
                key={s.key}
                label={s.label}
                value={car[s.key as keyof typeof car] as number}
              />
            ))}
          </div>

          {/* Pros/cons + warnings */}
          <div className="space-y-1 mb-4">
            {car.pros.slice(0, 2).map((p, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-ink">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>{p}</span>
              </div>
            ))}
            {car.cons.slice(0, 1).map((c, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-muted">
                <span className="text-amber-500 mt-0.5">⚠</span>
                <span>{c}</span>
              </div>
            ))}
            {warnings.slice(0, 1).map((w, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-amber-600">
                <span className="mt-0.5">⚠️</span>
                <span>{w}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted">Price</div>
                <div className="text-sm font-bold">
                  €{car.priceNew.toLocaleString("nl-NL")}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted">Yearly cost</div>
                <div className="text-sm font-bold">
                  €{yearlyCost.toLocaleString("nl-NL")}
                </div>
              </div>
            </div>
            <button
              onClick={() => onToggleCompare(car.id)}
              className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                inCompare
                  ? "bg-ink text-surface border-ink"
                  : "border-border hover:border-ink/40"
              }`}
            >
              {inCompare ? "✓ Comparing" : "+ Compare"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-muted text-sm">Loading matches…</div></div>}>
      <ResultsContent />
    </Suspense>
  );
}
