"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CaseStudyNarrativeBlock } from "@/features/case-study/types";

type CaseStudyNarrativeProps = {
  blocks: CaseStudyNarrativeBlock[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Structured Columns — The Narrative Content
 *
 * Strict two-column layout:
 * - Left column (~1/4 width): small, bold, numbered headings
 * - Right column: body copy constrained for optimal readability
 *
 * Each block is separated by a 1px horizontal rule.
 * Per-block scroll reveal animation via whileInView.
 */

/**
 * Kandinsky's form–color correspondence (Bauhaus, 1923):
 * Triangle → Yellow · Square → Red · Circle → Blue
 */
const BAUHAUS_MARKERS = [
  <svg key="triangle" aria-hidden="true" width="8" height="7" viewBox="0 0 8 7" className="shrink-0"><polygon points="4,0 8,7 0,7" fill="#D4A72C" /></svg>,
  <svg key="square" aria-hidden="true" width="7" height="7" viewBox="0 0 7 7" className="shrink-0"><rect width="7" height="7" fill="#dd2f20" /></svg>,
  <svg key="circle" aria-hidden="true" width="8" height="8" viewBox="0 0 8 8" className="shrink-0"><circle cx="4" cy="4" r="4" fill="#264491" /></svg>,
];

export function CaseStudyNarrative({ blocks }: CaseStudyNarrativeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-[clamp(64px,8vw,128px)]">
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-12">
        <div className="border-t border-[#09090a]/15">
          {blocks.map((block, i) => (
            <motion.div
              key={block.number}
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 24 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-25%" }}
              transition={{
                duration: 0.6,
                ease: EASE,
                delay: i * 0.08,
              }}
              className="grid grid-cols-1 gap-6 border-b border-[#09090a]/15 py-[clamp(32px,4vw,56px)] md:grid-cols-[minmax(200px,1fr)_3fr] md:gap-12 lg:grid-cols-[280px_1fr]"
            >
              {/* Left column: numbered heading with Bauhaus geometric marker */}
              <div className="flex items-start gap-3">
                <span className="mt-[3px]">{BAUHAUS_MARKERS[i % 3]}</span>
                <p className="font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-[#7e8087]">
                  <span className="text-[#09090a]">{block.number}</span>
                  <span className="mx-2 text-[#09090a]/25">/</span>
                  {block.heading}
                </p>
              </div>

              {/* Right column: body copy */}
              <div className="max-w-prose">
                <p className="text-[17px] leading-[1.75] tracking-[-0.005em] text-[#09090a]/85 [font-family:var(--font-dm-sans)]">
                  {block.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
