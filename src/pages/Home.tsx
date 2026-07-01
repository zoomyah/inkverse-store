import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Star, Mail, ChevronRight } from "lucide-react";
import { api } from "@/api/client";
import { HERO_IMAGE, CATEGORY_IMAGES } from "@/data/images";
import type { CategoryInfo, Product } from "@/api/types";
import { CATEGORY_LABELS } from "@/api/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpeedLines } from "@/components/ui/SpeedLines";
import { Halftone } from "@/components/ui/Halftone";
import { ProductCard } from "@/components/product/ProductCard";
import { BurstBadge } from "@/components/ui/BurstBadge";
import { Badge } from "@/components/ui/Badge";
import { useFeaturedProducts } from "@/hooks/useProducts";

export default function Home() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const { items: featured, loading } = useFeaturedProducts();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    api.listCategories().then(setCategories);
    api.listProducts({ sort: "newest", pageSize: 8 }).then((p) =>
      setNewArrivals(p.items.filter((x) => x.isNew).slice(0, 4))
    );
  }, []);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden border-b-2 border-black">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="INKVERSE hero"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ink-base/70 via-ink-base/50 to-ink-deep/90" />
        </div>
        <SpeedLines tone="sakura" className="opacity-60 animate-speed-lines" />
        <Halftone opacity={0.25} />

        <Container className="relative py-24 sm:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge tone="neon">
                <Zap size={11} /> Manga Ink &amp; Neon
              </Badge>
              <span className="font-jp text-cyan-neon text-xs neon-text-cyan">
                アニメ & マンガ マーケットプレース
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="display-tight text-7xl sm:text-8xl lg:text-[9rem] leading-[0.82] text-ink-text text-stroke-ink"
            >
              INK<span className="text-sakura-neon neon-text">VERSE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-lg sm:text-xl text-ink-muted max-w-xl leading-relaxed"
            >
              A premium marketplace for anime &amp; manga devotees. Figures, manga,
              apparel, posters, plushies &amp; accessories — curated for the otaku who
              notices every detail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Link to="/shop">
                <Button size="lg">
                  Enter the World <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/shop?sort=price-asc">
                <Button size="lg" variant="secondary" clip={false}>
                  Shop the Sale
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex gap-8"
            >
              {[
                { n: "14+", l: "Curated drops" },
                { n: "6", l: "Categories" },
                { n: "4.8★", l: "Avg rating" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="display-tight text-3xl text-cyan-neon neon-text-cyan">{s.n}</p>
                  <p className="text-xs uppercase tracking-widest text-ink-muted">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ===== CATEGORIES ===== */}
      <Container className="py-16 sm:py-24">
        <SectionHeading
          eyebrow="Browse"
          jp="カテゴリー"
          title="Find your obsession"
          subtitle="Six worlds of collectibles — pick your panel."
          className="mb-10"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {(categories.length ? categories : []).map((c, i) => (
            <motion.div
              key={c.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link to={`/shop?category=${c.category}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden manga-panel hover:shadow-manga-neon hover:border-sakura-neon transition-all duration-200">
                  <img
                    src={c.image || CATEGORY_IMAGES[c.category]}
                    alt={c.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-jp text-cyan-neon text-xs neon-text-cyan">
                      {CATEGORY_LABELS[c.category].jp}
                    </p>
                    <h3 className="display-tight text-3xl sm:text-4xl text-ink-text uppercase mt-1 flex items-center gap-2">
                      {c.name}
                      <ChevronRight
                        size={22}
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sakura-neon"
                      />
                    </h3>
                  </div>
                  <Halftone opacity={0.1} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* ===== FEATURED ===== */}
      <section className="relative py-16 sm:py-24 border-y-2 border-black bg-ink-deep">
        <Halftone opacity={0.15} />
        <Container className="relative">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <SectionHeading
              eyebrow="Staff picks"
              jp="おすすめ"
              title="Featured drops"
              subtitle="Hand-selected hero pieces — most are limited runs."
            />
            <Link to="/shop">
              <Button variant="ghost" clip={false}>
                View all <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="screentone-skeleton aspect-[3/4] manga-panel" />
                ))
              : featured.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </Container>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      <Container className="py-16 sm:py-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <SectionHeading eyebrow="Fresh" jp="新着" title="New arrivals" />
          <Link to="/shop?sort=newest">
            <Button variant="ghost" clip={false}>
              All new <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </Container>

      {/* ===== SALE BANNER ===== */}
      <Container className="pb-16 sm:pb-24">
        <div className="relative overflow-hidden manga-panel manga-panel-neon p-8 sm:p-12">
          <SpeedLines tone="sakura" className="opacity-40" />
          <Halftone opacity={0.2} />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <BurstBadge tone="sale" label="-20%" animate={false} />
                <span className="font-jp text-cyan-neon text-xs">セール中</span>
              </div>
              <h2 className="display-tight text-4xl sm:text-5xl uppercase text-ink-text">
                Otaku sale — <span className="text-sakura-neon neon-text">20% off</span>
              </h2>
              <p className="text-ink-muted mt-2 max-w-md">
                Use code <span className="font-mono text-manga-gold">INKVERSE20</span> at
                checkout. Stacks with already-discounted items. Limited time.
              </p>
            </div>
            <Link to="/shop?sort=price-asc">
              <Button size="lg" variant="gold">
                Shop the sale <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* ===== NEWSLETTER ===== */}
      <Container className="pb-24">
        <div className="relative overflow-hidden manga-panel p-8 sm:p-12 text-center">
          <Halftone opacity={0.18} />
          <div className="relative max-w-xl mx-auto">
            <Star size={28} className="fill-manga-gold text-manga-gold mx-auto mb-3" />
            <h2 className="display-tight text-3xl sm:text-4xl uppercase">Join the Otaku club</h2>
            <p className="font-jp text-cyan-neon text-xs mt-2 neon-text-cyan">オタククラブ</p>
            <p className="text-ink-muted mt-3">
              Early access to drops, restocks, and a 10% welcome code (
              <span className="font-mono text-sakura-neon">OTAKU10</span>).
            </p>
            {subscribed ? (
              <div className="mt-6 manga-panel manga-panel-cyan p-4">
                <p className="text-cyan-neon font-display uppercase">You're in. Welcome, Otaku.</p>
              </div>
            ) : (
              <form onSubmit={onSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-ink-deep border-2 border-black text-ink-text placeholder:text-ink-muted/60 pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-sakura-neon"
                  />
                </div>
                <Button type="submit">Subscribe</Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
