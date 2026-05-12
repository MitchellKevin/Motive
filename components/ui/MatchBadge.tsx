interface Props {
  score: number;
  size?: "sm" | "lg";
}

export default function MatchBadge({ score, size = "sm" }: Props) {
  const color =
    score >= 85 ? "bg-emerald-500 text-white" : score >= 70 ? "bg-ink text-white" : "bg-border text-ink";

  if (size === "lg") {
    return (
      <div className={`inline-flex items-end gap-1 px-4 py-2 rounded-full ${color}`}>
        <span className="text-4xl font-black leading-none tabular-nums">{score}</span>
        <span className="text-sm font-bold mb-1">% match</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-black ${color}`}>
      <span className="tabular-nums">{score}%</span>
    </div>
  );
}
