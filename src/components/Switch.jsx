import { cn } from "@/utils/cn";

/** Accessible on/off toggle. */
export default function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-200",
        checked ? "border-azure bg-azure" : "border-line bg-elevated",
      )}
    >
      <span
        className={cn(
          "absolute left-0.5 top-0.5 h-4.5 w-4.5 rounded-full bg-white shadow transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
}
