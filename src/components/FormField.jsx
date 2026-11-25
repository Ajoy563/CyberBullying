import { useId, useState } from "react";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * Labelled input with optional leading icon, inline error and a
 * show/hide toggle when type="password".
 */
export default function FormField({ label, type = "text", icon: Icon, error, hint, labelRight, className, ...inputProps }) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
        {labelRight}
      </div>

      <div className="relative">
        {Icon && <Icon size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" aria-hidden />}
        <input
          id={id}
          type={isPassword && visible ? "text" : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "field h-12",
            Icon && "pl-11",
            isPassword && "pr-12",
            error && "border-danger focus:border-danger focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--danger)_25%,transparent)]",
          )}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-subtle transition hover:bg-card hover:text-fg"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs text-danger">
          <CircleAlert size={14} className="mt-px shrink-0" aria-hidden />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-subtle">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
