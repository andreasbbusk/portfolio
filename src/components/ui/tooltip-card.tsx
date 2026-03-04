"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/utils/cn";

export const Tooltip = ({
  content,
  children,
  containerClassName,
}: {
  content: string | React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const tooltipId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hoverDelayTimeoutRef = useRef<number | null>(null);
  const pendingMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const clearHoverDelayTimeout = () => {
    if (hoverDelayTimeoutRef.current !== null) {
      window.clearTimeout(hoverDelayTimeoutRef.current);
      hoverDelayTimeoutRef.current = null;
    }
  };

  const hideTooltip = () => {
    clearHoverDelayTimeout();
    setMouse({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
    setIsVisible(false);
  };

  const calculatePosition = (mouseX: number, mouseY: number) => {
    if (!contentRef.current || !containerRef.current) {
      return { x: mouseX + 12, y: mouseY + 12 };
    }

    const tooltip = contentRef.current;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const tooltipWidth = 240;
    const tooltipHeight = tooltip.scrollHeight;

    const absoluteX = containerRect.left + mouseX;
    const absoluteY = containerRect.top + mouseY;

    let finalX = mouseX + 12;
    let finalY = mouseY + 12;

    if (absoluteX + 12 + tooltipWidth > viewportWidth) {
      finalX = mouseX - tooltipWidth - 12;
    }

    if (absoluteX + finalX < 0) {
      finalX = -containerRect.left + 12;
    }

    if (absoluteY + 12 + tooltipHeight > viewportHeight) {
      finalY = mouseY - tooltipHeight - 12;
    }

    if (absoluteY + finalY < 0) {
      finalY = -containerRect.top + 12;
    }

    return { x: finalX, y: finalY };
  };

  const updateMousePosition = (mouseX: number, mouseY: number) => {
    setMouse({ x: mouseX, y: mouseY });
    setPosition(calculatePosition(mouseX, mouseY));
  };

  const showTooltipAtCenter = () => {
    const container = containerRef.current;

    if (!container) {
      setIsVisible(true);
      return;
    }

    const rect = container.getBoundingClientRect();
    const mouseX = rect.width / 2;
    const mouseY = rect.height / 2;
    updateMousePosition(mouseX, mouseY);
    setIsVisible(true);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    pendingMouseRef.current = { x: mouseX, y: mouseY };
    clearHoverDelayTimeout();

    hoverDelayTimeoutRef.current = window.setTimeout(() => {
      const { x, y } = pendingMouseRef.current;
      updateMousePosition(x, y);
      setIsVisible(true);
      hoverDelayTimeoutRef.current = null;
    }, 350);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    pendingMouseRef.current = { x: mouseX, y: mouseY };

    if (!isVisible) return;
    updateMousePosition(mouseX, mouseY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLSpanElement>) => {
    clearHoverDelayTimeout();
    const touch = e.touches[0];

    if (!touch) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;
    updateMousePosition(mouseX, mouseY);
    setIsVisible(true);
  };

  const handleTouchEnd = () => {
    window.setTimeout(() => {
      hideTooltip();
    }, 2000);
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!window.matchMedia("(hover: none)").matches) return;

    e.preventDefault();

    if (isVisible) {
      hideTooltip();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    updateMousePosition(mouseX, mouseY);
    setIsVisible(true);
  };

  const handleFocus = () => {
    showTooltipAtCenter();
  };

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    if (e.currentTarget.contains(e.relatedTarget)) {
      return;
    }

    hideTooltip();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Escape") {
      hideTooltip();
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      if (isVisible) {
        hideTooltip();
      } else {
        showTooltipAtCenter();
      }
    }
  };

  useEffect(() => {
    return () => {
      clearHoverDelayTimeout();
    };
  }, []);

  useEffect(() => {
    if (isVisible && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isVisible, content]);

  useEffect(() => {
    if (!isVisible || !contentRef.current) return;

    const frame = window.requestAnimationFrame(() => {
      const newPosition = calculatePosition(mouse.x, mouse.y);
      setPosition(newPosition);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isVisible, height, mouse.x, mouse.y]);

  return (
    <span
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-expanded={isVisible}
      aria-describedby={isVisible ? tooltipId : undefined}
      className={cn("relative inline-block", containerClassName)}
      onBlur={handleBlur}
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={hideTooltip}
      onMouseMove={handleMouseMove}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={tooltipId}
            id={tooltipId}
            role="tooltip"
            initial={{ height: 0, opacity: 1 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="pointer-events-none absolute z-50 min-w-60 overflow-hidden rounded-xl border border-black/15 bg-white"
            style={{
              top: position.y,
              left: position.x,
            }}
          >
            <div
              ref={contentRef}
              className="[font-family:var(--font-dm-sans)] px-3 py-2.5 text-[13px] leading-snug tracking-[-0.01em] text-neutral-950 md:px-4 md:py-3 md:text-sm"
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
