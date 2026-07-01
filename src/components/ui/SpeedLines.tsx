import { cn } from "@/lib/utils";

interface SpeedLinesProps {
  tone?: "white" | "blood";
  className?: string;
  /** Inline style overrides (positioning). */
  style?: React.CSSProperties;
}

/** Radial speed-lines burst — pure CSS repeating-conic-gradient. */
export function SpeedLines({ tone = "white", className, style }: SpeedLinesProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 speed-lines",
        tone === "blood" && "speed-lines-blood",
        className
      )}
      style={style}
    />
  );
}
