import { Link } from "react-router-dom";
import { FlaskConical } from "lucide-react";
import { LANDING_NAV } from "@/data/siteContent";
import useSectionNav from "@/hooks/useSectionNav";
import Logo from "./Logo";

const linkClass = "text-sm text-muted transition hover:text-fg";

export default function Footer() {
  const goTo = useSectionNav();

  return (
    <footer className="border-t border-line bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              A multimodal cyberbullying detection concept that combines text, image and OCR analysis to help
              moderators spot potentially harmful content.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-fg">Explore</h3>
            <ul className="space-y-3">
              {LANDING_NAV.map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => goTo(item.id)} className={linkClass}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-fg">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className={linkClass}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className={linkClass}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/forgot-password" className={linkClass}>
                  Forgot Password
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className={linkClass}>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-fg">Project information</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>College final-year project</li>
              <li>Multimodal cyberbullying detection</li>
              <li>Stage: frontend prototype</li>
            </ul>
            <p className="mt-4 flex items-start gap-2 rounded-xl border border-iris/25 bg-iris/10 p-3 text-xs leading-relaxed text-muted">
              <FlaskConical size={14} className="mt-0.5 shrink-0 text-iris" aria-hidden />
              All results and statistics shown are simulated demo data.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-subtle sm:flex-row">
          <p>© {new Date().getFullYear()} CyberShield AI. Academic project – not a commercial product.</p>
          <p>Built with React, Vite &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
