"use client";

import {
  motion,
  VariantLabels,
  Target,
  TargetAndTransition,
  Transition,
} from "motion/react";

export type TextRollProps = {
  children: string;
  rolled?: boolean;
  duration?: number;
  getEnterDelay?: (index: number) => number;
  getExitDelay?: (index: number) => number;
  className?: string;
  transition?: Transition;
  variants?: {
    enter: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
    exit: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
  };
  onAnimationComplete?: () => void;
};

export function TextRoll({
  children,
  rolled = false,
  duration = 0.5,
  getEnterDelay = (i) => i * 0.1,
  getExitDelay = (i) => i * 0.1 + 0.2,
  className,
  transition = { ease: "easeIn" },
  variants,
  onAnimationComplete,
}: TextRollProps) {
  const defaultVariants = {
    enter: {
      initial: { rotateX: 0 },
      animate: { rotateX: 90 },
    },
    exit: {
      initial: { rotateX: 90 },
      animate: { rotateX: 0 },
    },
  } as const;

  const letters = children.split("");

  return (
    <span className={className}>
      {letters.map((letter, index) => {
        const renderedLetter = letter === " " ? "\u00A0" : letter;
        const isLastLetter = letters.length === index + 1;

        return (
          <span
            key={index}
            className="relative inline-block perspective-[10000px] transform-3d w-auto"
            aria-hidden="true"
          >
            <motion.span
              className="absolute inline-block backface-hidden origin-[50%_25%]"
              initial={false}
              animate={
                rolled
                  ? variants?.enter?.animate ?? defaultVariants.enter.animate
                  : variants?.enter?.initial ?? defaultVariants.enter.initial
              }
              transition={{
                ...transition,
                duration,
                delay: rolled ? getEnterDelay(index) : getExitDelay(index),
              }}
            >
              {renderedLetter}
            </motion.span>
            <motion.span
              className="absolute inline-block backface-:hidden origin-[50%_100%]"
              initial={false}
              animate={
                rolled
                  ? variants?.exit?.animate ?? defaultVariants.exit.animate
                  : variants?.exit?.initial ?? defaultVariants.exit.initial
              }
              transition={{
                ...transition,
                duration,
                delay: rolled ? getExitDelay(index) : getEnterDelay(index),
              }}
              onAnimationComplete={isLastLetter ? onAnimationComplete : undefined}
            >
              {renderedLetter}
            </motion.span>
            <span className="invisible">{renderedLetter}</span>
          </span>
        )
      })}
      <span className="sr-only">{children}</span>
    </span>
  );
}
