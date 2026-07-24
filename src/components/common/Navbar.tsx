"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import type { NavItem } from "@/types/portfolio";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { MobileMenu } from "@/components/common/MobileMenu";
import { SideNav } from "@/components/common/SideNav";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const sectionIds = portfolioData.navigation.map((item) =>
  item.href.replace("#", ""),
);

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useHeaderScroll();
  const activeId = useScrollSpy(sectionIds);
  const tNav = useTranslations("nav");

  const items: NavItem[] = portfolioData.navigation.map((item) => ({
    href: item.href,
    label: tNav(item.href.replace("#", "")),
  }));

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-[background-color,border-color,backdrop-filter]",
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-display text-lg tracking-tight text-foreground transition-colors hover:text-accent"
          >
            {portfolioData.personal.name}
          </Link>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-foreground md:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </Container>
      </header>

      <SideNav items={items} activeId={activeId} />

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={items}
        activeId={activeId}
      />
    </>
  );
}
