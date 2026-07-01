import { Truck } from "lucide-react";
import type { Product, CartLine, Coupon } from "@/api/types";
import { breakdown } from "@/utils/pricing";
import { formatCurrency } from "@/utils/format";

interface OrderSummaryProps {
  items: CartLine[];
  products: Product[];
  coupon?: Coupon;
}

export function OrderSummary({ items, products, coupon }: OrderSummaryProps) {
  const b = breakdown(items, products, coupon);

  return (
    <div className="manga-panel p-5 space-y-4">
      <h3 className="display-tight text-xl uppercase">Order Review</h3>

      <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {items.map((line) => {
          const p = products.find((x) => x.id === line.productId);
          if (!p) return null;
          return (
            <li key={line.productId} className="flex items-center gap-3 text-sm">
              <div className="w-10 h-10 shrink-0 overflow-hidden border border-black bg-ink-deep">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-ink-text truncate">{p.name}</p>
                <p className="text-xs text-ink-muted font-mono">×{line.quantity}</p>
              </div>
              <span className="font-mono text-ink-text">
                {formatCurrency(p.price * line.quantity)}
              </span>
            </li>
          );
        })}
      </ul>

      <dl className="space-y-2 font-mono text-sm border-t border-white/5 pt-3">
        <div className="flex justify-between">
          <dt className="text-ink-muted">Subtotal</dt>
          <dd className="text-ink-text">{formatCurrency(b.subtotal)}</dd>
        </div>
        {b.discount > 0 && (
          <div className="flex justify-between text-cyan-neon">
            <dt>Discount {coupon ? `(${coupon.code})` : ""}</dt>
            <dd>-{formatCurrency(b.discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-ink-muted flex items-center gap-1">
            <Truck size={13} /> Shipping
          </dt>
          <dd className={b.shipping === 0 ? "text-cyan-neon" : "text-ink-text"}>
            {b.shipping === 0 ? "FREE" : formatCurrency(b.shipping)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-muted">Tax</dt>
          <dd className="text-ink-text">{formatCurrency(b.tax)}</dd>
        </div>
      </dl>

      <div className="flex items-baseline justify-between border-t-2 border-black pt-3">
        <span className="katakana-eyebrow text-[11px] text-ink-muted">Total</span>
        <span className="font-display text-2xl text-sakura-neon neon-text">
          {formatCurrency(b.total)}
        </span>
      </div>
    </div>
  );
}
