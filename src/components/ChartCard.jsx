import { cn } from "@/utils/cn";
import Card from "./Card";
import Skeleton from "./Skeleton";

/** Titled card wrapper for Recharts visualisations with a loading skeleton. */
export default function ChartCard({ title, subtitle, action, loading, height = "h-72", className, children }) {
  return (
    <Card className={className}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-fg">{title}</h3>
          {subtitle && <p className="mt-0.5 text-sm text-subtle">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className={cn("w-full", height)}>{loading ? <Skeleton className="h-full w-full rounded-xl" /> : children}</div>
    </Card>
  );
}

/** Legend row shared by custom-legend charts. */
export function ChartLegend({ items }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
      {items.map((item) => (
        <li key={item.name} className="flex items-center gap-2 text-xs text-muted">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
          {item.name}
          {item.value !== undefined && <span className="font-semibold text-fg">{item.value}</span>}
        </li>
      ))}
    </ul>
  );
}
