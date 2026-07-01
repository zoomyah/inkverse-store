import type { CartLine, Coupon, Product } from "@/api/types";
import { COUPONS } from "@/api/types";

// ===== Pure pricing logic (unit-tested in tests/pricing.test.ts) =====

export const TAX_RATE = 0.08;
export const FREE_SHIPPING_THRESHOLD = 100;
export const FLAT_SHIPPING = 8;

/** Sum of line prices (price * quantity). */
export function subtotal(lines: CartLine[], products: Product[]): number {
  const byId = new Map(products.map((p) => [p.id, p]));
  return lines.reduce((sum, line) => {
    const p = byId.get(line.productId);
    if (!p) return sum;
    return sum + p.price * line.quantity;
  }, 0);
}

/** Look up a coupon by code. Returns undefined if invalid. */
export function findCoupon(code?: string): Coupon | undefined {
  if (!code) return undefined;
  return COUPONS.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
}

/** Discount amount given a subtotal and (optional) applied coupon. */
export function discount(sub: number, coupon?: Coupon): number {
  if (!coupon) return 0;
  if (sub <= 0) return 0;
  return +(sub * (coupon.percentOff / 100)).toFixed(2);
}

/** Shipping fee — free over the threshold, otherwise flat. */
export function shipping(sub: number): number {
  if (sub <= 0) return 0;
  return sub >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
}

/** Tax on the (subtotal - discount) basis. */
export function tax(sub: number, disc: number, rate = TAX_RATE): number {
  const basis = Math.max(0, sub - disc);
  return +(basis * rate).toFixed(2);
}

/** Grand total. */
export function total(sub: number, disc: number, ship: number, taxAmount: number): number {
  return +(Math.max(0, sub - disc) + ship + taxAmount).toFixed(2);
}

export interface PriceBreakdown {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingUnlocked: boolean;
  amountToFreeShipping: number;
}

/** Convenience: full breakdown from cart lines + products + optional coupon. */
export function breakdown(
  lines: CartLine[],
  products: Product[],
  coupon?: Coupon
): PriceBreakdown {
  const sub = subtotal(lines, products);
  const disc = discount(sub, coupon);
  const ship = shipping(sub);
  const taxAmount = tax(sub, disc);
  const grand = total(sub, disc, ship, taxAmount);
  return {
    subtotal: +sub.toFixed(2),
    discount: disc,
    shipping: ship,
    tax: taxAmount,
    total: grand,
    freeShippingUnlocked: sub >= FREE_SHIPPING_THRESHOLD,
    amountToFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - sub),
  };
}
