import { useEffect, useState, useCallback } from "react";
import { api } from "@/api/client";
import type { Product, ProductFilters, ProductPage } from "@/api/types";

export function useProducts(filters: ProductFilters) {
  const [data, setData] = useState<ProductPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const key = JSON.stringify(filters);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    api
      .listProducts(filters)
      .then((res) => {
        if (active) setData(res);
      })
      .catch((e) => {
        if (active) setError(e instanceof Error ? e.message : "Failed to load products");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { data, loading, error };
}

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    setError(null);
    api
      .getProduct(slug)
      .then((p) => {
        if (active) setProduct(p);
      })
      .catch((e) => {
        if (active) setError(e instanceof Error ? e.message : "Product not found");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  return { product, loading, error };
}

export function useFeaturedProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const page = await api.listProducts({ pageSize: 100 });
    setItems(page.items.filter((p) => p.featured));
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading };
}
