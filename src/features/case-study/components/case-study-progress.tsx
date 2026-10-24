"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/**
 * Reading progress bar
 *
 * Fixed to the top of the viewport, shows reading progress through
 * the article. Drawn in the signal colour. Hidden for reduced-motion users.
 */
export function CaseStudyProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left"
      style={{
        scaleX,
        background:
          "#b0600d",
      }}
    />
  );
}
