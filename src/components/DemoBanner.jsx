import { FlaskConical, TriangleAlert } from "lucide-react";
import { cn } from "@/utils/cn";

const STYLES = {
  info: { box: "border-iris/30 bg-iris/10", icon: "text-iris", Icon: FlaskConical },
  warning: { box: "border-warn/30 bg-warn/10", icon: "text-warn", Icon: TriangleAlert },
};

/** Inline notice used to label demo data / simulated functionality. */
export default function DemoBanner({ title, children, tone = "info", className }) {
  const { box, icon, Icon } = STYLES[tone];
  return (
    <div className={cn("flex gap-3 rounded-2xl border p-4", box, className)} role="note">
      <Icon size={20} className={cn("mt-0.5 shrink-0", icon)} aria-hidden />
      <div className="text-sm leading-relaxed text-muted">
        {title && <p className="mb-0.5 font-semibold text-fg">{title}</p>}
        {children}
      </div>
    </div>
  );
}
