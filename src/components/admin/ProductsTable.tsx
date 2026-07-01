import { useState } from "react";
import { Edit2, Trash2, Plus, Star } from "lucide-react";
import type { Product, ProductInput, Category } from "@/api/types";
import { CATEGORY_LABELS } from "@/api/types";
import { api } from "@/api/client";
import { formatCurrency, formatDate } from "@/utils/format";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input, Select, Textarea } from "@/components/ui/Input";

interface ProductsTableProps {
  products: Product[];
  onChange: () => void;
}

const empty: ProductInput = {
  slug: "",
  name: "",
  category: "figures",
  series: "",
  price: 0,
  images: [],
  description: "",
  specs: {},
  rating: 5,
  reviewsCount: 0,
  stock: 0,
  featured: false,
  isNew: false,
};

export function ProductsTable({ products, onChange }: ProductsTableProps) {
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<ProductInput>(empty);
  const [busy, setBusy] = useState(false);

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ ...p });
  };
  const openCreate = () => {
    setCreating(true);
    setForm(empty);
  };

  const save = async () => {
    setBusy(true);
    try {
      if (editing) await api.updateProduct(editing.id, form);
      else await api.createProduct(form);
      setEditing(null);
      setCreating(false);
      onChange();
    } finally {
      setBusy(false);
    }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    await api.deleteProduct(id);
    onChange();
  };

  const f = (k: keyof ProductInput, v: unknown) => setForm((s) => ({ ...s, [k]: v }));

  const modalOpen = Boolean(editing) || creating;
  const title = editing ? "Edit Product" : "New Product";

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="display-tight text-2xl uppercase">Products</h3>
          <p className="font-jp text-[10px] text-cyan-neon">商品管理</p>
        </div>
        <Button size="sm" onClick={openCreate}>
          <Plus size={15} /> New
        </Button>
      </div>

      <div className="manga-panel overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ink-deep border-b-2 border-black text-left">
              <th className="p-3 katakana-eyebrow text-[10px] text-ink-muted">Product</th>
              <th className="p-3 katakana-eyebrow text-[10px] text-ink-muted">Category</th>
              <th className="p-3 katakana-eyebrow text-[10px] text-ink-muted">Series</th>
              <th className="p-3 katakana-eyebrow text-[10px] text-ink-muted text-right">Price</th>
              <th className="p-3 katakana-eyebrow text-[10px] text-ink-muted text-right">Stock</th>
              <th className="p-3 katakana-eyebrow text-[10px] text-ink-muted">Created</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 shrink-0 overflow-hidden border border-black bg-ink-deep">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-ink-text truncate max-w-[200px]">{p.name}</p>
                      <p className="flex items-center gap-1 text-[10px] text-manga-gold">
                        <Star size={9} className="fill-manga-gold" /> {p.rating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-ink-muted capitalize">{p.category}</td>
                <td className="p-3 text-cyan-neon">{p.series}</td>
                <td className="p-3 text-right font-mono text-blood-neon">
                  {formatCurrency(p.price)}
                </td>
                <td className="p-3 text-right font-mono text-ink-text">{p.stock}</td>
                <td className="p-3 text-ink-muted font-mono text-xs">{formatDate(p.createdAt)}</td>
                <td className="p-3">
                  <div className="flex gap-1 justify-end">
                    <button
                      onClick={() => openEdit(p)}
                      className="p-1.5 text-ink-muted hover:text-cyan-neon hover:bg-white/5"
                      aria-label="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => del(p.id)}
                      className="p-1.5 text-ink-muted hover:text-blood-neon hover:bg-white/5"
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => { setEditing(null); setCreating(false); }} title={title} size="lg">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Name" value={form.name} onChange={(e) => f("name", e.target.value)} />
            <Input label="Slug" value={form.slug} onChange={(e) => f("slug", e.target.value)} placeholder="auto" />
            <Select
              label="Category"
              value={form.category}
              onChange={(e) => f("category", e.target.value as Category)}
            >
              {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
                <option key={c} value={c} className="bg-ink-deep">
                  {CATEGORY_LABELS[c].name}
                </option>
              ))}
            </Select>
            <Input label="Series" value={form.series} onChange={(e) => f("series", e.target.value)} />
            <Input
              label="Price ($)"
              type="number"
              value={form.price}
              onChange={(e) => f("price", Number(e.target.value))}
            />
            <Input
              label="Compare-at ($)"
              type="number"
              value={form.compareAtPrice ?? ""}
              onChange={(e) => f("compareAtPrice", e.target.value ? Number(e.target.value) : undefined)}
            />
            <Input
              label="Stock"
              type="number"
              value={form.stock}
              onChange={(e) => f("stock", Number(e.target.value))}
            />
            <Input
              label="Image URL"
              value={form.images[0] ?? ""}
              onChange={(e) => f("images", e.target.value ? [e.target.value] : [])}
            />
          </div>
          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) => f("description", e.target.value)}
          />
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-ink-text">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => f("featured", e.target.checked)}
                className="accent-blood-neon w-4 h-4"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-text">
              <input
                type="checkbox"
                checked={form.isNew}
                onChange={(e) => f("isNew", e.target.checked)}
                className="accent-cyan-neon w-4 h-4"
              />
              New arrival
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
            <Button variant="ghost" onClick={() => { setEditing(null); setCreating(false); }}>
              Cancel
            </Button>
            <Button onClick={save} disabled={busy || !form.name}>
              {busy ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
