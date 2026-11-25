import { cn } from "@/utils/cn";

/** Base surface used throughout the dashboard and landing page. */
export default function Card({ as: Tag = "div", hover = false, padded = true, className, children, ...props }) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-line bg-card",
        padded && "p-5 sm:p-6",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-azure/40 hover:shadow-xl hover:shadow-azure/10",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
