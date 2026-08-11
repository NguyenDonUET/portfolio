"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const SHOW_AFTER = 480;

/**
 * Fixed bottom-right return control. Shows after the page has been scrolled;
 * Lenis drives the scroll-to-top motion.
 */
export function ScrollToTop() {
  const t = useTranslations("chrome");
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => {
      const next = lenis.scroll > SHOW_AFTER;
      setVisible((prev) => (prev === next ? prev : next));
    };

    onScroll();
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  const scrollToTop = () => {
    lenis?.scrollTo(0, { immediate: Boolean(reduceMotion) });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label={t("scrollToTop")}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.85, y: 12 }
          }
          transition={
            reduceMotion
              ? { duration: 0.15 }
              : { type: "spring", stiffness: 380, damping: 28 }
          }
          whileHover={reduceMotion ? undefined : { y: -2, scale: 1.04 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          className={cn(
            "group fixed right-5 bottom-6 z-40 inline-flex size-12 cursor-pointer items-center justify-center rounded-full",
            "border border-border bg-surface/80 text-foreground shadow-lg backdrop-blur-md",
            "transition-[background,border-color,color,box-shadow] duration-300 ease-out",
            "hover:border-sky-400/40 hover:shadow-[0_12px_32px_-12px_rgba(56,189,248,0.45)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "lg:right-8",
          )}
        >
          <ArrowUp
            aria-hidden
            className="size-4.5 transition-transform duration-200 group-hover:-translate-y-0.5"
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
