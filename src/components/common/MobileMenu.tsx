"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { NavItem } from "@/types/portfolio";
import { cn } from "@/lib/utils";

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  activeId?: string;
}

export function MobileMenu({ open, onClose, items, activeId }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        aria-label="Close menu"
        onClick={onClose}
      />
      <nav className="absolute inset-x-4 top-20 rounded-2xl border border-border bg-surface p-4 shadow-xl">
        <div className="mb-2 flex items-center justify-between px-2">
          <span className="text-sm font-medium text-muted">Navigate</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted hover:bg-surface-elevated hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeId === id;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-foreground hover:bg-surface-elevated",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
