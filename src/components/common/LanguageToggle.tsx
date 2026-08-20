"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { locales, LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Fancy segmented EN/VI switch with a sliding aurora-gradient indicator.
 * Persists the choice to a cookie and refreshes server components so the new
 * locale's messages are streamed in.
 */
export function LanguageToggle() {
  const active = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const reduceMotion = useReducedMotion();

  const activeIndex = Math.max(
    0,
    locales.indexOf(active as Locale),
  );

  const setLocale = (locale: Locale) => {
    if (locale === active) return;
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "relative inline-flex items-center rounded-full border border-border bg-surface/60 p-0.5 backdrop-blur-sm transition-opacity",
        isPending && "opacity-60",
      )}
    >
      {/* Sliding gradient pill behind the active label */}
      <motion.span
        aria-hidden
        className="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-linear-to-r from-teal-400 via-sky-400 to-violet-500 shadow-[0_2px_10px_-2px_rgba(56,189,248,0.55)]"
        initial={false}
        animate={{ x: `${activeIndex * 100}%` }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 420, damping: 34 }
        }
      />
      {locales.map((locale) => {
        const isActive = active === locale;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => setLocale(locale)}
            disabled={isPending}
            aria-pressed={isActive}
            className={cn(
              "relative z-10 inline-flex h-7 w-10 cursor-pointer items-center justify-center rounded-full text-xs font-semibold uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed",
              isActive
                ? "text-white"
                : "text-muted hover:text-foreground",
            )}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}
