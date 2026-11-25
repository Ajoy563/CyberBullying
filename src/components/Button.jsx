import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import LoadingSpinner from "./LoadingSpinner";

const VARIANTS = {
  primary:
    "bg-brand text-white shadow-lg shadow-azure/25 hover:brightness-110 hover:shadow-xl hover:shadow-azure/30",
  secondary: "border border-line bg-elevated text-fg hover:border-azure/50 hover:bg-elevated/60",
  outline: "border border-azure/40 text-azure hover:bg-azure/10",
  ghost: "text-muted hover:bg-elevated hover:text-fg",
  danger: "border border-danger/30 bg-danger/10 text-danger hover:bg-danger/20",
  dangerSolid: "bg-danger text-white hover:brightness-110",
};

const SIZES = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

/**
 * Design-system button. Renders a router <Link> when `to` is set, an <a> when
 * `href` is set, otherwise a <button>.
 */
export default function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  to,
  href,
  className,
  children,
  disabled,
  type = "button",
  ...props
}) {
  const classes = cn(
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
  const iconSize = size === "sm" ? 16 : 18;

  const content = (
    <>
      {loading ? <LoadingSpinner size={iconSize} /> : Icon && <Icon size={iconSize} aria-hidden />}
      {children}
      {IconRight && !loading && <IconRight size={iconSize} aria-hidden />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      {content}
    </button>
  );
}
