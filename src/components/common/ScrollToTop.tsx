"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const SHOW_AFTER = 480;
const RING_SIZE = 48;
const STROKE = 2.5;
const RADIUS = (RING_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Fixed bottom-right return control with an aurora progress ring that fills
 * as the page is scrolled. Signature chrome for the long single-page narrative.
 */
export function ScrollToTop() {
  const t = useTranslations("chrome");
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      setVisible(scrollTop > SHOW_AFTER);
      setProgress(ratio);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isComplete = progress >= 0.995;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
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
            "border shadow-lg backdrop-blur-md transition-[background,border-color,color,box-shadow] duration-300 ease-out",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "lg:right-8",
            isComplete
              ? "border-transparent bg-linear-to-br from-teal-400 via-sky-400 to-violet-500 text-white shadow-[0_12px_32px_-10px_rgba(56,189,248,0.55)]"
              : "border-border bg-surface/80 text-foreground hover:border-sky-400/40 hover:shadow-[0_12px_32px_-12px_rgba(56,189,248,0.45)]",
          )}
        >
          {/* Track + aurora progress ring */}
          <svg
            aria-hidden
            width={RING_SIZE}
            height={RING_SIZE}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            className="pointer-events-none absolute inset-0 -rotate-90"
          >
            <defs>
              <linearGradient
                id="scroll-progress-aurora"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="55%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE}
              className="text-border"
            />
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="url(#scroll-progress-aurora)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />
          </svg>

          <ArrowUp
            aria-hidden
            className="relative size-4.5 transition-transform duration-200 group-hover:-translate-y-0.5"
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
