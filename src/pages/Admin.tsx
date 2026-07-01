import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DollarSign, Package, ShoppingCart, Star } from "lucide-react";
import { api } from "@/api/client";
import type { Order, Product } from "@/api/types";
import { formatCurrency } from "@/utils/format";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/admin/StatCard";
import { SalesChart, type SalesPoint } from "@/components/admin/SalesChart";
import { Button } from "@/components/ui/Button";
import { SceneBackground } from "@/components/three/SceneBackground";
import { FloatingShuriken } from "@/components/three/FloatingShuriken";

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.listOrders().then(setOrders);
    api.listProducts({ pageSize: 100 }).then((p) => setProducts(p.items));
  }, []);

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const unitsSold = orders.reduce(
    (s, o) => s + o.items.reduce((n, i) => n + i.quantity, 0),
    0
  );
  const avgRating =
    products.length > 0
      ? products.reduce((s, p) => s + p.rating, 0) / products.length
      : 0;

  // Build a sales chart from orders grouped by day
  const chartData: SalesPoint[] = useMemo(() => {
    const byDay = new Map<string, { sales: number; orders: number }>();
    orders.forEach((o) => {
      const day = new Date(o.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const cur = byDay.get(day) ?? { sales: 0, orders: 0 };
      cur.sales += o.total;
      cur.orders += 1;
      byDay.set(day, cur);
    });
    return Array.from(byDay.entries())
      .map(([label, v]) => ({ label, ...v }))
      .slice(-7);
  }, [orders]);

  return (
    <Container className="py-10 sm:py-14">
      <SceneBackground fixed tone="mixed" intensity={0.35} overlay={false}>
        <FloatingShuriken position={[3, 1.5, 0]} scale={0.6} />
        <FloatingShuriken position={[-3, -1.5, 0]} scale={0.5} spin={0.9} />
      </SceneBackground>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="katakana-eyebrow text-[11px] text-cyan-neon">Admin · 管理者</p>
          <h1 className="display-tight text-4xl uppercase mt-1">Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/products">
            <Button variant="secondary" clip={false}>Products</Button>
          </Link>
          <Link to="/admin/orders">
            <Button variant="secondary" clip={false}>Orders</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Revenue"
          jp="収入"
          value={formatCurrency(revenue)}
          delta={12}
          tone="neon"
          icon={<DollarSign size={18} />}
        />
        <StatCard
          label="Orders"
          jp="注文"
          value={orders.length}
          delta={8}
          tone="cyan"
          icon={<ShoppingCart size={18} />}
        />
        <StatCard
          label="Units sold"
          jp="販売数"
          value={unitsSold}
          delta={5}
          tone="gold"
          icon={<Package size={18} />}
        />
        <StatCard
          label="Avg rating"
          jp="評価"
          value={avgRating.toFixed(2)}
          delta={2}
          tone="neon"
          icon={<Star size={18} />}
        />
      </div>

      <SalesChart data={chartData} />

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Recent orders */}
        <div className="manga-panel p-5">
          <h3 className="display-tight text-xl uppercase mb-3">Recent orders</h3>
          <ul className="space-y-2">
            {orders.slice(0, 5).map((o) => (
              <li key={o.id} className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                <div>
                  <p className="font-mono text-blood-neon">{o.id}</p>
                  <p className="text-xs text-ink-muted">{o.customer.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-ink-text">{formatCurrency(o.total)}</p>
                  <p className="text-[10px] text-ink-muted uppercase">{o.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Low stock */}
        <div className="manga-panel p-5">
          <h3 className="display-tight text-xl uppercase mb-3">Low stock alert</h3>
          <ul className="space-y-2">
            {products
              .filter((p) => p.stock <= 20)
              .slice(0, 5)
              .map((p) => (
                <li key={p.id} className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                  <span className="text-ink-text truncate">{p.name}</span>
                  <span className={"font-mono " + (p.stock <= 10 ? "text-blood-neon" : "text-manga-gold")}>
                    {p.stock} left
                  </span>
                </li>
              ))}
            {products.filter((p) => p.stock <= 20).length === 0 && (
              <li className="text-ink-muted text-sm py-2">All products well-stocked.</li>
            )}
          </ul>
        </div>
      </div>
    </Container>
  );
}
