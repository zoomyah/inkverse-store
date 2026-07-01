import { loadStripe, type Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

const KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;

/** True when a Stripe publishable key is configured. */
export const hasStripe = Boolean(KEY);

/**
 * Initialize Stripe with the publishable key if present, else return null
 * (checkout falls back to a mock card form).
 */
export function getStripe(): Promise<Stripe | null> {
  if (!KEY) return Promise.resolve(null);
  if (!stripePromise) {
    stripePromise = loadStripe(KEY);
  }
  return stripePromise;
}
