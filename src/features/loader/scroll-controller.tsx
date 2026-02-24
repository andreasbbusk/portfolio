"use client";

import { createContext, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";
import type Lenis from "lenis";

type ScrollToArgs = Parameters<Lenis["scrollTo"]>;

type ScrollController = {
  setLenisInstance: (instance: Lenis | null) => void;
  start: () => void;
  stop: () => void;
  scrollTo: (...args: ScrollToArgs) => boolean;
};

const ScrollControllerContext = createContext<ScrollController | null>(null);

export function ScrollControllerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [controller] = useState<ScrollController>(() => ({
    setLenisInstance(instance) {
      lenisRef.current = instance;

      // Keep a temporary global alias for debugging/compat while the app
      // transitions to explicit composition via the controller hook.
      window.lenis = instance ?? undefined;
    },
    start() {
      lenisRef.current?.start?.();
    },
    stop() {
      lenisRef.current?.stop?.();
    },
    scrollTo(...args) {
      if (!lenisRef.current) {
        return false;
      }

      lenisRef.current.scrollTo(...args);
      return true;
    },
  }));

  return (
    <ScrollControllerContext.Provider value={controller}>
      {children}
    </ScrollControllerContext.Provider>
  );
}

export function useScrollController() {
  const controller = useContext(ScrollControllerContext);

  if (!controller) {
    throw new Error(
      "useScrollController must be used within <ScrollControllerProvider />",
    );
  }

  return controller;
}
