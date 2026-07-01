import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import type { Product } from "@/api/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductsTable } from "@/components/admin/ProductsTable";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const page = await api.listProducts({ pageSize: 100 });
    setProducts(page.items);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container className="py-10 sm:py-14">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="katakana-eyebrow text-[11px] text-cyan-neon">Admin · 管理者</p>
          <h1 className="display-tight text-4xl uppercase mt-1">Manage products</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/admin">
            <Button variant="secondary" clip={false}>Dashboard</Button>
          </Link>
          <Link to="/admin/orders">
            <Button variant="secondary" clip={false}>Orders</Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="screentone-skeleton h-96 manga-panel" />
      ) : (
        <ProductsTable products={products} onChange={load} />
      )}
    </Container>
  );
}
