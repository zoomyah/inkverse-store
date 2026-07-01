import type { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  jp?: string;
  value: ReactNode;
  delta?: number;
  icon?: ReactNode;
  tone?: "neon" | "cyan" | "gold";
}

const toneRing = {
  neon: "border-blood-neon/40 text-blood-neon",
  cyan: "border-cyan-neon/40 text-cyan-neon",
  gold: "border-manga-gold/40 text-manga-gold",
};

export function StatCard({ label, jp, value, delta, icon, tone = "neon" }: StatCardProps) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="manga-panel p-5 relative overflow-hidden group">
      <div className="absolute inset-0 halftone opacity-20 pointer-events-none" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="katakana-eyebrow text-[10px] text-ink-muted">{label}</p>
          {jp && <p className="font-jp text-[10px] text-cyan-neon/70 mt-0.5">{jp}</p>}
          <p className="display-tight text-3xl text-ink-text mt-2">{value}</p>
          {typeof delta === "number" && (
            <p
              className={cn(
                "flex items-center gap-1 mt-2 text-xs font-mono",
                up ? "text-cyan-neon" : "text-blood-neon"
              )}
            >
              {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {up ? "+" : ""}
              {delta}%
            </p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "p-2.5 border-2 border-black bg-ink-deep shadow-manga-sm",
              toneRing[tone]
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
