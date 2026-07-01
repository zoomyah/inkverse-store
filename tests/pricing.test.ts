import { describe, it, expect } from "vitest";
import {
  subtotal,
  discount,
  shipping,
  tax,
  total,
  findCoupon,
  breakdown,
  FREE_SHIPPING_THRESHOLD,
  FLAT_SHIPPING,
  TAX_RATE,
} from "@/utils/pricing";
import { COUPONS } from "@/api/types";
import type { CartLine, Product } from "@/api/types";

const PRODUCTS: Product[] = [
  {
    id: "a",
    slug: "a",
    name: "A",
    category: "figures",
    series: "Neo Samurai",
    price: 40,
    images: [],
    description: "",
    specs: {},
    rating: 5,
    reviewsCount: 1,
    stock: 10,
    featured: false,
    isNew: false,
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "b",
    slug: "b",
    name: "B",
    category: "manga",
    series: "Neo Samurai",
    price: 15,
    images: [],
    description: "",
    specs: {},
    rating: 5,
    reviewsCount: 1,
    stock: 10,
    featured: false,
    isNew: false,
    createdAt: "2026-01-01T00:00:00Z",
  },
];

const lines = (ls: [string, number][]): CartLine[] =>
  ls.map(([productId, quantity]) => ({ productId, quantity }));

describe("pricing / subtotal", () => {
  it("sums price * quantity across lines", () => {
    expect(subtotal(lines([["a", 2], ["b", 3]]), PRODUCTS)).toBe(40 * 2 + 15 * 3);
  });

  it("returns 0 for empty cart", () => {
    expect(subtotal([], PRODUCTS)).toBe(0);
  });

  it("ignores unknown product ids", () => {
    expect(subtotal(lines([["a", 1], ["zzz", 5]]), PRODUCTS)).toBe(40);
  });
});

describe("pricing / discount + coupons", () => {
  it("finds OTAKU10 and INKVERSE20 coupons (case-insensitive)", () => {
    expect(findCoupon("OTAKU10")?.percentOff).toBe(10);
    expect(findCoupon("otaku10")?.percentOff).toBe(10);
    expect(findCoupon("INKVERSE20")?.percentOff).toBe(20);
  });

  it("returns undefined for invalid coupon", () => {
    expect(findCoupon("NOPE")).toBeUndefined();
    expect(findCoupon(undefined)).toBeUndefined();
  });

  it("OTAKU10 = 10% off subtotal", () => {
    const sub = 100;
    const c = COUPONS.find((c) => c.code === "OTAKU10")!;
    expect(discount(sub, c)).toBe(10);
  });

  it("INKVERSE20 = 20% off subtotal", () => {
    const sub = 100;
    const c = COUPONS.find((c) => c.code === "INKVERSE20")!;
    expect(discount(sub, c)).toBe(20);
  });

  it("discount is 0 without a coupon", () => {
    expect(discount(100, undefined)).toBe(0);
  });

  it("discount is 0 for non-positive subtotal", () => {
    const c = COUPONS[0];
    expect(discount(0, c)).toBe(0);
    expect(discount(-50, c)).toBe(0);
  });
});

describe("pricing / shipping", () => {
  it("is free at/over the threshold", () => {
    expect(shipping(FREE_SHIPPING_THRESHOLD)).toBe(0);
    expect(shipping(200)).toBe(0);
  });

  it("is the flat fee below the threshold", () => {
    expect(shipping(99.99)).toBe(FLAT_SHIPPING);
    expect(shipping(1)).toBe(FLAT_SHIPPING);
  });

  it("is 0 for empty cart", () => {
    expect(shipping(0)).toBe(0);
  });
});

describe("pricing / tax", () => {
  it("taxes the discounted basis", () => {
    expect(tax(100, 20)).toBe(+(80 * TAX_RATE).toFixed(2));
  });

  it("never taxes a negative basis", () => {
    expect(tax(10, 50)).toBe(0);
  });
});

describe("pricing / total", () => {
  it("computes grand total = (sub - discount) + shipping + tax", () => {
    const sub = 100;
    const disc = 20;
    const ship = 8;
    const taxAmount = tax(sub, disc);
    expect(total(sub, disc, ship, taxAmount)).toBe(
      +((100 - 20) + 8 + taxAmount).toFixed(2)
    );
  });

  it("does not go negative", () => {
    expect(total(10, 50, 0, 0)).toBe(0);
  });
});

describe("pricing / breakdown", () => {
  it("aggregates a full breakdown with a coupon", () => {
    const b = breakdown(lines([["a", 2]]), PRODUCTS, findCoupon("OTAKU10"));
    const sub = 80;
    expect(b.subtotal).toBe(sub);
    expect(b.discount).toBe(+(sub * 0.1).toFixed(2));
    expect(b.shipping).toBe(FLAT_SHIPPING); // 80 < 100
    expect(b.tax).toBe(tax(sub, b.discount));
    expect(b.total).toBe(total(sub, b.discount, b.shipping, b.tax));
    expect(b.freeShippingUnlocked).toBe(false);
    expect(b.amountToFreeShipping).toBe(FREE_SHIPPING_THRESHOLD - sub);
  });

  it("unlocks free shipping over the threshold", () => {
    const b = breakdown(lines([["a", 3]]), PRODUCTS); // 120
    expect(b.freeShippingUnlocked).toBe(true);
    expect(b.shipping).toBe(0);
    expect(b.amountToFreeShipping).toBe(0);
  });
});
