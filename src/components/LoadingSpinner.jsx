import { useEffect, useState } from "react";
import { Check, LoaderCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/utils/cn";

/** Small inline spinner used inside buttons and loaders. */
export default function LoadingSpinner({ size = 20, className }) {
  return (
    <LoaderCircle
      size={size}
      className={cn("animate-spin", className)}
      role="status"
      aria-label="Loading"
    />
  );
}

/**
 * Animated "scanning" card shown while a (simulated) analysis runs.
 * Steps advance on a timer purely for visual feedback.
 */
export function AnalysisLoader({ title = "Analysing content…", steps = [], note }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!steps.length) return undefined;
    const id = setInterval(() => setActive((i) => Math.min(i + 1, steps.length - 1)), 750);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-line bg-card p-6 sm:p-8"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
      <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <div className="relative grid h-24 w-24 shrink-0 place-items-center">
          <span className="absolute inset-0 animate-pulse-ring rounded-full border border-aqua/50" />
          <span className="absolute inset-0 animate-pulse-ring rounded-full border border-iris/50 [animation-delay:1.2s]" />
          <span className="absolute inset-2 animate-spin-slow rounded-full border-2 border-dashed border-azure/40" />
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-azure/30">
            <ShieldCheck size={28} />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-fg">{title}</h3>
          <p className="mt-1 text-sm text-muted">{note ?? "Running a simulated analysis – no real AI model is involved."}</p>

          {steps.length > 0 && (
            <ul className="mt-4 space-y-2 text-left">
              {steps.map((step, i) => {
                const done = i < active;
                const current = i === active;
                return (
                  <li
                    key={step}
                    className={cn(
                      "flex items-center gap-2.5 text-sm transition-colors",
                      done ? "text-ok" : current ? "text-fg" : "text-subtle",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                        done ? "border-ok/40 bg-ok/10" : current ? "border-aqua/50" : "border-line",
                      )}
                    >
                      {done ? <Check size={12} /> : current ? <LoadingSpinner size={12} className="text-aqua" /> : null}
                    </span>
                    {step}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
