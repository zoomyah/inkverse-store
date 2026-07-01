import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { Order, OrderStatus } from "@/api/types";
import { formatCurrency, formatDateTime } from "@/utils/format";
import { cn } from "@/lib/utils";

const statuses: OrderStatus[] = ["pending", "paid", "shipped", "delivered"];

const statusTone: Record<OrderStatus, string> = {
  pending: "text-manga-gold border-manga-gold/40 bg-manga-gold/10",
  paid: "text-cyan-neon border-cyan-neon/40 bg-cyan-neon/10",
  shipped: "text-cyan-neon border-cyan-neon/40 bg-cyan-neon/5",
  delivered: "text-ink-text border-white/20 bg-white/5",
};

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await api.listOrders();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: OrderStatus) => {
    const updated = await api.updateOrderStatus(id, status);
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="display-tight text-2xl uppercase">Orders</h3>
        <p className="font-jp text-[10px] text-cyan-neon">注文管理</p>
      </div>

      <div className="manga-panel overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ink-deep border-b-2 border-black text-left">
              <th className="p-3 katakana-eyebrow text-[10px] text-ink-muted">Order</th>
              <th className="p-3 katakana-eyebrow text-[10px] text-ink-muted">Customer</th>
              <th className="p-3 katakana-eyebrow text-[10px] text-ink-muted">Items</th>
              <th className="p-3 katakana-eyebrow text-[10px] text-ink-muted text-right">Total</th>
              <th className="p-3 katakana-eyebrow text-[10px] text-ink-muted">Date</th>
              <th className="p-3 katakana-eyebrow text-[10px] text-ink-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-ink-muted">
                  Loading orders…
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-ink-muted">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-3 font-mono text-blood-neon">{o.id}</td>
                  <td className="p-3">
                    <p className="text-ink-text">{o.customer.name}</p>
                    <p className="text-xs text-ink-muted">{o.customer.email}</p>
                  </td>
                  <td className="p-3 text-ink-muted font-mono">
                    {o.items.reduce((n, i) => n + i.quantity, 0)}
                  </td>
                  <td className="p-3 text-right font-mono text-ink-text">{formatCurrency(o.total)}</td>
                  <td className="p-3 text-ink-muted font-mono text-xs">
                    {formatDateTime(o.createdAt)}
                  </td>
                  <td className="p-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                      className={cn(
                        "px-2 py-1 text-xs uppercase tracking-wider border-2 bg-ink-deep cursor-pointer",
                        statusTone[o.status]
                      )}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s} className="bg-ink-deep">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
