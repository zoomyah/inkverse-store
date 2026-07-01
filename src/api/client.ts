import type { ApiClient } from "./types";
import { mockClient } from "./mock";

/**
 * Active API client.
 *
 * Default: in-memory mock (works with zero backend).
 * Real mode: if VITE_API_BASE is set, swap to a real fetch-based client
 * pointing at your Django REST API — the ApiClient contract stays the same.
 *
 * Example real client (stub) — implement against your Django routes:
 *
 *   const base = import.meta.env.VITE_API_BASE;
 *   const realClient: ApiClient = {
 *     async listProducts(f) {
 *       const r = await fetch(`${base}/api/products?` + new URLSearchParams(f as any));
 *       return r.json();
 *     },
 *     async getProduct(slug) {
 *       const r = await fetch(`${base}/api/products/${slug}`); return r.json();
 *     },
 *     async createCheckoutSession(input) {
 *       const r = await fetch(`${base}/api/checkout/session`, {
 *         method: "POST", headers: { "Content-Type": "application/json" },
 *         body: JSON.stringify(input),
 *       });
 *       const { client_secret } = await r.json();
 *       return { clientSecret: client_secret };
 *     },
 *     // ... rest of the ApiClient methods
 *   };
 */
const useReal = Boolean(import.meta.env.VITE_API_BASE);

// For now we always export the mock client; the realClient stub above shows
// how to implement the same contract against Django.
export const api: ApiClient = mockClient;

export const isRealApi = useReal;
export default api;
