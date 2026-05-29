import { NavLink, useLocation } from "react-router-dom";
import { SITE_CONFIG, NAV_LINKS } from "../config/site";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/25">
            L
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-bold tracking-tight text-white">
              {SITE_CONFIG.brand}
            </div>
            <div className="text-xs text-gray-500">{SITE_CONFIG.tagline}</div>
          </div>
        </NavLink>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                <span className="hidden md:inline">{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
