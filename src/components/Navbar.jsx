import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LANDING_NAV } from "@/data/siteContent";
import useSectionNav from "@/hooks/useSectionNav";
import { cn } from "@/utils/cn";
import Button from "./Button";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

/** Landing-page navigation bar with a mobile slide-down menu. */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const goTo = useSectionNav();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    goTo(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled || open ? "glass border-line shadow-lg shadow-black/10" : "border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {LANDING_NAV.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleNav(item.id)}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted transition hover:bg-elevated hover:text-fg"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <Button to="/dashboard" size="sm">
              Open Dashboard
            </Button>
          ) : (
            <>
              <Button to="/login" variant="ghost" size="sm">
                Login
              </Button>
              <Button to="/signup" size="sm">
                Get Started
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-elevated text-fg"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="animate-fade-in border-t border-line md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {LANDING_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-muted transition hover:bg-elevated hover:text-fg"
              >
                {item.label}
              </button>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-3">
              {isAuthenticated ? (
                <Button to="/dashboard" className="col-span-2">
                  Open Dashboard
                </Button>
              ) : (
                <>
                  <Button to="/login" variant="secondary">
                    Login
                  </Button>
                  <Button to="/signup">Get Started</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
