import { cn } from "@/utils/cn";

/** Consistent page title block used at the top of each dashboard page. */
export default function PageHeader({ title, description, icon: Icon, actions, className }) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", className)}>
      <div className="flex items-start gap-4">
        {Icon && (
          <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-azure/25 sm:grid">
            <Icon size={24} aria-hidden />
          </span>
        )}
        <div>
          <h1 className="text-2xl font-bold text-fg sm:text-3xl">{title}</h1>
          {description && <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}
