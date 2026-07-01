import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "neon" | "cyan" | "gold" | "muted";

const tones: Record<BadgeTone, string> = {
  neon: "bg-sakura-neon/15 text-sakura-neon border-sakura-neon/40",
  cyan: "bg-cyan-neon/15 text-cyan-neon border-cyan-neon/40",
  gold: "bg-manga-gold/15 text-manga-gold border-manga-gold/40",
  muted: "bg-white/5 text-ink-muted border-white/10",
};

export function Badge({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-sans font-600 uppercase tracking-[0.18em] border",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
