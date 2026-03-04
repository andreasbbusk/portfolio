"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useScrollController } from "@/features/loader/scroll-controller";
import { CASE_STUDIES } from "@/features/case-study/data";
import { CONTACT_LINKS } from "@/features/contact/content";
import { HeaderRoll } from "@/features/navigation/components/header-roll";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/*  Navigation data                                                    */
/* ------------------------------------------------------------------ */

type NavItem = {
  number: string;
  label: string;
  href: string;
  subtitle?: string;
};

const NAV_ITEMS: NavItem[] = [
  { number: "01", label: "Home", href: "/" },
  ...CASE_STUDIES.map((cs, i) => ({
    number: String(i + 2).padStart(2, "0"),
    label: cs.title,
    href: `/works/${cs.slug}`,
    subtitle: cs.subtitle,
  })),
];

/* ------------------------------------------------------------------ */
/*  Animation constants                                                */
/* ------------------------------------------------------------------ */

/** Strong ease-out for content reveals */
const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** Symmetric ease-in-out for the curtain */
const EASE_POWER: [number, number, number, number] = [0.76, 0, 0.24, 1];

const curtainVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.85, ease: EASE_POWER },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.6, ease: EASE_POWER },
  },
};

const curtainVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/* ------------------------------------------------------------------ */
/*  Scroll-lock helpers                                                */
/* ------------------------------------------------------------------ */

function applyScrollLock(scrollController: { stop: () => void }) {
  document.documentElement.classList.add("overflow-hidden");
  document.body.classList.add("overflow-hidden");
  document.documentElement.dataset.menuOpen = "";
  scrollController.stop();
}

