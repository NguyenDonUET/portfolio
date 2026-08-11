"use client";

import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import type { ReactNode } from "react";

/**
 * Site-wide Lenis smooth scroll.
 * `root` binds to the document scroller and exposes the instance via `useLenis`.
 * Anchor clearance uses `scroll-padding-top` on `html` (see globals.css).
 * Overlay UIs (mobile menu, dialogs) call `lenis.stop()` / `start()` explicitly.
 */
const lenisOptions: LenisOptions = {
  autoRaf: true,
  anchors: true,
  stopInertiaOnNavigate: true,
  // Calm, editorial glide for the long single-page narrative.
  lerp: 0.09,
  // Nested scrollables (project dialog) keep native behavior.
  allowNestedScroll: true,
  // Default true — keep explicit for a11y contract.
  respectReducedMotion: true,
};

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
