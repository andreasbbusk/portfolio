"use client";

import { motion } from "motion/react";
import { memo } from "react";

interface BurgerIconProps {
  isOpen: boolean;
  className?: string;
}

export const BurgerIcon = memo(function BurgerIcon({
  isOpen,
  className = "",
}: BurgerIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Top line - rotates 45deg and moves down to form X */}
      <motion.line
        x1="4"
        y1="8"
        x2="20"
        y2="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 4 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1], // Tailwind's ease-in-out cubic bezier
        }}
        style={{
          originX: "50%",
          originY: "50%",
        }}
      />

      {/* Bottom line - rotates -45deg and moves up to form X */}
      <motion.line
        x1="4"
        y1="16"
        x2="20"
        y2="16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -4 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          originX: "50%",
          originY: "50%",
        }}
      />
    </svg>
  );
});
