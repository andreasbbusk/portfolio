"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "@/modules/components/svg";

/**
 * PageLoader Component
 *
 * An animated loading screen that displays on initial page load.
 * Features:
 * - Progress bar animation
 * - Logo reveal with clip-path animation
 * - Sequential text animations ("Hold tight" → "Hi there!")
 * - Smooth exit animation
 *
 * Uses GSAP for smooth, professional animations without premium plugins.
 */

interface PageLoaderProps {
  onComplete?: () => void;
}

interface AnimatedTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

/**
 * AnimatedText - Splits text into individual characters for animation
 * This replaces the premium GSAP SplitText plugin with a free React solution
 */
function AnimatedText({ text, delay = 0, onComplete }: AnimatedTextProps) {
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = charsRef.current.filter(Boolean);

    // Set initial state
    gsap.set(chars, {
      autoAlpha: 0,
      yPercent: 125,
    });

    // Animate characters in
    const tl = gsap.timeline({ delay });

    tl.to(chars, {
      autoAlpha: 1,
      yPercent: 0,
      duration: 0.6,
      stagger: 0.02,
      ease: "power3.out",
    });

    // Animate characters out after a delay
    tl.to(
      chars,
      {
        autoAlpha: 0,
        yPercent: -125,
        duration: 0.4,
        stagger: 0.02,
        ease: "power3.in",
        onComplete,
      },
      "+=0.4"
    );

    return () => {
      tl.kill();
    };
  }, [text, delay, onComplete]);

  return (
    <div
      ref={containerRef}
      className="absolute whitespace-nowrap overflow-hidden"
      style={{ marginBottom: "-0.25em", paddingBottom: "0.25em" }}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          ref={(el) => {
            if (el) {
              charsRef.current[index] = el;
            }
          }}
          className="inline-block text-2xl"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [showFirstText, setShowFirstText] = useState(true);
  const [showSecondText, setShowSecondText] = useState(false);

  useEffect(() => {
    // Defensive check - if already seen, bail out early
    if (sessionStorage.getItem('portfolio-loader-seen')) {
      onComplete?.();
      return;
    }

    if (
      !wrapRef.current ||
      !bgRef.current ||
      !containerRef.current ||
      !progressBarRef.current ||
      !logoRef.current
    )
      return;

    const customEase = "power4.inOut";

    // Main loader timeline
    const loadTimeline = gsap.timeline({
      defaults: {
        ease: customEase,
        duration: 3.3,
      },
    });

    // Progress bar and logo animation
    loadTimeline.to(progressBarRef.current, { scaleX: 1 }).to(
      logoRef.current,
      {
        clipPath: "inset(0% 0% 0% 0%)",
      },
      "<" // Start at the same time as progress bar
    );

    // Show second text after 2 seconds
    const textTimeout = setTimeout(() => {
      setShowFirstText(false);
      setShowSecondText(true);
    }, 2000);

    // Container fade out
    loadTimeline
      .to(
        containerRef.current,
        {
          autoAlpha: 0,
          duration: 0.5,
        },
        "+=0.5"
      )
      .to(
        progressBarRef.current,
        {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.5,
        },
        "<"
      )
      .add("hideContent", "<")
      .call(() => {
        // Mark as seen EARLY - before animations complete
        // This ensures flag is set even if user refreshes mid-animation
        sessionStorage.setItem("portfolio-loader-seen", "true");
        // Remove page-loading class to reveal content before slide up
        onComplete?.();
      }, undefined, "hideContent+=0.3")
      .to(
        bgRef.current,
        {
          autoAlpha: 0,
          duration: 0.3,
        },
        "hideContent+=0.3"
      );

    // Slide entire container up and out
    loadTimeline
      .to(
        wrapRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "hideContent+=0.6"
      )
      .call(() => {
        // Animation complete, unmount component
        setIsVisible(false);
      });

    return () => {
      loadTimeline.kill();
      clearTimeout(textTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only run once on mount

  // Don't render if animation is complete
  if (!isVisible) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[100] text-foreground w-full h-screen"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full bg-background">
        {/* Progress Bar */}
        <div
          ref={progressBarRef}
          className="absolute bottom-0 left-0 right-0 w-full h-2 bg-foreground z-10"
          style={{
            transformOrigin: "0%",
            transform: "scale3d(0, 1, 1)",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="relative z-[2] w-full h-full flex flex-col justify-center items-center"
      >
        {/* Logo Container */}
        <div className="relative w-48 h-12 flex justify-center items-center">
          {/* Base Logo (faded background) */}
          <div className="absolute w-full">
            <Logo className="w-full opacity-20" />
          </div>

          {/* Top Logo (revealed with clip-path) */}
          <div
            ref={logoRef}
            className="absolute w-full"
            style={{
              clipPath: "inset(0% 100% 0% 0%)",
            }}
          >
            <Logo className="w-full" />
          </div>
        </div>

        {/* Text Container */}
        <div className="absolute bottom-32 flex flex-col justify-center items-center">
          {showFirstText && <AnimatedText text="Hey there!"/>}
          {showSecondText && <AnimatedText text="Hold tight!" />}
        </div>
      </div>
    </div>
  );
}
