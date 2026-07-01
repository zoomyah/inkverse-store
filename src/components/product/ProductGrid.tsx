import type { Product } from "@/api/types";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  empty?: React.ReactNode;
}

export function ProductGrid({ products, loading, empty }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-ink-surface border-2 border-black shadow-manga">
            <Skeleton className="aspect-[4/3] w-full" rounded="none" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="manga-panel p-12 text-center">
        {empty ?? (
          <>
            <p className="display-tight text-3xl text-ink-muted">NO RESULTS</p>
            <p className="font-jp text-cyan-neon text-sm mt-2">見つかりません</p>
            <p className="text-ink-muted text-sm mt-3">
              Try adjusting your filters or search terms.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}
