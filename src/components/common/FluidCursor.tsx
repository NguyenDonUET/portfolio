"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import useFluidCursor from "@/hooks/use-FluidCursor";

/**
 * Cursify fluid-cursor overlay. WebGL trails sit behind page chrome and never
 * capture clicks (`pointer-events-none`). Skipped on touch and reduced motion.
 * @see https://cursify.ui-layouts.com/components/fluid-cursor
 */
export function FluidCursor() {
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    useFluidCursor();
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
    >
      <canvas
        id="fluid"
        className="size-full opacity-40 dark:opacity-75"
      />
    </div>
  );
}
