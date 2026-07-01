import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/api/client";
import type { Category, SortKey } from "@/api/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Filters, type FilterState } from "@/components/product/Filters";
import { Button } from "@/components/ui/Button";
import { SceneBackground } from "@/components/three/SceneBackground";
import { CursedAura } from "@/components/three/CursedAura";
import { BloodDrops } from "@/components/three/BloodDrops";

const PAGE_SIZE = 9;

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [seriesList, setSeriesList] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filters: FilterState = useMemo(
    () => ({
      category: (params.get("category") as Category) || undefined,
      series: params.get("series") || undefined,
      minPrice: params.get("minPrice") ? Number(params.get("minPrice")) : undefined,
      maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : undefined,
      search: params.get("search") || undefined,
      sort: (params.get("sort") as SortKey) || "newest",
    }),
    [params]
  );

  const page = Number(params.get("page") || "1");

  const { data, loading } = useShop(filters, page);

  useEffect(() => {
    api.listAllSeries().then(setSeriesList);
  }, []);

  const onChange = (next: FilterState) => {
    const p: Record<string, string> = {};
    if (next.category) p.category = next.category;
    if (next.series) p.series = next.series;
    if (next.minPrice) p.minPrice = String(next.minPrice);
    if (next.maxPrice) p.maxPrice = String(next.maxPrice);
    if (next.search) p.search = next.search;
    if (next.sort) p.sort = next.sort;
    setParams(p, { replace: true });
  };

  const setPage = (n: number) => {
    const p = Object.fromEntries(params.entries());
    if (n > 1) p.page = String(n);
    else delete p.page;
    setParams(p, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1;

  return (
    <Container className="py-10 sm:py-14">
      <SceneBackground fixed tone="mixed" intensity={0.4} overlay={false}>
        <CursedAura count={22} scale={6} />
        <BloodDrops count={6} area={7} />
      </SceneBackground>
      <SectionHeading
        eyebrow="Catalog"
        jp="ショップ"
        title="The shop floor"
        subtitle="Filter by category, series or price — every item ships from the INKVERSE vault."
        className="mb-8"
      />

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Desktop sidebar */}
        <div className="hidden lg:block sticky top-20 self-start">
          <Filters
            value={filters}
            onChange={onChange}
            seriesList={seriesList}
            resultCount={data?.total ?? 0}
            loading={loading}
          />
        </div>

        {/* Main */}
        <div>
          <div className="flex items-center justify-between mb-5 lg:hidden">
            <Button
              variant="secondary"
              clip={false}
              size="sm"
              onClick={() => setDrawerOpen(true)}
            >
              <SlidersHorizontal size={15} /> Filters
            </Button>
            <span className="text-xs text-ink-muted font-mono">
              {loading ? "…" : `${data?.total ?? 0} items`}
            </span>
          </div>

          <ProductGrid
            products={data?.items ?? []}
            loading={loading}
            empty={
              <>
                <p className="display-tight text-3xl text-ink-muted">NOTHING HERE</p>
                <p className="font-jp text-cyan-neon text-sm mt-2">見つかりません</p>
                <p className="text-ink-muted text-sm mt-3">
                  No products match these filters. Try widening your search.
                </p>
              </>
            }
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button
                variant="ghost"
                clip={false}
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
              >
                <ChevronLeft size={16} />
              </Button>
              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const n = i + 1;
                  return (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={
                        "w-9 h-9 font-display text-sm border-2 border-black transition-colors " +
                        (n === page
                          ? "bg-blood-neon text-white shadow-neon-blood"
                          : "bg-ink-deep text-ink-muted hover:text-ink-text")
                      }
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
              <Button
                variant="ghost"
                clip={false}
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div
            className="absolute inset-0 bg-ink-deep/80 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-ink-base p-4 overflow-y-auto">
            <Filters
              value={filters}
              onChange={(n) => {
                onChange(n);
                setDrawerOpen(false);
              }}
              seriesList={seriesList}
              resultCount={data?.total ?? 0}
              loading={loading}
              asDrawer
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      )}
    </Container>
  );
}

// Local hook to keep the page tidy
function useShop(filters: FilterState, page: number) {
  const [data, setData] = useState<{
    items: import("@/api/types").Product[];
    total: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const key = JSON.stringify({ ...filters, page });

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .listProducts({ ...filters, page, pageSize: PAGE_SIZE })
      .then((res) => {
        if (active) setData({ items: res.items, total: res.total });
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { data, loading };
}
