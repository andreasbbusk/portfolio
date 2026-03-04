"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type {
  CaseStudyCodeBlock,
  CaseStudyImage,
} from "@/features/case-study/types";
import { BLUR_DATA_URL } from "@/utils/image-placeholder";
import { cn } from "@/utils/cn";

type CaseStudyVisualsProps = {
  images?: CaseStudyImage[];
  codeBlocks?: CaseStudyCodeBlock[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Visual Presentation & Code Blocks
 *
 * Split into two distinct sections:
 * 1. Light section: secondary screenshots on measured, solid-colored backing cards
 *    with staggered scroll-reveal animation per card.
 * 2. Dark section: full-width near-black (#09090a) background for code blocks
 *    with inverted typography. A dramatic visual shift that creates contrast.
 */
export function CaseStudyVisuals({
  images,
  codeBlocks,
}: CaseStudyVisualsProps) {
  const prefersReducedMotion = useReducedMotion();
  const hasImages = images && images.length > 0;
  const hasCode = codeBlocks && codeBlocks.length > 0;

  if (!hasImages && !hasCode) return null;

  return (
    <>
      {/* ── Light section: secondary images ── */}
      {hasImages && (
        <section className="py-[clamp(32px,6vw,96px)]">
          <div className="mx-auto w-full max-w-[1680px] px-6 md:px-12">
            <div
              className={cn(
                "grid gap-6",
                images.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2",
              )}
            >
              {images.map((image, i) => (
                <motion.div
                  key={image.src}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 32 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-25%" }}
                  transition={{
                    duration: 0.65,
                    ease: EASE,
                    delay: i * 0.15,
                  }}
                  className={cn(
                    "relative p-6 md:p-8 lg:p-10",
                    image.backing === "gray" ? "bg-[#F5F5F3]" : "bg-white",
                    /* Border only on white cards for contrast against page bg */
                    image.backing !== "gray" && "border border-[#09090a]/10",
                    /* Overlap effect: second card nudges up on desktop */
                    images.length > 1 && i === 1 && "md:mt-12",
                  )}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      sizes={
                        images.length === 1
                          ? "(max-width: 768px) 100vw, 92vw"
                          : "(max-width: 768px) 100vw, 50vw"
                      }
                      className="object-cover object-left-top"
                    />
                  </div>
                  {image.caption && (
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-[#7e8087]">
                      {image.caption}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Dark section: code blocks ── */}
      {hasCode && (
        <section className="bg-[#09090a] py-[clamp(64px,8vw,128px)]">
          <div className="mx-auto w-full max-w-[1680px] px-6 md:px-12">
            {/* Eyebrow label */}
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 md:mb-12">
              Source Code
            </p>

            {codeBlocks.map((block) => (
              <div
                key={block.filename ?? block.code.slice(0, 40)}
                className="mb-6 last:mb-0"
              >
                {/* File label bar — dark variant */}
                {block.filename && (
                  <div className="border border-b-0 border-white/15 bg-white/[0.05] px-5 py-3">
                    <p className="flex items-center font-mono text-[12px] tracking-[0.05em] text-white/80">
                      <span
                        aria-hidden="true"
                        className="mr-3 inline-block h-[7px] w-[7px] bg-[#dd2f20]"
                      />
                      {block.filename}
                      <span className="ml-3 text-white/35">
                        {block.language}
                      </span>
                    </p>
                  </div>
                )}
                {/* Code content — inverted brutalist style */}
                <div className="border border-white/15 bg-white/[0.03]">
                  <pre className="overflow-x-auto p-5 md:p-6">
                    <code className="font-mono text-[13px] leading-[1.7] text-white/80">
                      {block.code}
                    </code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
