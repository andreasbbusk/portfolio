"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowIcon } from "@/components/icons/arrow-icon";

type ProjectLink = {
  slug: string;
  title: string;
};

type CaseStudyProjectNavProps = {
  previousProject?: ProjectLink;
  nextProject?: ProjectLink;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The Project Footer: Dual Navigation
 *
 * An asymmetric split-panel design with previous (left, ~40%) and
 * next (right, ~60%) project links. Each panel is independently
 * hoverable with its own geometric Bauhaus accents. A vertical
 * divider with tri-color segments separates the two sides.
 * On mobile, panels stack vertically with next on top.
 */
export function CaseStudyProjectNav({
  previousProject,
  nextProject,
}: CaseStudyProjectNavProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!previousProject && !nextProject) return null;

  return (
    <section className="mt-16 md:mt-24">
      {/* Top border — 1px architectural line */}
      <div className="h-px bg-[#09090a]/10" />

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="grid grid-cols-1 md:grid-cols-[2fr_3fr]"
      >
        {/* ── Previous Project Panel (left, 40%) ── */}
        {previousProject ? (
          <Link
            href={`/works/${previousProject.slug}`}
            className="group/prev relative flex min-h-[40vh] flex-col justify-between overflow-hidden bg-[#F9F9F8] transition-colors duration-500 hover:bg-[#F0F0EE] md:min-h-[70vh]"
          >
            {/* Geometric background — previous side */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              {/* Small circle outline — top left */}
              <div className="absolute -left-10 top-[15%] h-[160px] w-[160px] rounded-full border border-[#264491]/5 transition-transform duration-800 group-hover/prev:scale-110" />
              {/* Tiny triangle */}
              <svg
                className="absolute bottom-[20%] left-[20%] transition-transform duration-500 group-hover/prev:translate-y-[-4px]"
                width="10"
                height="9"
                viewBox="0 0 10 9"
              >
                <polygon points="5,0 10,9 0,9" fill="#D4A72C" opacity="0.1" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-16 md:px-10 lg:px-14">
              {/* Eyebrow */}
              <span className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#7e8087] md:mb-6">
                Previous Project
              </span>

              {/* Title */}
              <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-[#09090a] transition-transform duration-500 group-hover/prev:translate-x-[-4px] [font-family:var(--font-dm-sans)]">
                {previousProject.title}
              </h2>

              {/* Arrow — points left */}
              <div className="mt-6 md:mt-8">
                <ArrowIcon className="h-5 w-5 rotate-180 text-[#09090a]/60 transition-all duration-300 group-hover/prev:-translate-x-3 group-hover/prev:text-[#09090a]" />
              </div>
            </div>

            {/* Bottom slug label */}
            <div className="relative z-10 border-t border-[#09090a]/6 px-6 py-3 md:px-10 lg:px-14">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7e8087]">
                /works/{previousProject.slug}
              </span>
            </div>
          </Link>
        ) : (
          <div className="hidden bg-[#F9F9F8] md:block" />
        )}

        {/* ── Next Project Panel (right, 60%) ── */}
        {nextProject ? (
          <Link
            href={`/works/${nextProject.slug}`}
            className="group/next relative flex min-h-[50vh] flex-col justify-between overflow-hidden bg-[#F5F5F3] transition-colors duration-500 hover:bg-[#EBEBEA] md:min-h-[70vh]"
          >
            {/* Vertical Bauhaus divider — left edge of next panel */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 hidden h-full w-[3px] md:block"
            >
              <div className="flex h-full flex-col">
                <div className="flex-1 bg-[#09090a]/8" />
                <div className="h-7 bg-[#dd2f20]/70" />
                <div className="h-7 bg-[#264491]/70" />
                <div className="h-7 bg-[#D4A72C]/70" />
                <div className="flex-1 bg-[#09090a]/8" />
              </div>
            </div>

            {/* Mobile top border — replaces vertical divider */}
            <div
              aria-hidden="true"
              className="flex h-[3px] md:hidden"
            >
              <div className="flex-1 bg-[#09090a]/8" />
              <div className="w-7 bg-[#dd2f20]/70" />
              <div className="w-7 bg-[#264491]/70" />
              <div className="w-7 bg-[#D4A72C]/70" />
              <div className="flex-1 bg-[#09090a]/8" />
            </div>

            {/* Geometric background — next side */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              {/* Large circle outline — off-center right */}
              <div className="absolute -right-20 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full border border-[#dd2f20]/[0.06] transition-transform duration-[800ms] group-hover/next:scale-110 md:h-[400px] md:w-[400px]" />
              {/* Diagonal construction line */}
              <div className="absolute left-[15%] top-0 h-[140%] w-px origin-top rotate-[18deg] bg-[#264491]/[0.05] transition-transform duration-[800ms] group-hover/next:rotate-[22deg]" />
              {/* Small solid square */}
              <div className="absolute bottom-[18%] left-[22%] h-3.5 w-3.5 bg-[#D4A72C]/[0.08] transition-transform duration-500 group-hover/next:rotate-45" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-1 flex-col items-end justify-center px-6 py-20 text-right md:px-12 lg:px-16">
              {/* Eyebrow */}
              <span className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#7e8087] md:mb-8">
                Next Project
              </span>

              {/* Title — larger than previous side */}
              <h2 className="text-[clamp(2.2rem,5.5vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-[#09090a] transition-transform duration-500 group-hover/next:translate-x-[4px] [font-family:var(--font-dm-sans)]">
                {nextProject.title}
              </h2>

              {/* Arrow — points right */}
              <div className="mt-7 md:mt-10">
                <ArrowIcon className="h-6 w-6 text-[#09090a]/60 transition-all duration-300 group-hover/next:translate-x-4 group-hover/next:text-[#09090a]" />
              </div>
            </div>

            {/* Bottom slug label with Bauhaus mark */}
            <div className="relative z-10 flex items-center justify-end gap-3 border-t border-[#09090a]/6 px-6 py-3 md:px-12 lg:px-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7e8087]">
                /works/{nextProject.slug}
              </span>
              <div aria-hidden="true" className="flex gap-[2px]">
                <div className="h-[3px] w-3 bg-[#dd2f20]" />
                <div className="h-[3px] w-3 bg-[#264491]" />
                <div className="h-[3px] w-3 bg-[#D4A72C]" />
              </div>
            </div>
          </Link>
        ) : (
          <div className="hidden bg-[#F5F5F3] md:block" />
        )}
      </motion.div>
    </section>
  );
}
