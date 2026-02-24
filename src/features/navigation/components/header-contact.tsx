"use client";

import { useLayoutEffect, useRef, useState } from "react";
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

function ContactCtaLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const externalProps = external
    ? { target: "_blank", rel: "noreferrer noopener" }
    : {};

  return (
    <a
      href={href}
      className="group inline-flex items-center justify-between gap-5 rounded-xl border border-black/10 bg-white/60 px-5 py-4 text-[14px] transition-colors hover:bg-white sm:px-6 sm:text-sm"
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
    </a>
  );
}

export function HeaderContact() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const scrollController = useScrollController();

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
          className="inline-flex items-center gap-2.5 text-black/68 justify-self-end"
        >
          <HeaderRoll
            text="Contact"
            className="text-[11px] leading-none font-medium tracking-[0.04em] uppercase sm:text-[12px]"
          />
          <span className="size-2 rounded-full bg-current" aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogContent
        originRef={triggerRef}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          closeRef.current?.focus();
        }}
        className="w-[min(92vw,720px)] max-w-[min(92vw,720px)] overflow-hidden rounded-[26px] border border-black/12 bg-[#f4f4f4]/95 p-6 shadow-[0_34px_70px_-26px_rgba(0,0,0,0.35)] sm:max-w-[min(92vw,720px)] sm:p-10 lg:p-12"
      >
        <div className="flex items-start justify-between gap-8 sm:gap-10">
          <div className="max-w-[56ch]">
            <p className="text-[10px] font-medium tracking-[0.12em] text-black/45 uppercase">
              Contact
            </p>
            <DialogTitle className="mt-4 text-[clamp(24px,5vw,44px)] leading-[0.95] tracking-[-0.03em] text-black/85">
              Let&apos;s work together.
            </DialogTitle>
            <DialogDescription className="mt-5 text-[14px] leading-relaxed text-black/62 sm:text-[15px]">
              {CONTACT_MESSAGE}
            </DialogDescription>
            <InlineCopyLink
              value={CONTACT_EMAIL}
              className="mt-6"
              aria-label="Email contact actions"
            >
              <InlineCopyLinkAnchor hrefPrefix="mailto:" />
              <InlineCopyLinkButton copyAriaLabel="Copy email address" />
            </InlineCopyLink>
          </div>
        </div>

        <div className="mt-10 grid gap-4 text-sm text-black/72 sm:mt-14 sm:grid-cols-2">
          {CONTACT_LINKS.map((link) => (
            <ContactCtaLink
              key={link.label}
              href={link.href}
              label={link.label}
              external={"external" in link && link.external}
            />
          ))}
        </div>
        <DialogClose asChild>
          <button
            ref={closeRef}
            type="button"
            className="absolute right-5 top-5 rounded-full border border-black/14 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.08em] text-black/62 uppercase transition-colors hover:bg-black/5 sm:right-8 sm:top-8"
          >
            Close
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
