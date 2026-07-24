"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 } as const;

const GROUP_TAGS = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
} as const;

const ITEM_TAGS = {
  div: motion.div,
  li: motion.li,
} as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra delay (seconds) before the reveal starts */
  delay?: number;
  /** Vertical travel distance in px */
  y?: number;
}

/**
 * Fades + lifts a single block into view the first time it scrolls onscreen.
 * Motion collapses to an instant fade when the user prefers reduced motion.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: reduced ? 0 : 0.5, ease: EASE, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof GROUP_TAGS;
}

/**
 * Container that reveals its `StaggerItem` children one-by-one as it enters view.
 */
export function StaggerGroup({
  children,
  className,
  as = "div",
}: StaggerGroupProps) {
  const Comp = GROUP_TAGS[as] as typeof motion.div;

  return (
    <Comp
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </Comp>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof ITEM_TAGS;
}

/**
 * A single staggered child. Must be rendered inside a `StaggerGroup`.
 */
export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const reduced = useReducedMotion();
  const Comp = ITEM_TAGS[as] as typeof motion.div;

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.5, ease: EASE },
    },
  };

  return (
    <Comp className={className} variants={itemVariants}>
      {children}
    </Comp>
  );
}
