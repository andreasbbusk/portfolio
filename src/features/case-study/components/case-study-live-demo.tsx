"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, LoaderCircle, Play, RotateCcw } from "lucide-react";
import type { CaseStudyLiveDemo as CaseStudyLiveDemoData } from "@/features/case-study/types";
import { BLUR_DATA_URL } from "@/utils/image-placeholder";

type LiveDemoState = "idle" | "loading" | "ready" | "failed";

type CaseStudyLiveDemoProps = {
  demo: CaseStudyLiveDemoData;
};

const DEFAULT_TIMEOUT_MS = 8000;

export function CaseStudyLiveDemo({ demo }: CaseStudyLiveDemoProps) {
  const [state, setState] = useState<LiveDemoState>("idle");
  const [frameKey, setFrameKey] = useState(0);
  const timeoutMs = demo.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const ctaLabel = demo.ctaLabel ?? "Play Live Demo";
  const fallbackLabel = demo.fallbackLabel ?? "Open in New Tab";

  useEffect(() => {
    if (state !== "loading") return;

    const timeoutId = window.setTimeout(() => {
      setState((current) => (current === "loading" ? "failed" : current));
    }, timeoutMs);

    return () => window.clearTimeout(timeoutId);
  }, [state, timeoutMs]);

  const startLoading = () => {
    setFrameKey((current) => current + 1);
    setState("loading");
  };

  return (
    <section className="relative px-6 pb-[clamp(64px,8vw,128px)] md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div
          className="relative w-full overflow-hidden rounded-sm border border-[#09090a]/10 bg-[#09090a]"
          style={{ aspectRatio: demo.aspectRatio }}
        >
          {(state === "loading" || state === "ready") && (
            <iframe
              key={frameKey}
              title={demo.title}
              src={demo.embedUrl}
              loading="eager"
              allowFullScreen
              allow="clipboard-read; clipboard-write; fullscreen"
              sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-downloads"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full bg-white"
              onLoad={() =>
                setState((current) => (current === "loading" ? "ready" : current))
              }
              onError={() =>
                setState((current) => (current === "loading" ? "failed" : current))
              }
            />
          )}

          {(state === "idle" || state === "failed") && (
            <Image
              src={demo.posterImage.src}
              alt={demo.posterImage.alt}
              fill
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 92vw, 1520px"
              className="object-cover object-center"
            />
          )}

          {state === "idle" && (
            <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#09090a]/85 via-[#09090a]/40 to-[#09090a]/35 p-6 md:p-8">
              <div className="flex flex-col items-center gap-3 text-center">
                <button
                  type="button"
                  onClick={startLoading}
                  className="inline-flex items-center gap-2 border border-white/70 bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#09090a] transition-colors hover:bg-[#f2f2f2]"
                >
                  <Play aria-hidden="true" className="h-3.5 w-3.5" />
                  {ctaLabel}
                </button>
                <a
                  href={demo.launchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85 underline decoration-white/35 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70"
                >
                  {fallbackLabel}
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}

          {state === "loading" && (
            <div
              aria-live="polite"
              className="absolute inset-0 flex items-center justify-center bg-[#09090a]/30"
            >
              <div className="inline-flex items-center gap-2 border border-white/30 bg-[#09090a]/70 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
                <LoaderCircle aria-hidden="true" className="h-3.5 w-3.5 animate-spin" />
                Loading live demo
              </div>
            </div>
          )}

          {state === "failed" && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#09090a]/60 p-6">
              <div className="max-w-[460px] border border-white/30 bg-[#09090a]/85 p-6 text-white">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/75">
                  Live Demo Unavailable
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/90">
                  The site blocked embedded rendering or took too long to load.
                  You can retry here or open the demo in a new tab.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={startLoading}
                    className="inline-flex items-center gap-2 border border-white/70 bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#09090a] transition-colors hover:bg-[#f2f2f2]"
                  >
                    <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                    Retry
                  </button>
                  <a
                    href={demo.launchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85 underline decoration-white/35 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70"
                  >
                    {fallbackLabel}
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#09090a]/10 pt-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7e8087]">
            Live Demo · Click to load
          </p>
          <a
            href={demo.launchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[#09090a] underline decoration-[#09090a]/30 underline-offset-4 transition-colors hover:decoration-[#09090a]"
          >
            {fallbackLabel}
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
