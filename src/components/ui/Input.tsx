import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: ReactNode;
  error?: string;
}

const fieldClasses =
  "w-full bg-ink-deep border-2 border-black text-ink-text placeholder:text-ink-muted/60 px-4 py-3 font-sans text-sm focus:outline-none focus:border-sakura-neon focus:shadow-neon-pink transition-colors";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className, id, ...props },
  ref
) {
  const inputId = id || props.name;
  return (
    <label className="flex flex-col gap-1.5" htmlFor={inputId}>
      {label && (
        <span className="katakana-eyebrow text-[10px] text-ink-muted">{label}</span>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(fieldClasses, error && "border-sakura-neon", className)}
        {...props}
      />
      {error ? (
        <span className="text-xs text-sakura-neon">{error}</span>
      ) : (
        hint && <span className="text-xs text-ink-muted">{hint}</span>
      )}
    </label>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, className, id, ...props },
  ref
) {
  const inputId = id || props.name;
  return (
    <label className="flex flex-col gap-1.5" htmlFor={inputId}>
      {label && (
        <span className="katakana-eyebrow text-[10px] text-ink-muted">{label}</span>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={cn(fieldClasses, "min-h-[96px] resize-y", error && "border-sakura-neon", className)}
        {...props}
      />
      {error && <span className="text-xs text-sakura-neon">{error}</span>}
    </label>
  );
});

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, className, id, children, ...props },
  ref
) {
  const inputId = id || props.name;
  return (
    <label className="flex flex-col gap-1.5" htmlFor={inputId}>
      {label && (
        <span className="katakana-eyebrow text-[10px] text-ink-muted">{label}</span>
      )}
      <select
        ref={ref}
        id={inputId}
        className={cn(fieldClasses, "appearance-none cursor-pointer", className)}
        {...(props as InputHTMLAttributes<HTMLSelectElement>)}
      >
        {children}
      </select>
    </label>
  );
});
