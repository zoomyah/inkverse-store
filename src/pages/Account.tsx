import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, LogOut, Shield } from "lucide-react";
import { api } from "@/api/client";
import type { Order } from "@/api/types";
import { useAuthStore } from "@/store/authStore";
import { formatCurrency, formatDate } from "@/utils/format";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const statusTone = {
  pending: "gold",
  paid: "cyan",
  shipped: "cyan",
  delivered: "muted",
} as const;

export default function Account() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listOrders().then((o) => {
      // Filter to this user's orders (mock: match email or show all for demo)
      setOrders(o);
      setLoading(false);
    });
  }, []);

  if (!user) {
    return (
      <Container className="py-20 text-center max-w-md">
        <div className="manga-panel p-10">
          <Package size={40} className="mx-auto text-ink-muted mb-4" />
          <p className="display-tight text-3xl uppercase">Not signed in</p>
          <p className="font-jp text-cyan-neon text-sm mt-2">サインインしてください</p>
          <p className="text-ink-muted mt-3 text-sm">Sign in to view your order history.</p>
          <Link to="/login" className="inline-block mt-6">
            <Button>Sign in</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-14">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="katakana-eyebrow text-[11px] text-sakura-neon">Account</p>
          <h1 className="display-tight text-4xl uppercase mt-1">Welcome, {user.name}</h1>
          <p className="text-ink-muted text-sm mt-1">{user.email}</p>
        </div>
        <div className="flex gap-2">
          {user.role === "admin" && (
            <Link to="/admin">
              <Button variant="secondary" clip={false}>
                <Shield size={15} /> Admin
              </Button>
            </Link>
          )}
          <Button variant="ghost" clip={false} onClick={logout}>
            <LogOut size={15} /> Log out
          </Button>
        </div>
      </div>

      <h2 className="display-tight text-2xl uppercase mb-4">Order history</h2>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="screentone-skeleton h-24 manga-panel" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="manga-panel p-10 text-center">
          <p className="text-ink-muted">No orders yet.</p>
          <Link to="/shop" className="inline-block mt-4">
            <Button>Start shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <Link
              key={o.id}
              to={`/order/${o.id}`}
              className="block manga-panel p-4 hover:border-sakura-neon hover:shadow-manga-neon transition-all"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {o.items.slice(0, 3).map((it) => (
                      <div
                        key={it.product.id}
                        className="w-10 h-10 shrink-0 overflow-hidden border-2 border-black bg-ink-deep"
                      >
                        <img src={it.product.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-mono text-sm text-sakura-neon">{o.id}</p>
                    <p className="text-xs text-ink-muted">{formatDate(o.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge tone={statusTone[o.status]}>{o.status}</Badge>
                  <span className="font-mono text-ink-text">{formatCurrency(o.total)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
