import { Transition } from "motion/react";

export const NAV_TRANSITIONS = {
  container: {
    type: "spring",
    bounce: 0.05,
    duration: 0.5,
  } as Transition,

  header: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  } as Transition,

  content: {
    type: "spring",
    bounce: 0.05,
    duration: 0.5,
  } as Transition,

  stagger: {
    type: "spring",
    bounce: 0.07,
    duration: 0.7,
  } as Transition,

  backdrop: {
    duration: 1.1,
  } as Transition,
} as const;

export const STAGGER_DELAY = 0.1;