function removeScrollLock(scrollController: { start: () => void }) {
  document.documentElement.classList.remove("overflow-hidden");
  document.body.classList.remove("overflow-hidden");
  delete document.documentElement.dataset.menuOpen;
  scrollController.start();
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const scrollController = useScrollController();
  const prefersReducedMotion = useReducedMotion();

  /** Tracks whether we hold the scroll lock (survives across renders). */
  const isLockedRef = useRef(false);
  /** If set, we navigate to this href after the exit animation finishes. */
  const pendingHrefRef = useRef<string | null>(null);

  /* ---- Apply scroll lock when opening ---- */
  useLayoutEffect(() => {
    if (isOpen && !isLockedRef.current) {
      applyScrollLock(scrollController);
      isLockedRef.current = true;
    }
    // NOTE: We intentionally do NOT unlock here when isOpen becomes false.
    // Unlocking is deferred to handleExitComplete so the lock persists
    // through the entire exit animation.
  }, [isOpen, scrollController]);

  /* ---- Safety: unlock on unmount ---- */
  useEffect(() => {
    return () => {
      if (isLockedRef.current) {
        removeScrollLock(scrollController);
        isLockedRef.current = false;
      }
    };
  }, [scrollController]);

  /* ---- Close on external route change (e.g. browser back) ---- */
  useEffect(() => {
    // If the route changed but the menu is still open (browser back/forward),
    // close it. Don't set a pending href — navigation already happened.
    setIsOpen(false);
  }, [pathname]);

  /* ---- Focus management ---- */
  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => closeRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
    triggerRef.current?.focus();
  }, [isOpen]);

  /* ---- Escape key ---- */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* ---- Focus trap ---- */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const el = menuRef.current;
      if (!el) return;

      const focusable = el.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  /* ---- Handlers ---- */

  /** Close without navigating (close button, escape key). */
  const handleClose = useCallback(() => {
    pendingHrefRef.current = null;
    setIsOpen(false);
  }, []);

  /** Nav link clicked — store target, close menu, navigate after exit. */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      // If already on this page, just close the menu.
      if (href === pathname) {
        handleClose();
        return;
      }
      pendingHrefRef.current = href;
      setIsOpen(false);
    },
    [pathname, handleClose],
  );

  /** Called by AnimatePresence when exit animation finishes. */
  const handleExitComplete = useCallback(() => {
    // Unlock scroll now that the curtain has fully retracted.
    if (isLockedRef.current) {
      removeScrollLock(scrollController);
      isLockedRef.current = false;
    }

    // Navigate if a link was clicked.
    const href = pendingHrefRef.current;
    if (href) {
      pendingHrefRef.current = null;
      router.push(href);
    }
  }, [scrollController, router]);

  const isActive = useCallback((href: string) => pathname === href, [pathname]);

  return (
    <>
      {/* Trigger — matches original header Menu styling exactly */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-controls="site-navigation-dialog"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="inline-flex items-center justify-center text-black/68 justify-self-center"
      >
        <HeaderRoll
          text="Menu"
          className="font-mono text-[11px] leading-none font-medium tracking-[0.14em] uppercase sm:text-[12px]"
        />
      </button>

      {/* Portal — escapes header's transform context */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence onExitComplete={handleExitComplete}>
            {isOpen && (
              <motion.div
                ref={menuRef}
                id="site-navigation-dialog"
                key="menu-overlay"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F3] font-sans outline-none"
                variants={
                  prefersReducedMotion
                    ? curtainVariantsReduced
                    : curtainVariants
                }
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* ──────────────────────────────────────────────── */}
                {/*  Header bar — mirrors site header layout        */}
                {/* ──────────────────────────────────────────────── */}
                <div className="relative h-[48px] w-full shrink-0 px-3 pt-2 sm:px-5 sm:pt-3">
                  {/* Bauhaus compound rule — draws in from left */}
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 right-3 top-[8px] flex h-[2px] overflow-hidden sm:left-5 sm:right-5 sm:top-[10px]"
                    initial={prefersReducedMotion ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15,
                      ease: EASE_EXPO,
                    }}
                    style={{ transformOrigin: "left" }}
                  >
                    <div className="w-7 bg-[#dd2f20]" />
                    <div className="w-7 bg-[#264491]" />
                    <div className="w-7 bg-[#D4A72C]" />
                    <div className="flex-1 bg-[#09090a]" />
                  </motion.div>

                  <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center">
                    {/* Left — label with Bauhaus square marker */}
                    <motion.span
                      className="inline-flex items-center gap-2.5 text-black/68 justify-self-start"
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, x: -8 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3,
                        ease: EASE_EXPO,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="size-[7px] shrink-0 bg-[#dd2f20]"
                      />
                      <span className="font-mono text-[11px] leading-none font-medium tracking-[0.14em] uppercase sm:text-[12px]">
                        Navigation
                      </span>
                    </motion.span>

                    {/* Center — page count */}
                    <motion.span
                      className="font-mono text-[11px] leading-none font-medium tracking-[0.14em] uppercase text-black/30 justify-self-center sm:text-[12px]"
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5,
                        ease: EASE_EXPO,
                      }}
                    >
                      <span className="tracking-[0.06em]">
                        {NAV_ITEMS.length}
                      </span>{" "}
                      Pages
                    </motion.span>

                    {/* Right — close button with Bauhaus circle marker */}
                    <motion.div
                      className="justify-self-end"
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, x: 8 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3,
                        ease: EASE_EXPO,
                      }}
                    >
                      <button
                        ref={closeRef}
                        type="button"
                        onClick={handleClose}
                        aria-label="Close site navigation"
                        className="inline-flex items-center gap-2.5 text-black/68 transition-colors duration-200 hover:text-black"
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
                      </button>
                    </motion.div>
                  </div>
                </div>

                {/* ──────────────────────────────────────────────── */}
                {/*  Navigation list                                */}
                {/* ──────────────────────────────────────────────── */}
                <div className="flex flex-1 overflow-y-auto px-6 md:px-12">
                  <div className="my-auto w-full py-10 md:py-16">
                    <nav
                      className="mx-auto w-full max-w-[1680px]"
                      aria-label="Main navigation"
                    >
                      <ul>
                        {NAV_ITEMS.map((item, i) => (
                          <motion.li
                            key={item.href}
                            initial={
                              prefersReducedMotion
                                ? false
                                : { opacity: 0, y: 50 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: prefersReducedMotion ? 0 : 0.3 + i * 0.065,
                              ease: EASE_EXPO,
                            }}
                          >
                            <Link
                              href={item.href}
                              onClick={(e) => handleNavClick(e, item.href)}
                              className={cn(
                                "group relative flex items-center gap-3 py-[clamp(6px,1.1vh,14px)] transition-colors duration-300 sm:gap-4 md:gap-5",
                                isActive(item.href)
                                  ? "text-[#dd2f20]"
                                  : "text-[#09090a] hover:text-[#dd2f20]",
                              )}
                            >
                              {/* Number */}
                              <span
                                className={cn(
                                  "w-[2.2em] shrink-0 text-right font-mono text-[clamp(10px,0.85vw,13px)] leading-none tracking-[0.06em] transition-colors duration-300",
                                  isActive(item.href)
                                    ? "text-[#dd2f20]/50"
                                    : "text-black/25 group-hover:text-[#dd2f20]/50",
                                )}
                              >
                                {item.number}
                              </span>

                              {/* Divider line — extends on hover */}
                              <span
                                className="relative h-px w-5 shrink-0 overflow-hidden sm:w-7 md:w-9"
                                aria-hidden="true"
                              >
                                <span
                                  className={cn(
                                    "absolute inset-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                    isActive(item.href)
                                      ? "scale-x-100 bg-[#dd2f20]/30"
                                      : "scale-x-0 bg-black/20 group-hover:scale-x-100 group-hover:bg-[#dd2f20]/30",
                                  )}
                                />
                              </span>

                              {/* Title */}
                              <span
                                className={cn(
                                  "text-[clamp(26px,5.2vw,68px)] font-semibold leading-[1.12] tracking-[-0.035em]",
                                  "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                  "group-hover:translate-x-2",
                                )}
                              >
                                {item.label}
                              </span>

                              {/* Subtitle — visible on desktop, fades in on hover */}
                              {item.subtitle && (
                                <span
                                  className={cn(
                                    "ml-1 hidden self-end pb-[0.3em] text-[clamp(11px,1vw,15px)] tracking-[-0.005em] lg:inline",
                                    "transition-opacity duration-300",
                                    isActive(item.href)
                                      ? "text-[#dd2f20]/35"
                                      : "text-[#7e8087] opacity-0 group-hover:opacity-100",
                                  )}
                                >
                                  {item.subtitle}
                                </span>
                              )}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>

                {/* ──────────────────────────────────────────────── */}
                {/*  Footer bar — mirrors contact footer bottom     */}
                {/* ──────────────────────────────────────────────── */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: prefersReducedMotion ? 0 : 0.55,
                    ease: EASE_EXPO,
                  }}
                  className="relative shrink-0 px-3 pb-3 pt-4 sm:h-[48px] sm:px-5 sm:pb-4 sm:pt-0"
                >
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

                  <div className="relative grid gap-3 pb-4 font-mono text-[11px] leading-none font-medium uppercase tracking-[0.14em] text-black/68 sm:h-full sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:pb-0 sm:text-[12px]">
                    {/* External links */}
                    <div className="inline-flex flex-wrap items-center gap-2.5 justify-self-start">
                      {/* Bauhaus square marker — Kandinsky red */}
                      <span
                        aria-hidden="true"
                        className="size-[7px] shrink-0 bg-[#dd2f20]"
                      />
                      <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
                        {CONTACT_LINKS.map((link, index) => {
                          const isExternal =
                            "external" in link && link.external;
                          return (
                            <span
                              key={link.label}
                              className="inline-flex items-center"
                            >
                              <a
                                href={link.href}
                                target={isExternal ? "_blank" : undefined}
                                rel={
                                  isExternal ? "noopener noreferrer" : undefined
                                }
                                className="transition-colors duration-200 hover:text-black"
                              >
                                {link.label}
                              </a>
                              {index < CONTACT_LINKS.length - 1 && (
                                <span
                                  aria-hidden="true"
                                  className="ml-2 text-[#09090a]/25"
                                >
                                  /
                                </span>
                              )}
                            </span>
                          );
                        })}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="inline-flex items-center gap-2.5 justify-self-start sm:justify-self-end">
                      <p className="text-left sm:text-right">
                        Aarhus, DK {"\u2014"} 2026
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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
