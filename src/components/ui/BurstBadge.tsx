import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type BurstTone = "sale" | "new" | "gold";

const tones: Record<BurstTone, { bg: string; text: string; label: string }> = {
  sale: { bg: "bg-blood-neon", text: "text-white", label: "SALE" },
  new: { bg: "bg-cyan-neon", text: "text-black", label: "NEW" },
  gold: { bg: "bg-manga-gold", text: "text-black", label: "POW" },
};

interface BurstBadgeProps {
  /** Pass a label to override the default tone label. */
  label?: string;
  tone?: BurstTone;
  /** Skip the pop-in animation (e.g. for already-mounted cards). */
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/** Starburst manga badge — SALE / NEW / POW. */
export function BurstBadge({
  label,
  tone = "sale",
  animate = true,
  className,
  style,
}: BurstBadgeProps) {
  const t = tones[tone];
  const content = (
    <span
      className={cn(
        "starburst inline-flex items-center justify-center text-center",
        "font-display text-[10px] leading-none tracking-wider",
        t.bg,
        t.text,
        className
      )}
      style={{
        width: 64,
        height: 64,
        boxShadow: "0 0 18px rgba(220,20,60,0.5)",
        ...style,
      }}
    >
      <span className="px-1">{label ?? t.label}</span>
    </span>
  );
  if (!animate) return content;
  return (
    <motion.span
      initial={{ scale: 0, rotate: -50 }}
      animate={{ scale: 1, rotate: -12 }}
      transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.12 }}
      className="inline-block"
    >
      {content}
    </motion.span>
  );
}
