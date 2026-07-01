import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MangaPanelProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "neon" | "cyan";
  rotate?: "none" | "left" | "right";
  hover?: boolean;
}

/** Reusable bordered manga panel wrapper. */
export function MangaPanel({
  children,
  className,
  variant = "default",
  rotate = "none",
  hover = false,
}: MangaPanelProps) {
  return (
    <div
      className={cn(
        "relative bg-ink-surface border-2 border-black transition-all duration-200",
        variant === "default" && "shadow-manga",
        variant === "neon" && "shadow-manga-neon",
        variant === "cyan" && "shadow-manga-cyan",
        rotate === "left" && "rotate-manga",
        rotate === "right" && "rotate-manga-r",
        hover && "hover:-translate-y-1 hover:shadow-manga-neon hover:border-sakura-neon",
        className
      )}
    >
      {children}
    </div>
  );
}
