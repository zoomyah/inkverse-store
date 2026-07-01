import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  /** Rounded shape variant. */
  rounded?: "none" | "sm" | "md" | "full";
}

const radii = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  full: "rounded-full",
};

/** Screentone-animated skeleton loader (manga halftone shimmer). */
export function Skeleton({ className, rounded = "md" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "screentone-skeleton bg-ink-raised/60 border border-white/5",
        radii[rounded],
        className
      )}
    />
  );
}
