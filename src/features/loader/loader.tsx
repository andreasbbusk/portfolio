"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "@/components/icons/logo";
import { markLoaderSeen } from "@/features/loader/storage";

interface PageLoaderProps {
  onComplete?: () => void;
}

const LOADER_FAILSAFE_MS = 6500;

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const hasCompletedRef = useRef(false);
  const failsafeRef = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const bg = bgRef.current;
    const container = containerRef.current;
    const progressBar = progressBarRef.current;
    const logo = logoRef.current;

    if (!wrap || !bg || !container || !progressBar || !logo) {
      return;
    }

    // Mark as seen immediately so refreshes don't replay the loader.
    markLoaderSeen();

    const complete = (forceHide = false) => {
      if (hasCompletedRef.current) {
        return;
      }

      hasCompletedRef.current = true;

      if (failsafeRef.current !== null) {
        window.clearTimeout(failsafeRef.current);
        failsafeRef.current = null;
      }

      onComplete?.();

      if (forceHide) {
        setIsVisible(false);
      }
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      complete(true);
      return;
    }

    const timeline = gsap.timeline({
      defaults: {
        ease: "power4.inOut",
      },
    });

    timeline
      .to(progressBar, {
        scaleX: 1,
        duration: 3.3,
      })
      .to(
        logo,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 3.3,
        },
        "<",
      )
      .to(
        container,
        {
          autoAlpha: 0,
          duration: 0.5,
        },
        "+=0.6",
      )
      .to(
        progressBar,
        {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.5,
        },
        "<",
      )
      .add("hideContent", "<")
      .call(
        () => {
          complete();
        },
        undefined,
        "hideContent+=0.3",
      )
      .to(
        bg,
        {
          autoAlpha: 0,
          duration: 0.3,
        },
        "hideContent+=0.3",
      )
      .to(
        wrap,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "hideContent+=0.6",
      )
      .call(() => {
        setIsVisible(false);
      });

    failsafeRef.current = window.setTimeout(() => {
      timeline.kill();
      complete(true);
    }, LOADER_FAILSAFE_MS);

    return () => {
      if (failsafeRef.current !== null) {
        window.clearTimeout(failsafeRef.current);
        failsafeRef.current = null;
      }
      timeline.kill();
    };
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-100 h-screen w-full text-foreground"
    >
      <div ref={bgRef} className="absolute inset-0 h-full w-full bg-background">
        <div
          ref={progressBarRef}
          className="absolute bottom-0 left-0 right-0 z-10 h-2 w-full bg-foreground"
          style={{
            transformOrigin: "0%",
            transform: "scale3d(0, 1, 1)",
          }}
        />
      </div>

      <div
        ref={containerRef}
        className="relative z-2 flex h-full w-full flex-col items-center justify-center"
      >
        <div className="relative flex h-12 w-48 items-center justify-center">
          <div className="absolute w-full">
            <Logo className="w-full opacity-20" />
          </div>

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
      </div>
    </div>
  );
}
