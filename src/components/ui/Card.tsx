import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "neon" | "cyan";
  hover?: boolean;
}

/** Manga-panel card — thick black border + hard offset shadow. */
export function Card({ children, className, variant = "default", hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "relative bg-ink-surface border-2 border-black transition-all duration-200",
        variant === "default" && "shadow-manga",
        variant === "neon" && "shadow-manga-neon",
        variant === "cyan" && "shadow-manga-cyan",
        hover &&
          "hover:-translate-y-1 hover:shadow-manga-neon hover:border-blood-neon",
        className
      )}
    >
      {children}
    </div>
  );
}
