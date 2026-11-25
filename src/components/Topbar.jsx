import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, FlaskConical, LogOut, Menu, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { PAGE_TITLES } from "@/data/constants";
import { cn } from "@/utils/cn";
import { initials } from "@/utils/format";
import { Badge } from "./RiskBadge";
import ThemeToggle from "./ThemeToggle";

function UserMenu() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-10 items-center gap-2.5 rounded-xl border border-line bg-elevated pl-1.5 pr-2.5 transition hover:border-azure/50 sm:pr-3"
      >
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-xs font-bold text-white">
          {initials(user?.name)}
        </span>
        <span className="hidden max-w-[120px] truncate text-sm font-medium text-fg sm:block">{user?.name}</span>
        <ChevronDown size={15} className={cn("text-subtle transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-12 z-50 w-64 animate-pop-in rounded-2xl border border-line bg-card p-2 shadow-2xl shadow-black/40"
        >
          <div className="border-b border-line px-3 pb-3 pt-2">
            <p className="truncate text-sm font-semibold text-fg">{user?.name}</p>
            <p className="truncate text-xs text-subtle">{user?.email}</p>
          </div>
          <Link
            to="/dashboard/settings"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-elevated hover:text-fg"
          >
            <Settings size={16} /> Profile &amp; settings
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              logout();
              toast.info("You have been logged out. See you soon!", { title: "Logged out" });
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-danger/10 hover:text-danger"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}

/** Sticky dashboard header: menu button (mobile), breadcrumb, theme toggle, user menu. */
export default function Topbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname.replace(/\/+$/, "") || "/"] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-canvas/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-elevated text-fg lg:hidden"
      >
        <Menu size={20} />
      </button>

      <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
        <ol className="flex items-center gap-2 text-sm">
          <li className="hidden text-subtle sm:block">CyberShield AI</li>
          <li className="hidden text-subtle sm:block" aria-hidden>
            /
          </li>
          <li className="truncate font-semibold text-fg" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>

      <Badge tone="iris" icon={FlaskConical} className="hidden md:inline-flex">
        Demo mode
      </Badge>
      <ThemeToggle />
      <UserMenu />
    </header>
  );
}
