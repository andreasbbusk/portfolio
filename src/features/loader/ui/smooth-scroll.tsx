"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  disabled?: boolean;
}

// Extend Window interface for Lenis
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export function SmoothScroll({ disabled = false }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Don't initialize Lenis if user prefers reduced motion or if disabled
    if (prefersReducedMotion || disabled) {
      return;
    }

    // Initialize Lenis with slow, buttery configuration
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.90,
      touchMultiplier: 2,
      infinite: false,
    });

    // Expose Lenis instance globally for programmatic scrolling
    window.lenis = lenisRef.current;

    // Start the requestAnimationFrame loop
    function handleAnimationFrame(time: number) {
      lenisRef.current?.raf(time);
      animationFrameRef.current = requestAnimationFrame(handleAnimationFrame);
    }

    animationFrameRef.current = requestAnimationFrame(handleAnimationFrame);

    // Cleanup on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
      window.lenis = undefined;
    };
  }, [disabled]);

  return null;
}
