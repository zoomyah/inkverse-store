import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Truck } from "lucide-react";
import type { Product, CartLine, Coupon } from "@/api/types";
import { breakdown, FREE_SHIPPING_THRESHOLD } from "@/utils/pricing";
import { formatCurrency } from "@/utils/format";
import { CouponInput } from "./CouponInput";
import { Button } from "@/components/ui/Button";

interface CartSummaryProps {
  items: CartLine[];
  products: Product[];
  coupon?: Coupon;
  children?: ReactNode;
  showCoupon?: boolean;
}

export function CartSummary({
  items,
  products,
  coupon,
  children,
  showCoupon = true,
}: CartSummaryProps) {
  const b = breakdown(items, products, coupon);

  return (
    <div className="manga-panel manga-panel-neon p-5 sticky top-20 space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="display-tight text-2xl uppercase">Order Summary</h3>
        <span className="font-jp text-cyan-neon text-xs">合計</span>
      </div>

      {showCoupon && <CouponInput />}

      <dl className="space-y-2.5 font-mono text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-muted">Subtotal</dt>
          <dd className="text-ink-text">{formatCurrency(b.subtotal)}</dd>
        </div>
        {b.discount > 0 && (
          <div className="flex justify-between text-cyan-neon">
            <dt>Discount</dt>
            <dd>-{formatCurrency(b.discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-ink-muted">Shipping</dt>
          <dd className={b.shipping === 0 ? "text-cyan-neon" : "text-ink-text"}>
            {b.shipping === 0 ? "FREE" : formatCurrency(b.shipping)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-muted">Tax (8%)</dt>
          <dd className="text-ink-text">{formatCurrency(b.tax)}</dd>
        </div>
      </dl>

      {!b.freeShippingUnlocked && (
        <div className="flex items-center gap-2 p-2.5 border border-manga-gold/40 bg-manga-gold/5">
          <Truck size={16} className="text-manga-gold shrink-0" />
          <p className="text-xs text-ink-text">
            Add <span className="font-mono text-manga-gold">{formatCurrency(b.amountToFreeShipping)}</span>{" "}
            for free shipping
          </p>
        </div>
      )}

      <div className="flex items-baseline justify-between border-t-2 border-black pt-4">
        <span className="katakana-eyebrow text-[11px] text-ink-muted">Total</span>
        <span className="font-display text-3xl text-blood-neon neon-text-blood">
          {formatCurrency(b.total)}
        </span>
      </div>

      {children ?? (
        <Button className="w-full" size="lg">
          <Link to="/checkout" className="inline-flex items-center gap-2">
            Checkout
          </Link>
        </Button>
      )}

      <p className="font-jp text-[10px] text-ink-muted text-center">
        Free shipping over {formatCurrency(FREE_SHIPPING_THRESHOLD)} · Coupons: OTAKU10 · INKVERSE20
      </p>
    </div>
  );
}
