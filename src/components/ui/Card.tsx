import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Soft surface container for interactive or grouped content.
 * Prefer plain layout for non-interactive presentation.
 */
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface/80 p-6 backdrop-blur-sm",
        "transition-colors hover:border-border-strong",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
