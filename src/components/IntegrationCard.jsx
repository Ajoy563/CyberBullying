import { Plug } from "lucide-react";
import Card from "./Card";
import { Badge } from "./RiskBadge";

/**
 * Honest status panel: shows which parts are only PLANNED and which are the
 * demo simulator. Used on analysis pages to avoid implying a model is connected.
 */
export default function IntegrationCard({ title = "AI integration status", items, endpoint, className }) {
  return (
    <Card className={className}>
      <h3 className="flex items-center gap-2 text-base font-semibold text-fg">
        <Plug size={17} className="text-aqua" aria-hidden />
        {title}
      </h3>
      <ul className="mt-4 space-y-3.5">
        {items.map(({ icon: Icon, label, value, status }) => (
          <li key={label} className="flex items-start gap-3">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-elevated text-subtle">
              <Icon size={16} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-subtle">{label}</p>
              <p className="text-sm font-medium leading-snug text-fg">{value}</p>
            </div>
            <Badge tone={status === "demo" ? "aqua" : "iris"} className="mt-0.5">
              {status === "demo" ? "Demo only" : "Planned"}
            </Badge>
          </li>
        ))}
      </ul>
      {endpoint && (
        <div className="mt-5 rounded-xl border border-line bg-elevated/60 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Future endpoint</p>
          <code className="mt-1 block break-all text-xs text-aqua">{endpoint}</code>
        </div>
      )}
    </Card>
  );
}
