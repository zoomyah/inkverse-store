import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Truck, Home, ArrowRight } from "lucide-react";
import { api } from "@/api/client";
import type { Order, OrderStatus } from "@/api/types";
import { formatCurrency, formatDateTime } from "@/utils/format";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SceneBackground } from "@/components/three/SceneBackground";
import { FloatingShuriken } from "@/components/three/FloatingShuriken";
import { CursedAura } from "@/components/three/CursedAura";

const statusTone: Record<OrderStatus, "neon" | "cyan" | "gold" | "muted"> = {
  pending: "gold",
  paid: "cyan",
  shipped: "cyan",
  delivered: "muted",
};

export default function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .listOrders()
      .then((list) => {
        const found = list.find((o) => o.id === id);
        setOrder(found || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="py-20">
        <div className="screentone-skeleton h-64 manga-panel" />
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-20 text-center">
        <p className="display-tight text-3xl">Order not found</p>
        <Link to="/shop" className="inline-block mt-6">
          <Button>Back to shop</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-14 max-w-3xl">
      <SceneBackground fixed tone="mixed" intensity={0.4} overlay={false}>
        <FloatingShuriken position={[3, 1.5, 0]} scale={0.5} />
        <CursedAura count={20} scale={6} />
      </SceneBackground>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
          className="inline-flex p-3 manga-panel manga-panel-neon mb-4"
        >
          <CheckCircle2 size={36} className="text-blood-neon" />
        </motion.div>
        <p className="font-jp text-cyan-neon text-xs neon-text-cyan">ご注文ありがとう</p>
        <h1 className="display-tight text-4xl sm:text-5xl uppercase mt-2">Order confirmed</h1>
        <p className="text-ink-muted mt-2">
          Thanks, {order.customer.name.split(" ")[0]}! Your order is in the vault.
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="font-mono text-blood-neon">{order.id}</span>
          <Badge tone={statusTone[order.status]}>{order.status}</Badge>
        </div>
      </motion.div>

      {/* Status tracker */}
      <div className="manga-panel p-6 mb-6">
        <div className="flex items-center justify-between">
          {[
            { icon: CheckCircle2, label: "Paid", done: true },
            { icon: Package, label: "Packed", done: ["shipped", "delivered"].includes(order.status) },
            { icon: Truck, label: "Shipped", done: ["shipped", "delivered"].includes(order.status) },
            { icon: Home, label: "Delivered", done: order.status === "delivered" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={
                    "w-10 h-10 flex items-center justify-center border-2 border-black " +
                    (s.done ? "bg-cyan-neon text-black" : "bg-ink-deep text-ink-muted")
                  }
                >
                  <s.icon size={18} />
                </div>
                <span
                  className={
                    "text-[10px] uppercase tracking-widest " +
                    (s.done ? "text-cyan-neon" : "text-ink-muted")
                  }
                >
                  {s.label}
                </span>
              </div>
              {i < 3 && (
                <div
                  className={
                    "flex-1 h-0.5 mx-2 " + (s.done ? "bg-cyan-neon" : "bg-white/10")
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="manga-panel p-6 mb-6">
        <h2 className="display-tight text-xl uppercase mb-4">Items</h2>
        <ul className="space-y-3">
          {order.items.map((it) => (
            <li key={it.product.id} className="flex items-center gap-3">
              <div className="w-14 h-14 shrink-0 overflow-hidden border-2 border-black bg-ink-deep">
                <img src={it.product.images[0]} alt={it.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink-text truncate">{it.product.name}</p>
                <p className="text-xs text-ink-muted font-mono">×{it.quantity}</p>
              </div>
              <span className="font-mono text-sm text-ink-text">
                {formatCurrency(it.product.price * it.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-baseline justify-between border-t-2 border-black pt-4 mt-4">
          <span className="katakana-eyebrow text-[11px] text-ink-muted">Total paid</span>
          <span className="font-display text-2xl text-blood-neon neon-text-blood">
            {formatCurrency(order.total)}
          </span>
        </div>
      </div>

      {/* Shipping info */}
      <div className="manga-panel p-6 mb-8">
        <h2 className="display-tight text-xl uppercase mb-3">Shipping to</h2>
        <p className="text-sm text-ink-text">{order.customer.name}</p>
        <p className="text-sm text-ink-muted">{order.customer.email}</p>
        <p className="text-sm text-ink-muted">{order.customer.address}</p>
        <p className="text-xs text-ink-muted font-mono mt-3">Placed {formatDateTime(order.createdAt)}</p>
      </div>

      <div className="flex justify-center gap-3">
        <Link to="/shop">
          <Button>Keep shopping <ArrowRight size={16} /></Button>
        </Link>
        <Link to="/account">
          <Button variant="secondary" clip={false}>View orders</Button>
        </Link>
      </div>
    </Container>
  );
}
