import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { api } from "@/api/client";
import type { Product } from "@/api/types";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ShippingForm, type ShippingData } from "@/components/checkout/ShippingForm";
import { PaymentElement } from "@/components/checkout/PaymentElement";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Steps, type Step } from "@/components/checkout/Steps";
import { hasStripe } from "@/utils/stripe";
import { SceneBackground } from "@/components/three/SceneBackground";
import { CursedAura } from "@/components/three/CursedAura";

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const coupon = useCartStore((s) => s.getCoupon());
  const clear = useCartStore((s) => s.clear);
  const user = useAuthStore((s) => s.user);
  const [products, setProducts] = useState<Product[]>([]);
  const [step, setStep] = useState<Step>(0);
  const [shipping, setShipping] = useState<ShippingData>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    address: "",
    city: "",
    zip: "",
    country: "Japan",
  });
  const [paymentOk, setPaymentOk] = useState(false);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    api.listProducts({ pageSize: 100 }).then((p) => {
      const ids = new Set(items.map((i) => i.productId));
      setProducts(p.items.filter((x) => ids.has(x.id)));
    });
  }, [items]);

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <div className="max-w-md mx-auto manga-panel p-10">
          <p className="display-tight text-3xl uppercase">Nothing to check out</p>
          <p className="text-ink-muted mt-3 text-sm">Your cart is empty.</p>
          <Link to="/shop" className="inline-block mt-6">
            <Button>Go to shop</Button>
          </Link>
        </div>
      </Container>
    );
  }

  const shippingValid =
    shipping.name && shipping.email && shipping.address && shipping.city && shipping.zip;

  const next = () => setStep((s) => Math.min(2, s + 1) as Step);
  const back = () => setStep((s) => Math.max(0, s - 1) as Step);

  const placeOrder = async () => {
    setPlacing(true);
    try {
      // Create checkout session (mock or real Stripe)
      await api.createCheckoutSession({
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        couponCode: coupon?.code,
      });

      // Build order from cart
      const orderItems = items.map((line) => {
        const p = products.find((x) => x.id === line.productId)!;
        return { product: p, quantity: line.quantity };
      });

      // Compute total via pricing
      const { breakdown } = await import("@/utils/pricing");
      const b = breakdown(items, products, coupon);

      const order = await api.createOrder({
        items: orderItems,
        total: b.total,
        status: "paid",
        customer: {
          name: shipping.name,
          email: shipping.email,
          address: `${shipping.address}, ${shipping.city} ${shipping.zip}, ${shipping.country}`,
        },
      });

      clear();
      navigate(`/order/${order.id}`);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <Container className="py-10 sm:py-14 max-w-6xl">
      <SceneBackground fixed tone="blood" intensity={0.4} overlay={false}>
        <CursedAura count={24} scale={6} />
      </SceneBackground>
      <div className="mb-8">
        <h1 className="display-tight text-4xl sm:text-5xl uppercase">Checkout</h1>
        <p className="font-jp text-cyan-neon text-xs mt-1 neon-text-cyan">決済</p>
      </div>

      <Steps current={step} />

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="manga-panel p-6"
              >
                <h2 className="display-tight text-2xl uppercase mb-4">Shipping details</h2>
                <ShippingForm value={shipping} onChange={setShipping} />
                <div className="flex justify-end mt-6">
                  <Button onClick={next} disabled={!shippingValid}>
                    Continue to payment <ArrowRight size={16} />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="manga-panel p-6"
              >
                <h2 className="display-tight text-2xl uppercase mb-4">Payment</h2>
                <PaymentElement onReady={setPaymentOk} />
                <div className="flex justify-between mt-6">
                  <Button variant="ghost" clip={false} onClick={back}>
                    <ArrowLeft size={16} /> Back
                  </Button>
                  <Button onClick={next} disabled={!paymentOk && !hasStripe}>
                    Review order <ArrowRight size={16} />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="manga-panel p-6"
              >
                <h2 className="display-tight text-2xl uppercase mb-4">Review &amp; confirm</h2>
                <div className="space-y-4">
                  <div>
                    <p className="katakana-eyebrow text-[10px] text-ink-muted mb-1">Ship to</p>
                    <p className="text-sm text-ink-text">
                      {shipping.name} · {shipping.email}
                    </p>
                    <p className="text-sm text-ink-muted">
                      {shipping.address}, {shipping.city} {shipping.zip}, {shipping.country}
                    </p>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div>
                    <p className="katakana-eyebrow text-[10px] text-ink-muted mb-1">Payment</p>
                    <p className="text-sm text-ink-text">
                      {hasStripe ? "Stripe (live)" : "Mock card · ends 4242"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="ghost" clip={false} onClick={back}>
                    <ArrowLeft size={16} /> Back
                  </Button>
                  <Button variant="gold" onClick={placeOrder} disabled={placing}>
                    {placing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Placing…
                      </>
                    ) : (
                      <>
                        <Check size={18} /> Place order
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:sticky lg:top-20 self-start">
          <OrderSummary items={items} products={products} coupon={coupon} />
        </div>
      </div>
    </Container>
  );
}
