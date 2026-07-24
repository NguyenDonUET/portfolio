"use client";

import Image from "next/image";
import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export interface AvatarTiltProps {
  src: string;
  alt: string;
  className?: string;
}

const SPRING = { stiffness: 300, damping: 30, mass: 0.6 } as const;
const MAX_TILT = 12;

/**
 * Avatar framed in a card that tilts in 3D toward the pointer, with a floating
 * idle loop and a parallaxing accent glow. GPU-only transforms; fully disabled
 * when the user prefers reduced motion.
 */
export function AvatarTilt({ src, alt, className }: AvatarTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]),
    SPRING,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]),
    SPRING,
  );

  const glowX = useTransform(pointerX, [-0.5, 0.5], [28, -28]);
  const glowY = useTransform(pointerY, [-0.5, 0.5], [28, -28]);

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetTilt() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn(
        "group relative aspect-square w-full max-w-xs transform-3d sm:max-w-sm",
        className,
      )}
      animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY, translateZ: -40 }}
        className="absolute inset-6 -z-10 rounded-full bg-accent/30 blur-3xl"
      />

      <div
        style={{ transform: "translateZ(40px)" }}
        className="relative h-full w-full overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl shadow-accent/10"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 640px) 24rem, 80vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent,color-mix(in_oklab,var(--color-background)_35%,transparent))]"
        />
      </div>
    </motion.div>
  );
}
