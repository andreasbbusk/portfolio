"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_LINKS,
  CONTACT_MESSAGE,
} from "@/features/contact/content";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InlineCopyLink,
  InlineCopyLinkAnchor,
  InlineCopyLinkButton,
} from "@/components/ui/inline-copy-link";
import { HeaderRoll } from "@/features/navigation/components/header-roll";
import { useScrollController } from "@/features/loader/scroll-controller";

/* ------------------------------------------------------------------ */
/*  Animation constants                                                */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/*  CTA link card                                                      */
/* ------------------------------------------------------------------ */

function ContactCtaLink({
  href,
  label,
  external = false,
  index,
  reducedMotion,
}: {
  href: string;
  label: string;
  external?: boolean;
  index: number;
  reducedMotion: boolean;
}) {
  const externalProps = external
    ? { target: "_blank", rel: "noreferrer noopener" }
    : {};

  return (
    <motion.a
      href={href}
      className="group inline-flex items-center justify-between gap-5 rounded-xl border border-black/10 bg-white/60 px-5 py-4 text-[14px] transition-colors hover:border-black/18 hover:bg-white sm:px-6 sm:text-sm"
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: reducedMotion ? 0 : 0.35 + index * 0.06,
        ease: EASE,
      }}
      {...externalProps}
    >
      <span>{label}</span>
      <span className="relative inline-flex size-4 shrink-0 overflow-hidden text-black/70">
        <ArrowRight
          className="absolute inset-0 size-4 translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:translate-x-[150%] motion-safe:group-focus-visible:translate-x-[150%] motion-reduce:transition-none"
          aria-hidden="true"
        />
        <ArrowUpRight
          className="absolute inset-0 size-4 -translate-x-[150%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:translate-x-0 motion-safe:group-focus-visible:translate-x-0 motion-reduce:hidden"
          aria-hidden="true"
        />
      </span>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function HeaderContact() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const scrollController = useScrollController();
  const prefersReducedMotion = Boolean(useReducedMotion());

  useLayoutEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
      scrollController.stop();
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
      scrollController.start();
    }

    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
      scrollController.start();
    };
  }, [isOpen, scrollController]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          aria-controls="contact-dialog"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className="inline-flex items-center gap-2.5 text-black/68 justify-self-end"
        >
          <HeaderRoll
            text="Contact"
            className="font-mono text-[11px] leading-none font-medium tracking-[0.14em] uppercase sm:text-[12px]"
          />
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
        </button>
      </DialogTrigger>
      <DialogContent
        id="contact-dialog"
        originRef={triggerRef}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          closeRef.current?.focus();
        }}
        className="w-[min(92vw,720px)] max-w-[min(92vw,720px)] overflow-hidden rounded-[26px] border border-black/12 bg-[#f4f4f4]/95 p-0 shadow-[0_34px_70px_-26px_rgba(0,0,0,0.35)] sm:max-w-[min(92vw,720px)]"
      >
        {/* ──────────────────────────────────────────────── */}
        {/*  Header bar — Bauhaus compound rule + close      */}
        {/* ──────────────────────────────────────────────── */}
        <div className="relative px-6 pt-5 sm:px-10 sm:pt-8 lg:px-12 lg:pt-10">
          {/* Bauhaus compound rule — tri-color segments into architectural line */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-6 right-6 top-5 flex h-[2px] overflow-hidden sm:left-10 sm:right-10 sm:top-8 lg:left-12 lg:right-12 lg:top-10"
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: EASE,
                }}
                style={{ transformOrigin: "left" }}
              >
                <div className="w-7 bg-[#dd2f20]" />
                <div className="w-7 bg-[#264491]" />
                <div className="w-7 bg-[#D4A72C]" />
                <div className="flex-1 bg-[#09090a]" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between pt-4">
            {/* Section label with Bauhaus square marker */}
            <motion.span
              className="inline-flex items-center gap-2.5"
              initial={
                prefersReducedMotion ? false : { opacity: 0, x: -8 }
              }
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: EASE,
              }}
            >
              {/* Bauhaus square marker — Kandinsky red */}
              <span
                aria-hidden="true"
                className="size-[7px] shrink-0 bg-[#dd2f20]"
              />
              <span className="font-mono text-[10px] leading-none font-medium tracking-[0.12em] text-black/45 uppercase sm:text-[11px]">
                Contact
              </span>
            </motion.span>

            {/* Close button — matches menu overlay's HeaderRoll + circle marker style */}
            <DialogClose asChild>
              <motion.button
                ref={closeRef}
                type="button"
                className="inline-flex items-center gap-2.5 text-black/62 transition-colors duration-200 hover:text-black"
                initial={
                  prefersReducedMotion ? false : { opacity: 0, x: 8 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: EASE,
                }}
              >
                <HeaderRoll
                  text="Close"
                  className="font-mono text-[11px] leading-none font-medium tracking-[0.14em] uppercase sm:text-[12px]"
                />
                <svg
                  aria-hidden="true"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  className="shrink-0"
                >
                  <circle cx="4" cy="4" r="4" fill="#264491" opacity="0.68" />
                </svg>
              </motion.button>
            </DialogClose>
          </div>
        </div>

        {/* ──────────────────────────────────────────────── */}
        {/*  Content                                         */}
        {/* ──────────────────────────────────────────────── */}
        <div className="px-6 pt-6 sm:px-10 sm:pt-8 lg:px-12 lg:pt-10">
          <div className="max-w-[56ch]">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : 0.15,
                ease: EASE,
              }}
            >
              <DialogTitle className="text-[clamp(24px,5vw,44px)] leading-[0.95] tracking-[-0.03em] text-black/85">
                Let&apos;s work together.
              </DialogTitle>
            </motion.div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: prefersReducedMotion ? 0 : 0.22,
                ease: EASE,
              }}
            >
              <DialogDescription className="mt-5 text-[14px] leading-relaxed text-black/62 sm:text-[15px]">
                {CONTACT_MESSAGE}
              </DialogDescription>
            </motion.div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : 0.28,
                ease: EASE,
              }}
            >
              <InlineCopyLink
                value={CONTACT_EMAIL}
                className="mt-6"
                aria-label="Email contact actions"
              >
                <InlineCopyLinkAnchor hrefPrefix="mailto:" />
                <InlineCopyLinkButton copyAriaLabel="Copy email address" />
              </InlineCopyLink>
            </motion.div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────── */}
        {/*  CTA links grid                                  */}
        {/* ──────────────────────────────────────────────── */}
        <div className="mt-10 grid gap-4 px-6 text-sm text-black/72 sm:mt-14 sm:grid-cols-2 sm:px-10 lg:px-12">
          {CONTACT_LINKS.map((link, index) => (
            <ContactCtaLink
              key={link.label}
              href={link.href}
              label={link.label}
              external={"external" in link && link.external}
              index={index}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* ──────────────────────────────────────────────── */}
        {/*  Footer — Kandinsky end marks + compound rule    */}
        {/* ──────────────────────────────────────────────── */}
        <motion.div
          className="relative mt-10 sm:mt-14"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: prefersReducedMotion ? 0 : 0.5,
            ease: EASE,
          }}
        >
          {/* Kandinsky end marks */}
          <div
            aria-hidden="true"
            className="flex items-center justify-center gap-4 pb-4"
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

          {/* Bauhaus compound rule — bottom */}
          <div className="relative px-6 pb-5 sm:px-10 sm:pb-8 lg:px-12 lg:pb-10">
            <div
              aria-hidden="true"
              className="pointer-events-none flex h-[2px] overflow-hidden"
            >
              <div className="w-7 bg-[#dd2f20]" />
              <div className="w-7 bg-[#264491]" />
              <div className="w-7 bg-[#D4A72C]" />
              <div className="flex-1 bg-[#09090a]" />
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
