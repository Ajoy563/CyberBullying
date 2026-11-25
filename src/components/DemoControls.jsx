import { FlaskConical } from "lucide-react";
import { DEMO_OUTCOMES, OCR_PROVIDERS } from "@/data/constants";
import { cn } from "@/utils/cn";

/**
 * Demo-only controls. Because no model is connected, the user can choose which
 * sample outcome the simulator returns, and which OCR provider name is passed
 * through the (future) API request.
 */
export default function DemoControls({ outcome, onOutcomeChange, provider, onProviderChange, disabled }) {
  return (
    <div className="space-y-4 rounded-xl border border-iris/25 bg-iris/5 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-fg">
        <FlaskConical size={16} className="text-iris" aria-hidden />
        Demo controls
      </div>

      <div>
        <p id="outcome-label" className="mb-2 text-xs font-medium text-muted">
          Simulated outcome
        </p>
        <div role="radiogroup" aria-labelledby="outcome-label" className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {DEMO_OUTCOMES.map((o) => (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={outcome === o.value}
              disabled={disabled}
              onClick={() => onOutcomeChange(o.value)}
              className={cn(
                "rounded-lg border px-2 py-2 text-xs font-semibold transition",
                outcome === o.value
                  ? "border-azure bg-azure/15 text-fg"
                  : "border-line bg-card text-muted hover:border-azure/50 hover:text-fg",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-subtle">
          No model is connected yet, so pick which sample result the simulator returns. “Auto” derives it from the file.
        </p>
      </div>

      {provider !== undefined && (
        <div>
          <label htmlFor="ocr-provider" className="mb-2 block text-xs font-medium text-muted">
            OCR provider (sent with the request)
          </label>
          <select
            id="ocr-provider"
            value={provider}
            disabled={disabled}
            onChange={(e) => onProviderChange(e.target.value)}
            className="field h-10"
          >
            {OCR_PROVIDERS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
