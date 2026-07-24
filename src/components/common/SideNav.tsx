"use client";

import Link from "next/link";
import type { NavItem } from "@/types/portfolio";
import { cn } from "@/lib/utils";

export interface SideNavProps {
  items: NavItem[];
  activeId?: string;
}

/**
 * Fixed vertical "measurement rail" navigation (md+). Each section is a ruler
 * tick; the active tick extends and glows, and monospace labels slide out on
 * hover/focus. Resting state stays in the viewport gutter to keep the header clean.
 */
export function SideNav({ items, activeId }: SideNavProps) {
  return (
    <nav
      aria-label="Sections"
      className="group fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 md:block lg:right-8"
    >
      <ul className="flex flex-col items-end gap-5">
        {items.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = activeId === id;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className="group/item flex items-center justify-end gap-3 focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "font-mono text-[0.7rem] tracking-[0.18em] uppercase transition-all duration-300 ease-out",
                    isActive
                      ? "text-accent opacity-100"
                      : "translate-x-1 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100",
                  )}
                >
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "h-px w-10 origin-right rounded-full transition-[transform,background-color] duration-300 ease-out",
                    isActive
                      ? "scale-x-100 bg-accent"
                      : "scale-x-[0.35] bg-border-strong group-hover/item:scale-x-[0.65] group-hover/item:bg-muted",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
