import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/utils/cn";
import Card from "./Card";
import Skeleton from "./Skeleton";

const TONES = {
  azure: "bg-azure/10 text-azure",
  ok: "bg-ok/10 text-ok",
  warn: "bg-warn/10 text-warn",
  danger: "bg-danger/10 text-danger",
  iris: "bg-iris/10 text-iris",
  aqua: "bg-aqua/10 text-aqua",
};

/**
 * KPI card. `trend` is a percentage change (or null when unavailable).
 * Set `inverseTrend` when an increase is bad news (e.g. harmful content).
 */
export default function StatCard({ label, value, icon: Icon, tone = "azure", trend, inverseTrend = false, hint, loading }) {
  if (loading) {
    return (
      <Card>
        <div className="flex items-start justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-10 rounded-xl" />
        </div>
        <Skeleton className="mt-5 h-9 w-24" />
        <Skeleton className="mt-4 h-3.5 w-36" />
      </Card>
    );
  }

  const hasTrend = typeof trend === "number";
  const up = hasTrend && trend >= 0;
  const good = hasTrend && (inverseTrend ? !up : up);
  const TrendIcon = up ? TrendingUp : TrendingDown;

  return (
    <Card hover className="group">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted">{label}</p>
        <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110", TONES[tone])}>
          <Icon size={20} aria-hidden />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-bold tracking-tight text-fg">{value.toLocaleString()}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        {hasTrend && (
          <span className={cn("inline-flex items-center gap-1 font-semibold", good ? "text-ok" : "text-danger")}>
            <TrendIcon size={14} aria-hidden />
            {Math.abs(trend)}%
          </span>
        )}
        <span className="text-subtle">{hint ?? (hasTrend ? "vs previous 7 days" : "No previous-week data")}</span>
      </div>
    </Card>
  );
}
