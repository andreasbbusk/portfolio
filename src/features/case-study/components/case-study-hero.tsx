"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CaseStudyMeta } from "@/features/case-study/types";
import { cn } from "@/utils/cn";

type CaseStudyHeroProps = {
  title: string;
  subtitle?: string;
  meta: CaseStudyMeta;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The Specification Sheet
 *
 * Giant title with massive negative space, paired with a rigid metadata grid
 * using 1px borders to separate data points like an architectural specification table.
 * Staggered entrance animation on mount.
 */
export function CaseStudyHero({ title, subtitle, meta }: CaseStudyHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const metaEntries: { label: string; value: React.ReactNode }[] = [
    { label: "Role", value: meta.role },
    { label: "Stack", value: meta.stack },
    { label: "Year", value: meta.year },
  ];

  if (meta.liveUrl) {
    metaEntries.push({
      label: "Live",
      value: (
        <a
          href={meta.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 decoration-[#09090a]/25 transition-colors duration-200 hover:decoration-[#09090a]"
        >
          {meta.liveLabel ?? meta.liveUrl}
        </a>
      ),
    });
  }

  if (meta.sourceUrl) {
    metaEntries.push({
      label: "Source",
      value: (
        <a
          href={meta.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 decoration-[#09090a]/25 transition-colors duration-200 hover:decoration-[#09090a]"
        >
          {meta.sourceLabel ?? "Repository"}
        </a>
      ),
    });
  }

  return (
    <section className="pt-[clamp(120px,18vw,280px)] pb-[clamp(48px,6vw,96px)]">
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-12">
        {/* Title block */}
        <div className="mb-[clamp(40px,5vw,80px)]">
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0 }}
            className={cn(
              "[font-family:var(--font-dm-sans)]",
              "text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.92] tracking-[-0.04em] text-[#09090a]",
            )}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              className="mt-4 font-mono text-sm uppercase tracking-[0.15em] text-[#7e8087]"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Metadata grid — Bauhaus specification table */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        >
          {/* Bauhaus compound rule — primary color accents into architectural line */}
          <div aria-hidden="true" className="flex h-[2px] overflow-hidden">
            {[
              { color: "#dd2f20", delay: 0.45 },
              { color: "#264491", delay: 0.5 },
              { color: "#D4A72C", delay: 0.55 },
            ].map(({ color, delay }) => (
              <motion.div
                key={color}
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay }}
                className="w-7 origin-left"
                style={{ backgroundColor: color }}
              />
            ))}
            <div className="flex-1 bg-[#09090a]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {metaEntries.map((entry, i) => (
              <div
                key={entry.label}
                className={cn(
                  "border-b border-[#09090a]/15 py-5 pr-6",
                  /* Vertical dividers on larger screens */
                  i > 0 && "sm:border-l sm:pl-6",
                  /* On mobile, no left border on first of each row */
                  i % 2 === 0 && "sm:border-l-0",
                  /* On lg, only first item has no left border */
                  i > 0 && "lg:border-l",
                  i === 0 && "lg:border-l-0",
                )}
              >
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7e8087]">
                  {entry.label}
                </p>
                <p className="text-[15px] font-medium leading-snug tracking-[-0.01em] text-[#09090a] [font-family:var(--font-dm-sans)]">
                  {entry.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
