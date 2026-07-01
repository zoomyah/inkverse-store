import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}

const widths = {
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
  narrow: "max-w-4xl",
};

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8 xl:px-10", widths[size], className)}>
      {children}
    </div>
  );
}
