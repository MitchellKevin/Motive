"use client";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import { motion } from "framer-motion";

const IM = (make: string, model: string) =>
  `https://cdn.imagin.studio/getimage?customer=img&zoomType=fullscreen&angle=29&make=${make}&modelFamily=${model}`;

const FEATURED_CARS = [
  {
    name: "Škoda Octavia Combi",
    tag: "Best family wagon",
    img: IM("skoda", "octavia"),
  },
  {
    name: "Tesla Model 3",
    tag: "Top EV pick",
    img: IM("tesla", "model-3"),
  },
  {
    name: "Toyota RAV4 Hybrid",
    tag: "Most reliable SUV",
    img: IM("toyota", "rav4"),
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell us your life",
    body: "Budget, family, how you drive, where you park. Real questions for real situations.",
  },
  {
    step: "02",
    title: "We match intelligently",
    body: "Our algorithm weighs practicality, costs, reliability and lifestyle fit — not just specs.",
  },
  {
    step: "03",
    title: "Own with confidence",
    body: "See your Top 5 matches with honest ownership insights and hidden costs revealed.",
  },
];

const STATS = [
  { value: "20+", label: "Cars analysed" },
  { value: "8", label: "Scoring dimensions" },
  { value: "100%", label: "Practical focus" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-surface text-ink overflow-hidden">
      <Nav />

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-8 lg:px-16">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={FEATURED_CARS[0].img}
            alt="Featured car"
            className="w-full h-full object-cover opacity-[0.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-transparent to-surface" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-[1px] bg-ink" />
            <span className="text-xs tracking-widest uppercase text-muted">
              Practical car intelligence
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(3rem,10vw,9rem)] font-black leading-[0.88] tracking-tighter mb-10 max-w-5xl"
          >
            Find the car
            <br />
            <span className="text-muted">that fits</span>
            <br />
            your life.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-muted max-w-md mb-12 leading-relaxed"
          >
            Not horsepower. Not 0–100. We match you with the car that makes sense for your budget,
            family, commute, and real-world life.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <Link
              href="/quiz"
              className="group flex items-center gap-3 bg-ink text-surface px-8 py-4 rounded-full text-sm font-bold tracking-wide hover:bg-ink/90 transition-colors"
            >
              Find my match
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/compare"
              className="text-sm text-muted hover:text-ink transition-colors tracking-wide"
            >
              Compare cars →
            </Link>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-10 flex gap-12 max-w-7xl mx-auto w-full border-t border-border pt-8"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-black">{s.value}</div>
              <div className="text-xs text-muted tracking-widest uppercase mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURED CARS STRIP */}
      <section className="px-8 lg:px-16 py-24 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-2">Top picks this week</p>
            <h2 className="text-4xl font-black tracking-tight">Popular matches</h2>
          </div>
          <Link href="/quiz" className="text-sm text-muted hover:text-ink transition-colors">
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURED_CARS.map((car, i) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-border cursor-pointer"
            >
              <img
                src={car.img}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-[10px] tracking-widest uppercase text-white/60 mb-1">{car.tag}</p>
                <p className="text-lg font-bold text-white">{car.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-ink text-surface px-8 lg:px-16 py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <p className="text-xs tracking-widest uppercase text-white/30 mb-4">How it works</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tight max-w-xl leading-tight">
              Three steps to clarity.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className="text-6xl font-black text-white/10 mb-6">{step.step}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATOR */}
      <section className="px-8 lg:px-16 py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-widest uppercase text-muted mb-4">Our approach</p>
            <h2 className="text-5xl font-black tracking-tight leading-tight mb-8">
              Real ownership
              <br />
              intelligence.
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Most platforms show you specs. We show you what it&apos;s actually like to own the car
              — insurance surprises, parking challenges, reliability track records, and hidden
              running costs.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all"
            >
              Start your match
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {[
              { icon: "✅", text: "2 child seats fit comfortably without compromise" },
              { icon: "✅", text: "Excellent for 40,000 km/year — diesel efficiency pays off" },
              { icon: "⚠️", text: "Expensive insurance for under-25 drivers" },
              { icon: "⚠️", text: "Poor without home charging — adds €800/year" },
              { icon: "✅", text: "Best-in-class reliability — fewer surprises in 5 years" },
              { icon: "⚠️", text: "Narrow parking spaces will be a daily challenge" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border"
              >
                <span className="text-base">{item.icon}</span>
                <p className="text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-8 lg:px-16 pb-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-ink rounded-3xl p-12 lg:p-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <div>
            <h2 className="text-4xl lg:text-6xl font-black text-surface tracking-tight mb-3">
              Ready to find
              <br />
              your match?
            </h2>
            <p className="text-white/40 text-sm">Takes less than 3 minutes.</p>
          </div>
          <Link
            href="/quiz"
            className="flex-shrink-0 bg-surface text-ink px-10 py-5 rounded-full text-sm font-black tracking-wide hover:bg-surface/90 transition-colors whitespace-nowrap"
          >
            Start now →
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-8 lg:px-16 py-8 flex items-center justify-between">
        <span className="text-xs font-black tracking-widest uppercase">Motive</span>
        <span className="text-xs text-muted">Practical car intelligence</span>
      </footer>
    </main>
  );
}
