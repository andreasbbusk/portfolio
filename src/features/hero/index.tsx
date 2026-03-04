"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { heroCopy } from "@/features/hero/content";
import {
  homepageSansFontClass,
  homepagePrimaryButtonClass,
  homepageSecondaryButtonClass,
  homepageSectionClass,
  homepageShellClass,
} from "@/features/styles";
import { cn } from "@/utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={cn(
        homepageSectionClass,
        "pt-[clamp(72px,8.5vw,136px)] pb-[calc(132px+env(safe-area-inset-bottom))] md:pb-[clamp(88px,10vw,160px)]",
      )}
    >
      <div className={homepageShellClass}>
        <div className="grid gap-[clamp(26px,2.9vw,46px)]">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0 }}
            className="inline-flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.14em] text-[#7e8087]"
          >
            <span aria-hidden="true" className="size-[7px] shrink-0 bg-[#dd2f20]" />
            Web Developer Portfolio
          </motion.p>
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className={cn(
              homepageSansFontClass,
              "text-balance text-[clamp(32px,6.1vw,72px)] leading-[1.04] tracking-[-0.033em] font-semibold",
            )}
          >
            {heroCopy.headline}
          </motion.h1>
          {heroCopy.subheadlineLines.length > 0 ? (
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
              className={cn(
                homepageSansFontClass,
                "text-[clamp(16px,2vw,32px)] leading-[1.08] tracking-[-0.02em]",
              )}
            >
              {heroCopy.subheadlineLines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </motion.p>
          ) : null}
        </div>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
          className="mt-[clamp(38px,4.8vw,72px)] flex flex-col gap-3 md:flex-row md:items-center md:gap-5"
        >
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {heroCopy.ctas.map((cta, index) => (
              <Link
                key={cta.label}
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noreferrer noopener" : undefined}
                className={cn(
                  index === 0
                    ? homepagePrimaryButtonClass
                    : homepageSecondaryButtonClass,
                  "h-[46px] min-w-[102px] rounded-xl px-5 text-[0.98rem] font-medium md:h-[50px] md:px-6",
                )}
              >
                {cta.label}
              </Link>
            ))}
          </div>
          <div className="flex min-w-0 flex-1 h-[2px] overflow-hidden" aria-hidden="true">
            <div className="w-7 bg-[#dd2f20]" />
            <div className="w-7 bg-[#264491]" />
            <div className="w-7 bg-[#D4A72C]" />
            <div className="flex-1 bg-[#09090a]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
