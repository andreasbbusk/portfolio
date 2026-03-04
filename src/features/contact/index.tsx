"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  CONTACT_EMAIL,
  CONTACT_LINKS,
  CONTACT_MESSAGE,
} from "@/features/contact/content";
import { homepageSansFontClass, homepageShellClass } from "@/features/styles";
import {
  InlineCopyLink,
  InlineCopyLinkAnchor,
  InlineCopyLinkButton,
} from "@/components/ui/inline-copy-link";
import { cn } from "@/utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactFooterSection() {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <footer
      id="contact-footer"
      className="relative mt-[clamp(48px,10vw,128px)] overflow-hidden bg-transparent text-[#09090a]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[128vw] w-[240vw] min-h-[980px] min-w-[2200px] -translate-x-1/2 translate-y-[58%] rounded-[50%] bg-[#F9F9F8]"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div
          className={cn(
            homepageShellClass,
            "flex flex-1 flex-col pt-8 sm:pt-10 md:pt-12",
          )}
        >
          <div className="flex flex-1 items-center justify-center py-32 sm:py-36 md:py-40">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 50 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative z-10 mx-auto flex w-full max-w-[1120px] flex-col items-center text-center"
            >
              <h2
                className={cn(
                  homepageSansFontClass,
                  "text-7xl font-semibold leading-none tracking-tighter text-neutral-950 sm:text-8xl md:text-[10vw]",
                )}
              >
                Let&apos;s work.
              </h2>

              <p
                className={cn(
                  homepageSansFontClass,
                  "mx-auto mt-8 max-w-xl text-center text-lg leading-relaxed text-neutral-600 sm:text-xl",
                )}
              >
                {CONTACT_MESSAGE}
              </p>

              <InlineCopyLink
                value={CONTACT_EMAIL}
                className="mt-10 justify-center"
                aria-label="Email contact actions"
              >
                <InlineCopyLinkAnchor
                  hrefPrefix="mailto:"
                  className={cn(
                    homepageSansFontClass,
                    "inline-flex items-center text-[clamp(1.2rem,2.8vw,2.25rem)] font-medium leading-tight tracking-[-0.03em] text-neutral-900 hover:text-black focus-visible:text-black",
                  )}
                />
                <InlineCopyLinkButton
                  copyAriaLabel="Copy email address"
                  className="h-6 text-[13px] text-neutral-500 hover:text-neutral-900 focus-visible:text-neutral-900 focus-visible:max-w-[104px] group-hover/inline-copy:max-w-[104px] [&_svg]:size-4"
                />
              </InlineCopyLink>
            </motion.div>
          </div>
        </div>

        {/* Kandinsky end mark — page signature, mirrors case study endings */}
        <div
          aria-hidden="true"
          className="flex items-center justify-center gap-4 pb-10"
        >
          <svg width="8" height="7" viewBox="0 0 8 7">
            <polygon points="4,0 8,7 0,7" fill="#D4A72C" opacity="0.3" />
          </svg>
          <svg width="7" height="7" viewBox="0 0 7 7">
            <rect width="7" height="7" fill="#dd2f20" opacity="0.3" />
          </svg>
          <svg width="8" height="8" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="4" fill="#264491" opacity="0.3" />
          </svg>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          className="relative z-20 mt-auto"
        >
          <div className="relative px-3 pb-3 pt-4 sm:px-5 sm:pb-4 sm:pt-0">
            {/* Bauhaus compound rule — tri-color segments into architectural line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[8px] left-3 right-3 flex h-[2px] overflow-hidden sm:bottom-[10px] sm:left-5 sm:right-5"
            >
              <div className="w-7 bg-[#dd2f20]" />
              <div className="w-7 bg-[#264491]" />
              <div className="w-7 bg-[#D4A72C]" />
              <div className="flex-1 bg-[#09090a]" />
            </div>

            <div className="relative grid gap-3 pb-4 font-mono text-[11px] leading-none font-medium uppercase tracking-[0.14em] text-black/68 sm:h-[48px] sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:pb-0 sm:text-[12px]">
              <div className="inline-flex flex-wrap items-center gap-2.5 justify-self-start">
                {/* Bauhaus square marker — Kandinsky red */}
                <span
                  aria-hidden="true"
                  className="size-[7px] shrink-0 bg-[#dd2f20]"
                />
                <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
                  {CONTACT_LINKS.map((link, index) => {
                    const isExternal = "external" in link && link.external;

                    return (
                      <span
                        key={link.label}
                        className="inline-flex items-center"
                      >
                        <a
                          href={link.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="transition-colors duration-200 hover:text-black"
                        >
                          {link.label}
                        </a>
                        {index < CONTACT_LINKS.length - 1 ? (
                          <span
                            aria-hidden="true"
                            className="ml-2 text-[#09090a]/25"
                          >
                            /
                          </span>
                        ) : null}
                      </span>
                    );
                  })}
                </span>
              </div>

              <div className="inline-flex items-center gap-2.5 justify-self-start sm:justify-self-end">
                <p className="text-left sm:text-right">
                  Aarhus, DK <span aria-hidden="true">{"\u2014"}</span> 2026
                </p>
                {/* Bauhaus circle marker — Kandinsky blue */}
                <svg
                  aria-hidden="true"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  className="shrink-0"
                >
                  <circle cx="4" cy="4" r="4" fill="#264491" opacity="0.68" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
