import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Category, SortKey } from "@/api/types";
import { CATEGORY_LABELS } from "@/api/types";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface FilterState {
  category?: Category;
  series?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: SortKey;
}

interface FiltersProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  seriesList: string[];
  resultCount: number;
  loading?: boolean;
  /** Compact mobile drawer mode. */
  asDrawer?: boolean;
  onClose?: () => void;
}

const categories = Object.keys(CATEGORY_LABELS) as Category[];

const sortLabels: Record<SortKey, string> = {
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
};

export function Filters({
  value,
  onChange,
  seriesList,
  resultCount,
  loading,
  asDrawer,
  onClose,
}: FiltersProps) {
  const set = (patch: Partial<FilterState>) => onChange({ ...value, ...patch });

  return (
    <aside
      className={cn(
        "manga-panel p-5 space-y-6",
        asDrawer && "shadow-manga-neon"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-blood-neon" />
          <h3 className="katakana-eyebrow text-[11px] text-ink-muted">Filters</h3>
        </div>
        {asDrawer && (
          <button onClick={onClose} className="text-ink-muted hover:text-blood-neon">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
        <input
          value={value.search ?? ""}
          onChange={(e) => set({ search: e.target.value })}
          placeholder="Search…"
          className="w-full bg-ink-deep border-2 border-black text-ink-text placeholder:text-ink-muted/60 pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-blood-neon"
        />
      </div>

      {/* Categories */}
      <div>
        <p className="katakana-eyebrow text-[10px] text-ink-muted mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => set({ category: undefined })}
            className={cn(
              "px-3 py-1.5 text-xs uppercase tracking-wider border-2 border-black transition-colors",
              !value.category
                ? "bg-blood-neon text-white"
                : "bg-ink-deep text-ink-muted hover:text-ink-text"
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => set({ category: c })}
              className={cn(
                "px-3 py-1.5 text-xs uppercase tracking-wider border-2 border-black transition-colors",
                value.category === c
                  ? "bg-blood-neon text-white"
                  : "bg-ink-deep text-ink-muted hover:text-ink-text"
              )}
            >
              {CATEGORY_LABELS[c].name}
            </button>
          ))}
        </div>
      </div>

      {/* Series */}
      {seriesList.length > 0 && (
        <div>
          <p className="katakana-eyebrow text-[10px] text-ink-muted mb-2">Series</p>
          <div className="flex flex-wrap gap-2">
            {seriesList.map((s) => (
              <button
                key={s}
                onClick={() => set({ series: value.series === s ? undefined : s })}
                className={cn(
                  "px-3 py-1.5 text-xs border-2 border-black transition-colors",
                  value.series === s
                    ? "bg-cyan-neon text-black"
                    : "bg-ink-deep text-ink-muted hover:text-ink-text"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      <div>
        <p className="katakana-eyebrow text-[10px] text-ink-muted mb-2">Price (USD)</p>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            min={0}
            placeholder="Min"
            value={value.minPrice ?? ""}
            onChange={(e) => set({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
          />
          <Input
            type="number"
            min={0}
            placeholder="Max"
            value={value.maxPrice ?? ""}
            onChange={(e) => set({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
          />
        </div>
      </div>

      {/* Sort */}
      <Select
        label="Sort"
        value={value.sort ?? "newest"}
        onChange={(e) => set({ sort: e.target.value as SortKey })}
      >
        {(Object.keys(sortLabels) as SortKey[]).map((k) => (
          <option key={k} value={k} className="bg-ink-deep">
            {sortLabels[k]}
          </option>
        ))}
      </Select>

      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs text-ink-muted font-mono">
          {loading ? "…" : `${resultCount} items`}
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onChange({})}
        >
          Reset
        </Button>
      </div>
    </aside>
  );
}
