import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/utils/cn";

export function LogoMark({ className, size = 36 }) {
  return (
    <span
      className={cn("grid shrink-0 place-items-center rounded-xl bg-brand text-white shadow-lg shadow-azure/30", className)}
      style={{ width: size, height: size }}
    >
      <ShieldCheck size={size * 0.56} strokeWidth={2.2} />
    </span>
  );
}

export default function Logo({ to = "/", className, onClick }) {
  return (
    <Link to={to} onClick={onClick} className={cn("group inline-flex items-center gap-2.5", className)} aria-label="CyberShield AI home">
      <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
      <span className="font-display text-lg font-bold tracking-tight text-fg">
        CyberShield<span className="text-aqua"> AI</span>
      </span>
    </Link>
  );
}
