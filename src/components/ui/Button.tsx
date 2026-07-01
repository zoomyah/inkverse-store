import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "gold" | "cyan";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Use an angled clip-path edge (manga action look). Default on primary. */
  clip?: boolean;
  children?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-sakura-neon text-white border-2 border-black hover:bg-sakura-deep hover:shadow-neon-pink active:translate-y-0.5",
  secondary:
    "bg-transparent text-ink-text border-2 border-ink-text hover:border-sakura-neon hover:text-sakura-neon active:translate-y-0.5",
  ghost:
    "bg-transparent text-ink-muted border-2 border-transparent hover:text-sakura-neon",
  gold:
    "bg-manga-gold text-black border-2 border-black hover:brightness-95 hover:shadow-neon-gold active:translate-y-0.5",
  cyan:
    "bg-cyan-neon text-black border-2 border-black hover:brightness-95 hover:shadow-neon-cyan active:translate-y-0.5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-widest uppercase",
  md: "px-6 py-3 text-sm tracking-widest uppercase",
  lg: "px-9 py-4 text-base tracking-widest uppercase",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", clip = true, className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-sans font-700 uppercase",
        "transition-all duration-150 select-none disabled:opacity-50 disabled:pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-neon focus-visible:ring-offset-2 focus-visible:ring-offset-ink-base",
        variants[variant],
        sizes[size],
        clip && variant === "primary" && "clip-action",
        clip && variant !== "primary" && variant !== "ghost" && "clip-action-sm",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
