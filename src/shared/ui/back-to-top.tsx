"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ArrowIcon } from "@/shared/icons/arrow-icon";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      // Show button after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };

    // Listen to scroll events
    window.addEventListener("scroll", updateVisibility);

    // Check initial scroll position
    updateVisibility();

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  const scrollToTop = () => {
    // Try to use Lenis for smooth scroll if available
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 });
    } else {
      // Fallback to native smooth scroll
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Button
      onClick={scrollToTop}
      size="icon-xl"
      variant="default"
      aria-label="Back to top"
      className={`
        fixed bottom-8 left-8 z-50 shadow-lg
        transition-all duration-300 ease-in-out
        ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
    >
      <ArrowIcon className="rotate-270 size-7" />
    </Button>
  );
}
