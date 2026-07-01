import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Step = 0 | 1 | 2;

const steps = [
  { label: "Shipping", jp: "発送" },
  { label: "Payment", jp: "支払い" },
  { label: "Review", jp: "確認" },
];

export function Steps({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-between manga-panel p-4 mb-6">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={s.label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 border-2 border-black font-display text-sm transition-colors",
                  done && "bg-cyan-neon text-black",
                  active && "bg-sakura-neon text-white shadow-neon-pink",
                  !done && !active && "bg-ink-deep text-ink-muted"
                )}
              >
                {done ? <Check size={16} /> : i + 1}
              </div>
              <div className="hidden sm:block">
                <p
                  className={cn(
                    "text-xs uppercase tracking-widest",
                    active ? "text-sakura-neon" : done ? "text-cyan-neon" : "text-ink-muted"
                  )}
                >
                  {s.label}
                </p>
                <p className="font-jp text-[10px] text-ink-muted">{s.jp}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-3 transition-colors",
                  i < current ? "bg-cyan-neon" : "bg-white/10"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
