"use client";

import { motion, useReducedMotion } from "motion/react";
import { homepageShellClass } from "@/features/styles";
import {
  WorksPreviewMediaFirstRow,
  WorksPreviewMetaFirstRow,
  WorksPreviewStackedColumnFeature,
} from "@/features/works-preview/components/works-preview-layouts";
import {
  GOLDILOX_WORK,
  RANK_TRACKER_WORK,
  VERTO_WORK,
  VEJLE_WORK,
} from "@/features/works-preview/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SelectedWorksSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="selected-works"
      aria-labelledby="selected-works-title"
      className="[font-family:var(--font-dm-sans)] py-[clamp(84px,11vw,188px)]"
    >
      <div className={homepageShellClass}>
        <div className="mx-auto grid w-full gap-8 ">
          <motion.header
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grid gap-4"
          >
            <h2
              id="selected-works-title"
              className="text-[clamp(42px,6.6vw,84px)] leading-[0.94] tracking-[-0.045em] font-normal text-neutral-950"
            >
              Selected Works
            </h2>
            <p className="max-w-[56ch] text-[15px] leading-relaxed text-[#5f636a] sm:text-base">
              A few projects I&apos;ve enjoyed building. Mostly frontend-heavy,
              with the data and API work that makes them feel complete.
            </p>
          </motion.header>

          {/* Compound rule */}
          <div aria-hidden="true" className="flex h-[2px] items-center">
            <span className="h-full w-[38px] bg-[#dd2f20]" />
            <span className="h-full w-[28px] bg-[#264491]" />
            <span className="h-full w-[18px] bg-[#D4A72C]" />
            <span className="h-full flex-1 bg-[#09090a]" />
          </div>

          <div className="mt-6 grid gap-y-32 md:mt-10 md:gap-y-40 lg:gap-y-56">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <WorksPreviewMediaFirstRow feature={VERTO_WORK} />
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <WorksPreviewMetaFirstRow feature={RANK_TRACKER_WORK} />
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <div className="grid gap-14 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
                <WorksPreviewStackedColumnFeature feature={GOLDILOX_WORK} />
                <WorksPreviewStackedColumnFeature
                  feature={VEJLE_WORK}
                  className="mt-0 lg:mt-32"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
