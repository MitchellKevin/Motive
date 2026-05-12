"use client";
import { motion } from "framer-motion";

interface Props {
  label: string;
  value: number; // 0–10
  delay?: number;
}

export default function ScoreBar({ label, value, delay = 0 }: Props) {
  const pct = (value / 10) * 100;
  const color =
    value >= 8.5 ? "#059669" : value >= 6.5 ? "#1A1A1A" : value >= 4.5 ? "#D97706" : "#DC2626";

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#5C5C5C" }}>
            {label}
          </span>
          <span className="text-xs font-black tabular-nums">{value.toFixed(1)}</span>
        </div>
      )}
      <div className="h-[4px] rounded-full overflow-hidden" style={{ background: "#D8D8D8" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
