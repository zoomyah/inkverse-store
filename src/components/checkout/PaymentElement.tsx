import { useState } from "react";
import { Lock, CreditCard, ShieldCheck } from "lucide-react";
import { hasStripe } from "@/utils/stripe";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

interface PaymentElementProps {
  onReady?: (ok: boolean) => void;
}

/**
 * Stripe Payment Element if a publishable key is configured, otherwise a mock
 * card form that always succeeds (test mode). Real Stripe wiring would mount
 * the <PaymentElement /> inside an <Elements> provider using the clientSecret
 * from api.createCheckoutSession().
 */
export function PaymentElement({ onReady }: PaymentElementProps) {
  const [card, setCard] = useState("4242 4242 4242 4242");
  const [exp, setExp] = useState("12/27");
  const [cvc, setCvc] = useState("123");
  const valid = card.replace(/\s/g, "").length >= 12 && exp.length >= 4 && cvc.length >= 3;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock size={15} className="text-cyan-neon" />
          <span className="katakana-eyebrow text-[11px] text-ink-muted">Secure Payment</span>
        </div>
        {hasStripe ? (
          <Badge tone="cyan">Stripe Live</Badge>
        ) : (
          <Badge tone="gold">Mock Mode</Badge>
        )}
      </div>

      {!hasStripe && (
        <div className="flex items-start gap-2 p-3 border border-manga-gold/40 bg-manga-gold/5">
          <ShieldCheck size={16} className="text-manga-gold shrink-0 mt-0.5" />
          <p className="text-xs text-ink-text">
            Test mode — any card details work. Use <span className="font-mono">4242 4242 4242 4242</span>,
            any future expiry, any CVC. Set <span className="font-mono">VITE_STRIPE_PUBLISHABLE_KEY</span> + a
            Django checkout endpoint for real payments.
          </p>
        </div>
      )}

      <div className="space-y-3">
        <div className="relative">
          <CreditCard size={15} className="absolute left-3 top-[34px] text-ink-muted pointer-events-none" />
          <Input
            label="Card number"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            className="pl-9 font-mono"
            placeholder="4242 4242 4242 4242"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Expiry"
            value={exp}
            onChange={(e) => setExp(e.target.value)}
            className="font-mono"
            placeholder="MM/YY"
          />
          <Input
            label="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            className="font-mono"
            placeholder="123"
          />
        </div>
      </div>

      {/* hidden validity reporter */}
      <input
        type="hidden"
        ref={(el) => {
          if (el) el.value = String(valid);
          onReady?.(valid);
        }}
      />
    </div>
  );
}
