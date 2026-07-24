"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the page has scrolled past a threshold.
 * Used by sticky headers to toggle elevated / condensed styles.
 */
export function useHeaderScroll(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
