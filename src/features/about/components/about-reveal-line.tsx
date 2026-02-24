"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/utils/cn";

type AboutRevealLineProps = {
  className: string;
  progress: MotionValue<number>;
  revealEnd: number;
  revealStart: number;
  text: string;
};

export function AboutRevealLine({
  className,
  progress,
  revealEnd,
  revealStart,
  text,
}: AboutRevealLineProps) {
  const revealPercent = useTransform(
    progress,
    [revealStart, revealEnd],
    [0, 100],
  );
  const clipPath = useTransform(
    revealPercent,
    (value) => `inset(0 ${100 - value}% 0 0)`,
  );

  return (
    <span className={cn(className, "relative block whitespace-nowrap")}>
      <span className="block text-[#bcc0c6]">{text}</span>
      <motion.span
        aria-hidden="true"
        style={{ clipPath }}
        className="pointer-events-none absolute inset-0 block text-[#09090a]"
      >
        {text}
      </motion.span>
    </span>
  );
}
