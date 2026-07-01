import { cn } from "@/lib/utils";

interface HalftoneProps {
  className?: string;
  size?: "sm" | "lg";
  opacity?: number;
}

/** Halftone screentone overlay layer. */
export function Halftone({ className, size = "sm", opacity = 1 }: HalftoneProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        size === "sm" ? "halftone" : "halftone-lg",
        className
      )}
      style={{ opacity }}
    />
  );
}
