"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before starting. Use small steps (0.05–0.1) to stagger siblings. */
  delay?: number;
  /** Vertical travel in px. Kept small so the motion stays subtle. */
  y?: number;
  /**
   * Animate on mount instead of when scrolled into view. Use for above-the-fold
   * content such as the hero.
   */
  immediate?: boolean;
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Fades and lifts its children into place once, the first time they scroll
 * into view. Server components can wrap content in this and stay server
 * components themselves.
 *
 * The `data-reveal` hook lets the <noscript> rule in the root layout show the
 * content when JavaScript is unavailable.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
  immediate = false,
}: RevealProps) {
  const transition = { duration: 0.5, delay, ease };

  if (immediate) {
    return (
      <motion.div
        data-reveal
        className={cn(className)}
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      data-reveal
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
