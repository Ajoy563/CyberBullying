import { CircleCheck, TriangleAlert, ShieldAlert } from "lucide-react";
import { CATEGORIES, RISK_LEVELS, SCAN_TYPES } from "@/data/constants";
import { cn } from "@/utils/cn";

export const TONES = {
  ok: "border-ok/25 bg-ok/10 text-ok",
  warn: "border-warn/30 bg-warn/10 text-warn",
  danger: "border-danger/30 bg-danger/10 text-danger",
  azure: "border-azure/30 bg-azure/10 text-azure",
  aqua: "border-aqua/30 bg-aqua/10 text-aqua",
  iris: "border-iris/30 bg-iris/10 text-iris",
  neutral: "border-line bg-elevated text-muted",
};

/** Generic pill badge. */
export function Badge({ tone = "neutral", icon: Icon, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold leading-none",
        TONES[tone],
        className,
      )}
    >
      {Icon && <Icon size={12} aria-hidden />}
      {children}
    </span>
  );
}

const RISK_TONE = { low: "ok", medium: "warn", high: "danger" };

/** Risk level pill: Low / Medium / High. */
export default function RiskBadge({ level, className }) {
  const risk = RISK_LEVELS[level] ?? RISK_LEVELS.low;
  return (
    <Badge tone={RISK_TONE[risk.key]} className={className}>
      <span className={cn("h-1.5 w-1.5 rounded-full bg-current")} />
      {risk.label} risk
    </Badge>
  );
}

/** Detection status pill: Safe / Potentially Harmful. */
export function StatusBadge({ status, riskLevel, className }) {
  if (status === "safe") {
    return (
      <Badge tone="ok" icon={CircleCheck} className={className}>
        Safe
      </Badge>
    );
  }
  const high = riskLevel === "high";
  return (
    <Badge tone={high ? "danger" : "warn"} icon={high ? ShieldAlert : TriangleAlert} className={className}>
      Potentially Harmful
    </Badge>
  );
}

export function TypeBadge({ type, className }) {
  const cfg = SCAN_TYPES[type];
  if (!cfg) return null;
  return (
    <Badge tone="neutral" icon={cfg.icon} className={className}>
      {cfg.label}
    </Badge>
  );
}

export function CategoryChip({ category, className }) {
  return (
    <Badge tone="neutral" className={cn("font-medium", className)}>
      {CATEGORIES[category]?.label ?? category}
    </Badge>
  );
}
