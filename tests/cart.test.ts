import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore, cartCount } from "@/store/cartStore";

function reset() {
  useCartStore.setState({ items: [], couponCode: null, lastAddedId: null });
}

describe("cart store", () => {
  beforeEach(reset);

  it("starts empty", () => {
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().couponCode).toBeNull();
  });

  it("adds a new product", () => {
    useCartStore.getState().add("p01", 1);
    expect(useCartStore.getState().items).toEqual([{ productId: "p01", quantity: 1 }]);
    expect(useCartStore.getState().lastAddedId).toBe("p01");
  });

  it("increments quantity when adding an existing product", () => {
    useCartStore.getState().add("p01", 1);
    useCartStore.getState().add("p01", 2);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
  });

  it("updates quantity", () => {
    useCartStore.getState().add("p01", 1);
    useCartStore.getState().updateQty("p01", 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it("removes the product when qty updated to 0", () => {
    useCartStore.getState().add("p01", 1);
    useCartStore.getState().updateQty("p01", 0);
    expect(useCartStore.getState().items).toEqual([]);
  });

  it("removes a product", () => {
    useCartStore.getState().add("p01", 1);
    useCartStore.getState().add("p02", 1);
    useCartStore.getState().remove("p01");
    expect(useCartStore.getState().items.map((i) => i.productId)).toEqual(["p02"]);
  });

  it("clears the cart", () => {
    useCartStore.getState().add("p01", 2);
    useCartStore.getState().applyCoupon("OTAKU10");
    useCartStore.getState().clear();
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().couponCode).toBeNull();
  });

  it("applies a valid coupon", () => {
    const r = useCartStore.getState().applyCoupon("OTAKU10");
    expect(r.ok).toBe(true);
    expect(useCartStore.getState().couponCode).toBe("OTAKU10");
    expect(useCartStore.getState().getCoupon()?.percentOff).toBe(10);
  });

  it("rejects an invalid coupon", () => {
    const r = useCartStore.getState().applyCoupon("NOPE");
    expect(r.ok).toBe(false);
    expect(useCartStore.getState().couponCode).toBeNull();
  });

  it("applies INKVERSE20 (20% off)", () => {
    const r = useCartStore.getState().applyCoupon("inkverse20");
    expect(r.ok).toBe(true);
    expect(useCartStore.getState().getCoupon()?.percentOff).toBe(20);
  });

  it("removes a coupon", () => {
    useCartStore.getState().applyCoupon("OTAKU10");
    useCartStore.getState().removeCoupon();
    expect(useCartStore.getState().couponCode).toBeNull();
    expect(useCartStore.getState().getCoupon()).toBeUndefined();
  });

  it("cartCount sums quantities", () => {
    useCartStore.getState().add("p01", 2);
    useCartStore.getState().add("p02", 3);
    expect(cartCount(useCartStore.getState().items)).toBe(5);
  });
});
