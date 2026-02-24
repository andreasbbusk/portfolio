import { useEffect, useState } from "react";

interface UseScrollDirectionOptions {
  threshold?: number; // Minimum scroll from top before hiding
  delta?: number; // Minimum scroll change to trigger state update
}

export function useScrollDirection({
  threshold = 100,
  delta = 5,
}: UseScrollDirectionOptions = {}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      // Always show when near the top
      if (scrollY < threshold) {
        setIsVisible(true);
        lastScrollY = scrollY;
        ticking = false;
        return;
      }

      // Only update if scroll delta exceeds threshold (prevents jitter)
      if (Math.abs(scrollY - lastScrollY) < delta) {
        ticking = false;
        return;
      }

      // Hide when scrolling down, show when scrolling up
      setIsVisible(scrollY < lastScrollY);
      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold, delta]);

  return isVisible;
}
