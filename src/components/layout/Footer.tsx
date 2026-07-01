import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Github, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";

const columns = [
  {
    title: "Shop",
    links: [
      { to: "/shop", label: "All Products" },
      { to: "/shop?category=figures", label: "Figures" },
      { to: "/shop?category=manga", label: "Manga" },
      { to: "/shop?category=apparel", label: "Apparel" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/account", label: "Track Order" },
      { to: "/cart", label: "Cart" },
      { to: "/login", label: "Account" },
      { to: "/admin", label: "Admin" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t-2 border-black bg-ink-deep">
      <div className="absolute inset-0 halftone opacity-30 pointer-events-none" />
      <Container className="relative py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="display-tight text-3xl">
              <span className="text-ink-text">INK</span>
              <span className="text-blood-neon neon-text-blood">VERSE</span>
            </Link>
            <p className="font-jp text-cyan-neon text-xs mt-2 neon-text-cyan">
              アニメ & マンガ マーケットプレース
            </p>
            <p className="text-ink-muted text-sm mt-4 max-w-sm">
              A premium marketplace for anime &amp; manga devotees. Figures, manga, apparel,
              posters, plushies &amp; accessories — curated for the otaku who notices the
              details.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Twitter, Youtube, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="p-2 border-2 border-black bg-ink-raised text-ink-muted hover:text-blood-neon hover:border-blood-neon shadow-manga-sm transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="katakana-eyebrow text-[11px] text-blood-neon mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-ink-muted hover:text-ink-text transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} INKVERSE. Manga Ink &amp; Neon. Built for the
            portfolio.
          </p>
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <Mail size={14} className="text-cyan-neon" />
            <span>otaku@inkverse.shop</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
