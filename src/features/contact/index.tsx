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
export function ContactFooterSection() {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <footer
      id="contact-footer"
      className="mt-[clamp(48px,10vw,128px)] bg-white text-[#09090a]"
    >
      <div className="flex min-h-screen flex-col">
        <div
          className={cn(
            homepageShellClass,
            "flex flex-1 flex-col pt-8 sm:pt-10 md:pt-12",
          )}
        >
          <div className="flex flex-1 items-center justify-center py-12 sm:py-16 md:py-20">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 50 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto flex w-full max-w-[1120px] flex-col items-center text-center"
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

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-auto"
        >
          <div className="relative px-3 pb-3 pt-4 sm:h-[48px] sm:px-5 sm:pb-4 sm:pt-0">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[8px] left-3 right-3 h-px bg-black sm:bottom-[10px] sm:left-5 sm:right-5"
            />
            <div
              className={cn(
                homepageSansFontClass,
                "relative grid gap-3 pb-4 text-[11px] leading-none font-medium uppercase tracking-[0.04em] text-black/68 sm:h-full sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:pb-0 sm:text-[12px]",
              )}
            >
              <div className="inline-flex flex-wrap items-center gap-2.5 justify-self-start">
                <span
                  className="size-2 rounded-full bg-current"
                  aria-hidden="true"
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
                            className="text-black/45 tracking-normal"
                          >
                            ,
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
                <span
                  className="size-2 rounded-full bg-current"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
