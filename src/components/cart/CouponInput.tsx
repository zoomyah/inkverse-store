import { useState } from "react";
import { Tag, Check, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Input } from "@/components/ui/Input";

export function CouponInput() {
  const couponCode = useCartStore((s) => s.couponCode);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; message: string } | null>(null);

  const onApply = (e: React.FormEvent) => {
    e.preventDefault();
    const r = applyCoupon(code);
    setMsg(r);
    if (r.ok) setCode("");
  };

  if (couponCode) {
    return (
      <div className="flex items-center justify-between gap-3 p-3 border-2 border-cyan-neon bg-cyan-neon/5 shadow-manga-cyan">
        <div className="flex items-center gap-2 text-cyan-neon">
          <Check size={16} />
          <span className="font-mono text-sm uppercase tracking-wider">{couponCode}</span>
          <span className="text-xs text-ink-muted">applied</span>
        </div>
        <button
          onClick={() => {
            removeCoupon();
            setMsg(null);
          }}
          className="text-ink-muted hover:text-sakura-neon"
          aria-label="Remove coupon"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onApply} className="space-y-2">
      <div className="relative">
        <Tag size={15} className="absolute left-3 top-[34px] text-ink-muted pointer-events-none" />
        <Input
          label="Coupon code"
          placeholder="OTAKU10 / INKVERSE20"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="pl-9"
        />
      </div>
      {msg && !msg.ok && <p className="text-xs text-sakura-neon">{msg.message}</p>}
      {msg && msg.ok && <p className="text-xs text-cyan-neon">{msg.message}</p>}
      <button
        type="submit"
        className="w-full py-2.5 text-xs uppercase tracking-widest border-2 border-black bg-ink-raised text-ink-text hover:border-sakura-neon hover:text-sakura-neon transition-colors"
      >
        Apply coupon
      </button>
    </form>
  );
}
