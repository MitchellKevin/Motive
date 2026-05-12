"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/ui/Nav";
import type { Priority, DrivingStyle, GarageType } from "@/lib/scoring";

interface FormState {
  budget: number;
  familySize: number;
  yearlyKm: number;
  hasHomeCharging: boolean | null;
  drivingStyle: DrivingStyle | null;
  garageType: GarageType | null;
  priorities: Priority[];
}

const INITIAL: FormState = {
  budget: 35000,
  familySize: 2,
  yearlyKm: 20000,
  hasHomeCharging: null,
  drivingStyle: null,
  garageType: null,
  priorities: [],
};

const TOTAL_STEPS = 5;

const PRIORITIES: { id: Priority; label: string; desc: string; icon: string }[] = [
  { id: "low_costs", label: "Low costs", desc: "Keep running costs minimal", icon: "💶" },
  { id: "reliability", label: "Reliability", desc: "Fewer surprises and repairs", icon: "🔒" },
  { id: "comfort", label: "Comfort", desc: "Smooth, refined ride quality", icon: "🪑" },
  { id: "family_space", label: "Family space", desc: "Room for people and luggage", icon: "👨‍👩‍👧" },
  { id: "parking_ease", label: "Parking ease", desc: "Easy in city and tight spots", icon: "🅿️" },
  { id: "performance", label: "Performance", desc: "Power and driving enjoyment", icon: "⚡" },
  { id: "ev_range", label: "EV range", desc: "Long electric range with no anxiety", icon: "🔋" },
  { id: "road_trips", label: "Road trips", desc: "Long-distance comfort and range", icon: "🛣️" },
];

const DRIVING_OPTIONS: { id: DrivingStyle; label: string; desc: string }[] = [
  { id: "city", label: "Mostly city", desc: "Short trips, traffic, parking" },
  { id: "mixed", label: "Mixed", desc: "City and motorway regularly" },
  { id: "highway", label: "Mostly motorway", desc: "Long daily commutes or travel" },
];

const GARAGE_OPTIONS: { id: GarageType; label: string; desc: string }[] = [
  { id: "compact", label: "Compact garage", desc: "Tight, city basement parking" },
  { id: "standard", label: "Standard garage", desc: "Normal private garage" },
  { id: "large", label: "Large garage", desc: "Plenty of space, no worries" },
  { id: "street", label: "Street parking", desc: "Parallel parking on the road" },
];

function formatKm(km: number) {
  return `${km.toLocaleString("nl-NL")} km`;
}
function formatBudget(b: number) {
  return `€${b.toLocaleString("nl-NL")}`;
}

