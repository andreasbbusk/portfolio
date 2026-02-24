"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ArrowIcon } from "@/components/icons/arrow-icon";
import { useScrollController } from "@/features/loader/scroll-controller";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollController = useScrollController();

  useEffect(() => {
    const updateVisibility = () => {
      const nextIsVisible = window.scrollY > 300;
      setIsVisible((previous) =>
        previous === nextIsVisible ? previous : nextIsVisible,
      );
    };
    let frameId: number | null = null;

    const onScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateVisibility();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateVisibility();

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (scrollController.scrollTo(0, { duration: 1.5 })) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
