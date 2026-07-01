import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Plus, Zap } from "lucide-react";
import type { Product } from "@/api/types";
import { formatCurrency } from "@/utils/format";
import { useCartStore } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { BurstBadge } from "@/components/ui/BurstBadge";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCartStore((s) => s.add);
  const triggerBurst = useUiStore((s) => s.triggerCartBurst);
  const onSale = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  const discountPct = onSale
    ? Math.round((1 - product.price / (product.compareAtPrice as number)) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product.id, 1);
    triggerBurst();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative bg-ink-surface border-2 border-black shadow-manga transition-all duration-200 group-hover:-translate-y-1.5 group-hover:shadow-manga-neon group-hover:border-blood-neon overflow-hidden">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-ink-deep">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/80 via-transparent to-transparent" />

            {/* Burst badges */}
            <div className="absolute top-2 left-2 flex gap-2">
              {onSale && <BurstBadge tone="sale" label={`-${discountPct}%`} />}
              {product.isNew && <BurstBadge tone="new" />}
            </div>

            {/* Quick add */}
            <button
              onClick={handleAdd}
              aria-label="Add to cart"
              className={cn(
                "absolute bottom-3 right-3 p-2.5 bg-blood-neon text-white border-2 border-black",
                "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
                "shadow-manga-sm hover:bg-blood-deep transition-all duration-200"
              )}
            >
              <Plus size={16} />
            </button>

            {/* Series tag */}
            <div className="absolute bottom-3 left-3">
              <Badge tone="cyan">{product.series}</Badge>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="flex items-center gap-1 mb-1.5">
              <Star size={13} className="fill-manga-gold text-manga-gold" />
              <span className="text-xs font-mono text-manga-gold">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-ink-muted">({product.reviewsCount})</span>
              {product.stock <= 20 && (
                <span className="ml-auto text-[10px] text-blood-neon uppercase tracking-wider flex items-center gap-1">
                  <Zap size={11} /> Low stock
                </span>
              )}
            </div>
            <h3 className="font-sans font-700 text-ink-text text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-lg text-blood-neon neon-text-blood">
                {formatCurrency(product.price)}
              </span>
              {onSale && (
                <span className="font-mono text-xs text-ink-muted line-through">
                  {formatCurrency(product.compareAtPrice as number)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
