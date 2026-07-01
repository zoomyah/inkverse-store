import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, Coupon } from "@/api/types";
import { findCoupon } from "@/utils/pricing";

interface CartState {
  items: CartLine[];
  couponCode: string | null;
  lastAddedId: string | null; // for cart badge burst animation
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clear: () => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  getCoupon: () => Coupon | undefined;
  clearLastAdded: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      lastAddedId: null,

      add: (productId, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.productId === productId);
        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
            ),
            lastAddedId: productId,
          });
        } else {
          set({ items: [...items, { productId, quantity }], lastAddedId: productId });
        }
      },

      remove: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),

      updateQty: (productId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.productId !== productId) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      },

      clear: () => set({ items: [], couponCode: null }),

      applyCoupon: (code) => {
        const coupon = findCoupon(code);
        if (!coupon) {
          return { ok: false, message: "Invalid coupon code — try OTAKU10 or INKVERSE20." };
        }
        set({ couponCode: coupon.code });
        return { ok: true, message: `Coupon ${coupon.code} applied — ${coupon.percentOff}% off!` };
      },

      removeCoupon: () => set({ couponCode: null }),
      getCoupon: () => findCoupon(get().couponCode),
      clearLastAdded: () => set({ lastAddedId: null }),
    }),
    {
      name: "inkverse-cart",
      partialize: (s) => ({ items: s.items, couponCode: s.couponCode }),
    }
  )
);

/** Total item count (sum of quantities). */
export const cartCount = (items: CartLine[]) =>
  items.reduce((n, i) => n + i.quantity, 0);
