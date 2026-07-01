import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Menu, X, User, Shield } from "lucide-react";
import { useCartStore, cartCount } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=figures", label: "Figures" },
  { to: "/shop?category=manga", label: "Manga" },
  { to: "/shop?sort=price-asc", label: "Sale" },
];

export function Navbar() {
  const items = useCartStore((s) => s.items);
  const count = cartCount(items);
  const lastAddedId = useCartStore((s) => s.lastAddedId);
  const clearLastAdded = useCartStore((s) => s.clearLastAdded);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { mobileNavOpen, setMobileNavOpen } = useUiStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setSearchOpen(false);
      setMobileNavOpen(false);
    }
  };

  const burst = Boolean(lastAddedId);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-ink-base/95 backdrop-blur-md">
      <Container size="wide">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2 shrink-0">
            <span className="display-tight text-2xl sm:text-3xl tracking-tight">
              <span className="text-ink-text">INK</span>
              <span className="text-blood-neon neon-text-blood">VERSE</span>
            </span>
            <span className="hidden sm:inline font-jp text-[10px] text-cyan-neon leading-none mt-1">
              インク
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 text-xs font-sans font-600 uppercase tracking-widest transition-colors",
                    isActive
                      ? "text-blood-neon"
                      : "text-ink-muted hover:text-ink-text"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className="p-2 text-ink-muted hover:text-cyan-neon transition-colors"
            >
              <Search size={20} />
            </button>

            <Link
              to={user ? "/account" : "/login"}
              aria-label="Account"
              className="p-2 text-ink-muted hover:text-manga-gold transition-colors hidden sm:block"
            >
              {user?.role === "admin" ? <Shield size={20} /> : <User size={20} />}
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative p-2 text-ink-muted hover:text-blood-neon transition-colors"
            >
              <ShoppingCart size={20} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={burst ? lastAddedId : "count"}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    onAnimationComplete={clearLastAdded}
                    className="starburst absolute -top-1.5 -right-1.5 flex items-center justify-center bg-blood-neon text-white font-display text-[9px]"
                    style={{ width: 22, height: 22 }}
                  >
                    {count > 9 ? "9+" : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Menu"
              className="lg:hidden p-2 text-ink-muted hover:text-blood-neon transition-colors"
            >
              {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.form
              onSubmit={onSearch}
              className="pb-3"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="flex items-center gap-2 border-2 border-black bg-ink-deep px-3 shadow-manga-sm">
                <Search size={18} className="text-ink-muted shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search figures, manga, series…"
                  className="flex-1 bg-transparent py-2.5 text-sm text-ink-text placeholder:text-ink-muted/60 focus:outline-none"
                />
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </Container>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.nav
            className="lg:hidden border-t-2 border-black bg-ink-deep"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Container className="py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-3 text-sm font-sans font-600 uppercase tracking-widest border-l-2",
                      isActive
                        ? "text-blood-neon border-blood-neon bg-white/5"
                        : "text-ink-muted border-transparent hover:text-ink-text"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="h-px bg-white/5 my-2" />
              {user ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMobileNavOpen(false)}
                    className="px-3 py-3 text-sm uppercase tracking-widest text-manga-gold"
                  >
                    Account
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileNavOpen(false)}
                      className="px-3 py-3 text-sm uppercase tracking-widest text-cyan-neon"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileNavOpen(false);
                      navigate("/");
                    }}
                    className="px-3 py-3 text-left text-sm uppercase tracking-widest text-ink-muted"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileNavOpen(false)}
                  className="px-3 py-3 text-sm uppercase tracking-widest text-blood-neon"
                >
                  Login / Register
                </Link>
              )}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
