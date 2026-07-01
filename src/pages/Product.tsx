import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, Check, Package } from "lucide-react";
import { api } from "@/api/client";
import type { Product } from "@/api/types";
import { useProduct, useFeaturedProducts } from "@/hooks/useProducts";
import { formatCurrency } from "@/utils/format";
import { useCartStore } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BurstBadge } from "@/components/ui/BurstBadge";
import { Gallery } from "@/components/product/Gallery";
import { ProductCard } from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { CATEGORY_LABELS } from "@/api/types";

export default function ProductPage() {
  const { slug } = useParams();
  const { product, loading, error } = useProduct(slug);
  const [qty, setQty] = useState(1);
  const [related, setRelated] = useState<Product[]>([]);
  const [added, setAdded] = useState(false);
  const add = useCartStore((s) => s.add);
  const triggerBurst = useUiStore((s) => s.triggerCartBurst);

  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [slug]);

  useEffect(() => {
    if (!product) return;
    api.listProducts({ series: product.series, pageSize: 100 }).then((res) =>
      setRelated(res.items.filter((p) => p.id !== product.id).slice(0, 4))
    );
  }, [product]);

  const onAdd = () => {
    if (!product) return;
    add(product.id, qty);
    triggerBurst();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  if (loading) {
    return (
      <Container className="py-14">
        <div className="grid lg:grid-cols-2 gap-10">
          <Skeleton className="aspect-square w-full" rounded="none" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-1/2" />
          </div>
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-24 text-center">
        <p className="display-tight text-4xl text-ink-muted">404</p>
        <p className="font-jp text-cyan-neon mt-2">見つかりません</p>
        <p className="text-ink-muted mt-3">This product slipped into another dimension.</p>
        <Link to="/shop" className="inline-block mt-6">
          <Button>Back to shop</Button>
        </Link>
      </Container>
    );
  }

  const onSale = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  const discountPct = onSale
    ? Math.round((1 - product.price / (product.compareAtPrice as number)) * 100)
    : 0;

  return (
    <Container className="py-10 sm:py-14">
      <Link
        to="/shop"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-ink-muted hover:text-sakura-neon mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <Gallery images={product.images} alt={product.name} name={product.series} />
        </div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Badge tone="cyan">{product.series}</Badge>
            <Badge tone="muted">{CATEGORY_LABELS[product.category].name}</Badge>
            {product.isNew && <Badge tone="neon">New</Badge>}
          </div>

          <h1 className="display-tight text-4xl sm:text-5xl text-ink-text uppercase leading-[0.95]">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(product.rating)
                      ? "fill-manga-gold text-manga-gold"
                      : "text-ink-muted/30"
                  }
                />
              ))}
            </div>
            <span className="font-mono text-sm text-manga-gold">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-ink-muted">({product.reviewsCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-6">
            <span className="font-display text-4xl text-sakura-neon neon-text">
              {formatCurrency(product.price)}
            </span>
            {onSale && (
              <>
                <span className="font-mono text-lg text-ink-muted line-through">
                  {formatCurrency(product.compareAtPrice as number)}
                </span>
                <BurstBadge tone="sale" label={`-${discountPct}%`} />
              </>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mt-3 text-xs">
            <Package size={14} className="text-cyan-neon" />
            <span className={product.stock > 0 ? "text-cyan-neon" : "text-sakura-neon"}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          {/* Description */}
          <p className="text-ink-muted mt-6 leading-relaxed">{product.description}</p>

          {/* Qty + add */}
          <div className="flex items-center gap-3 mt-8">
            <div className="flex items-center border-2 border-black bg-ink-deep">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3 text-ink-muted hover:text-sakura-neon transition-colors"
                aria-label="Decrease"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-mono text-ink-text">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="p-3 text-ink-muted hover:text-sakura-neon transition-colors"
                aria-label="Increase"
              >
                <Plus size={16} />
              </button>
            </div>
            <Button
              size="lg"
              onClick={onAdd}
              disabled={product.stock === 0}
              className="flex-1"
            >
              {added ? (
                <>
                  <Check size={18} /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} /> Add to cart —{" "}
                  {formatCurrency(product.price * qty)}
                </>
              )}
            </Button>
          </div>

          {/* Specs */}
          <div className="mt-10">
            <h3 className="katakana-eyebrow text-[11px] text-ink-muted mb-3">Specifications</h3>
            <dl className="manga-panel divide-y divide-white/5">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 p-3 text-sm">
                  <dt className="text-ink-muted uppercase tracking-wider text-xs">{k}</dt>
                  <dd className="text-ink-text text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="katakana-eyebrow text-[11px] text-sakura-neon">Same series</p>
              <h2 className="display-tight text-3xl uppercase mt-1">More from {product.series}</h2>
            </div>
            <Link to={`/shop?series=${encodeURIComponent(product.series)}`}>
              <Button variant="ghost" clip={false}>
                View series
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
