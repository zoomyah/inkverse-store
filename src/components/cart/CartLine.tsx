import { Link } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";
import type { Product, CartLine } from "@/api/types";
import { formatCurrency } from "@/utils/format";
import { useCartStore } from "@/store/cartStore";
import { Badge } from "@/components/ui/Badge";

interface CartLineRowProps {
  line: CartLine;
  product: Product | undefined;
}

export function CartLineRow({ line, product }: CartLineRowProps) {
  const updateQty = useCartStore((s) => s.updateQty);
  const remove = useCartStore((s) => s.remove);

  if (!product) return null;

  return (
    <div className="flex gap-4 p-4 manga-panel">
      {/* Image */}
      <Link
        to={`/product/${product.slug}`}
        className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 overflow-hidden border-2 border-black bg-ink-deep"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Badge tone="cyan">{product.series}</Badge>
            <Link to={`/product/${product.slug}`}>
              <h3 className="font-sans font-700 text-sm text-ink-text mt-1.5 hover:text-blood-neon transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
          </div>
          <button
            onClick={() => remove(product.id)}
            aria-label="Remove"
            className="p-1.5 text-ink-muted hover:text-blood-neon hover:bg-white/5 transition-colors shrink-0"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="flex items-end justify-between mt-3 gap-3">
          {/* Qty stepper */}
          <div className="flex items-center border-2 border-black bg-ink-deep">
            <button
              onClick={() => updateQty(product.id, line.quantity - 1)}
              aria-label="Decrease"
              className="p-2 text-ink-muted hover:text-blood-neon transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center font-mono text-sm text-ink-text">
              {line.quantity}
            </span>
            <button
              onClick={() => updateQty(product.id, line.quantity + 1)}
              aria-label="Increase"
              className="p-2 text-ink-muted hover:text-blood-neon transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="text-right">
            <div className="font-mono text-base text-blood-neon neon-text-blood">
              {formatCurrency(product.price * line.quantity)}
            </div>
            <div className="font-mono text-xs text-ink-muted">
              {formatCurrency(product.price)} each
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
