import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  jp?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Katakana eyebrow + Anton display title. */
export function SectionHeading({
  eyebrow,
  jp,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {(eyebrow || jp) && (
        <div className="flex items-center gap-3">
          {jp && (
            <span className="font-jp text-cyan-neon text-xs neon-text-cyan">{jp}</span>
          )}
          {eyebrow && (
            <span className="katakana-eyebrow text-[11px] text-blood-neon">{eyebrow}</span>
          )}
        </div>
      )}
      <h2 className="display-tight text-ink-text text-4xl sm:text-5xl lg:text-6xl uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="text-ink-muted text-sm sm:text-base max-w-2xl mt-1">{subtitle}</p>
      )}
    </div>
  );
}
