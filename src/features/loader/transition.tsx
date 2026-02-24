"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

const TRANSITION_EASE = [0.22, 1, 0.36, 1] as const;

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div key={pathname}>{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.42, ease: TRANSITION_EASE }}
      style={{ willChange: "opacity, transform, filter" }}
    >
      {children}
    </motion.div>
  );
}
