import { Fragment, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FlaskConical, LogOut, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { DASHBOARD_NAV } from "@/data/constants";
import { cn } from "@/utils/cn";
import { initials } from "@/utils/format";
import Logo from "./Logo";

/** Dashboard sidebar – fixed on desktop, slide-in drawer on tablet/mobile. */
export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const toast = useToast();
  const { pathname } = useLocation();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleLogout = () => {
    logout();
    toast.info("You have been logged out. See you soon!", { title: "Logged out" });
  };

  let lastGroup = null;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        aria-label="Dashboard navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line bg-card transition-transform duration-300 ease-out lg:w-64 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <Logo to="/dashboard" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="grid h-9 w-9 place-items-center rounded-lg text-subtle hover:bg-elevated hover:text-fg lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {DASHBOARD_NAV.map((item) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <Fragment key={item.to}>
                {showGroup && (
                  <p className="px-3 pb-1.5 pt-4 text-[11px] font-semibold uppercase tracking-wider text-subtle first:pt-0">
                    {item.group}
                  </p>
                )}
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive ? "bg-azure/12 text-fg" : "text-muted hover:bg-elevated hover:text-fg",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={cn(
                          "absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-aqua transition-opacity",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <item.icon
                        size={19}
                        className={cn("shrink-0 transition-colors", isActive ? "text-aqua" : "text-subtle group-hover:text-fg")}
                        aria-hidden
                      />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="rounded-full bg-iris/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-iris">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </Fragment>
            );
          })}

          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-all duration-200 hover:bg-danger/10 hover:text-danger"
          >
            <LogOut size={19} className="shrink-0 text-subtle group-hover:text-danger" aria-hidden />
            Logout
          </button>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-line p-4">
          <div className="flex items-start gap-2.5 rounded-xl border border-iris/25 bg-iris/10 p-3 text-xs leading-relaxed text-muted">
            <FlaskConical size={15} className="mt-0.5 shrink-0 text-iris" aria-hidden />
            <span>
              <strong className="text-fg">Demo mode.</strong> Data and results are simulated.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
              {initials(user?.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-fg">{user?.name}</p>
              <p className="truncate text-xs text-subtle">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