export default function QuizPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [direction, setDirection] = useState<1 | -1>(1);
  const router = useRouter();

  function next() {
    setDirection(1);
    setStep((s) => s + 1);
  }
  function back() {
    setDirection(-1);
    setStep((s) => s - 1);
  }

  function togglePriority(p: Priority) {
    setForm((f) => ({
      ...f,
      priorities: f.priorities.includes(p)
        ? f.priorities.filter((x) => x !== p)
        : f.priorities.length < 3
        ? [...f.priorities, p]
        : f.priorities,
    }));
  }

  function submit() {
    const params = new URLSearchParams({
      budget: String(form.budget),
      family: String(form.familySize),
      km: String(form.yearlyKm),
      charging: String(form.hasHomeCharging ?? false),
      style: form.drivingStyle ?? "mixed",
      garage: form.garageType ?? "standard",
      priorities: form.priorities.join(","),
    });
    router.push(`/results?${params.toString()}`);
  }

  const canProceed =
    step === 1
      ? true
      : step === 2
      ? form.drivingStyle !== null
      : step === 3
      ? form.hasHomeCharging !== null
      : step === 4
      ? form.garageType !== null
      : form.priorities.length > 0;

  return (
    <main className="min-h-screen bg-surface text-ink">
      <Nav />

      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
        {/* Progress */}
        <div className="w-full max-w-lg mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs tracking-widest uppercase text-muted">
              Step {step} of {TOTAL_STEPS}
            </span>
            {step > 1 && (
              <button
                onClick={back}
                className="text-xs text-muted hover:text-ink transition-colors"
              >
                ← Back
              </button>
            )}
          </div>
          <div className="h-[2px] bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-ink rounded-full"
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* STEP 1: Budget + Family + KM */}
              {step === 1 && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs tracking-widest uppercase text-muted mb-2">Budget</p>
                    <h2 className="text-4xl font-black tracking-tight mb-8">
                      What&apos;s your budget?
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted text-sm">Max budget (purchase price)</span>
                        <span className="text-2xl font-black tabular-nums">
                          {formatBudget(form.budget)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={10000}
                        max={100000}
                        step={1000}
                        value={form.budget}
                        onChange={(e) => setForm((f) => ({ ...f, budget: +e.target.value }))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted">
                        <span>€10,000</span>
                        <span>€100,000</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted mb-3">How many people in the car regularly?</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          onClick={() => setForm((f) => ({ ...f, familySize: n }))}
                          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-colors border ${
                            form.familySize === n
                              ? "bg-ink text-surface border-ink"
                              : "bg-white border-border hover:border-ink/30"
                          }`}
                        >
                          {n === 5 ? "5+" : n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted">Yearly kilometres</span>
                      <span className="text-xl font-black tabular-nums">
                        {formatKm(form.yearlyKm)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5000}
                      max={60000}
                      step={1000}
                      value={form.yearlyKm}
                      onChange={(e) => setForm((f) => ({ ...f, yearlyKm: +e.target.value }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted mt-1">
                      <span>5,000</span>
                      <span>60,000</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Driving style */}
              {step === 2 && (
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted mb-2">Driving</p>
                  <h2 className="text-4xl font-black tracking-tight mb-8">
                    How do you mostly drive?
                  </h2>
                  <div className="space-y-3">
                    {DRIVING_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setForm((f) => ({ ...f, drivingStyle: opt.id }))}
                        className={`w-full flex items-center justify-between p-5 rounded-2xl border text-left transition-all ${
                          form.drivingStyle === opt.id
                            ? "bg-ink text-surface border-ink"
                            : "bg-white border-border hover:border-ink/30"
                        }`}
                      >
                        <div>
                          <div className="font-bold">{opt.label}</div>
                          <div
                            className={`text-xs mt-0.5 ${
                              form.drivingStyle === opt.id ? "text-white/60" : "text-muted"
                            }`}
                          >
                            {opt.desc}
                          </div>
                        </div>
                        {form.drivingStyle === opt.id && (
                          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-ink" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Charging */}
              {step === 3 && (
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted mb-2">Electric</p>
                  <h2 className="text-4xl font-black tracking-tight mb-3">
                    Can you charge at home?
                  </h2>
                  <p className="text-muted text-sm mb-8">
                    This significantly affects EV ownership costs and convenience.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        val: true,
                        label: "Yes",
                        desc: "I have or can install a home charger",
                        icon: "✅",
                      },
                      {
                        val: false,
                        label: "No",
                        desc: "Only public charging available",
                        icon: "❌",
                      },
                    ].map((opt) => (
                      <button
                        key={String(opt.val)}
                        onClick={() => setForm((f) => ({ ...f, hasHomeCharging: opt.val }))}
                        className={`p-6 rounded-2xl border text-left transition-all ${
                          form.hasHomeCharging === opt.val
                            ? "bg-ink text-surface border-ink"
                            : "bg-white border-border hover:border-ink/30"
                        }`}
                      >
                        <div className="text-2xl mb-2">{opt.icon}</div>
                        <div className="font-bold text-lg">{opt.label}</div>
                        <div
                          className={`text-xs mt-1 ${
                            form.hasHomeCharging === opt.val ? "text-white/60" : "text-muted"
                          }`}
                        >
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Garage */}
              {step === 4 && (
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted mb-2">Parking</p>
                  <h2 className="text-4xl font-black tracking-tight mb-8">
                    Where do you park?
                  </h2>
                  <div className="space-y-3">
                    {GARAGE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setForm((f) => ({ ...f, garageType: opt.id }))}
                        className={`w-full flex items-center justify-between p-5 rounded-2xl border text-left transition-all ${
                          form.garageType === opt.id
                            ? "bg-ink text-surface border-ink"
                            : "bg-white border-border hover:border-ink/30"
                        }`}
                      >
                        <div>
                          <div className="font-bold">{opt.label}</div>
                          <div
                            className={`text-xs mt-0.5 ${
                              form.garageType === opt.id ? "text-white/60" : "text-muted"
                            }`}
                          >
                            {opt.desc}
                          </div>
                        </div>
                        {form.garageType === opt.id && (
                          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-ink" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Priorities */}
              {step === 5 && (
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted mb-2">Priorities</p>
                  <h2 className="text-4xl font-black tracking-tight mb-2">
                    What matters most?
                  </h2>
                  <p className="text-muted text-sm mb-8">Pick up to 3 priorities.</p>
                  <div className="grid grid-cols-2 gap-2">
                    {PRIORITIES.map((p) => {
                      const selected = form.priorities.includes(p.id);
                      const maxed = !selected && form.priorities.length >= 3;
                      return (
                        <button
                          key={p.id}
                          onClick={() => !maxed && togglePriority(p.id)}
                          disabled={maxed}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            selected
                              ? "bg-ink text-surface border-ink"
                              : maxed
                              ? "bg-white border-border opacity-30 cursor-not-allowed"
                              : "bg-white border-border hover:border-ink/30"
                          }`}
                        >
                          <div className="text-xl mb-1">{p.icon}</div>
                          <div className="font-bold text-sm">{p.label}</div>
                          <div
                            className={`text-xs mt-0.5 ${
                              selected ? "text-white/60" : "text-muted"
                            }`}
                          >
                            {p.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted mt-4 text-center">
                    {form.priorities.length}/3 selected
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="w-full max-w-lg mt-10">
          <button
            onClick={step < TOTAL_STEPS ? next : submit}
            disabled={!canProceed}
            className="w-full bg-ink text-surface py-4 rounded-full font-bold text-sm tracking-wide disabled:opacity-30 hover:bg-ink/90 transition-colors"
          >
            {step < TOTAL_STEPS ? "Continue →" : "Find my matches →"}
          </button>
        </div>
      </div>
    </main>
  );
}
