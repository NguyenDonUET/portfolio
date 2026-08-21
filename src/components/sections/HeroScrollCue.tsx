"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * First-viewport scroll hint: a down arrow linking to About.
 * Subtle vertical loop; static when the user prefers reduced motion.
 */
export function HeroScrollCue() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, delay: 0.7, ease: "easeOut" }}
      className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center sm:bottom-6"
    >
      <Link
        href="#about"
        aria-label={t("scrollCue", { section: tNav("about") })}
        className={cn(
          "pointer-events-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg",
          "text-muted transition-[color,transform] duration-300 ease-out",
          "hover:scale-[1.02] hover:text-foreground active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <motion.span
          aria-hidden
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ArrowDown className="size-5" />
        </motion.span>
      </Link>
    </motion.div>
  );
}
