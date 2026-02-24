"use client";

import Link from "next/link";
import { memo } from "react";
import { HeaderContact } from "@/features/navigation/components/header-contact";
import { HeaderRoll } from "@/features/navigation/components/header-roll";
import { useScrollDirection } from "@/features/navigation/use-scroll-direction";

function Header() {
  const isVisible = useScrollDirection({ threshold: 100, delta: 5 });

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-40
        h-[48px] w-full
        border-0 bg-transparent
        transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-3 right-3 top-[8px] h-px bg-black sm:left-5 sm:right-5 sm:top-[10px]"
      />
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center px-3 pt-2 sm:px-5 sm:pt-3">
        <Link
          href="/"
          aria-label="Go to home page"
          className="group inline-flex items-center gap-2.5 text-black/68 justify-self-start"
        >
          <span className="size-2 rounded-full bg-current" aria-hidden="true" />
          <HeaderRoll
            text="Andreas Busk Mikkelsen"
            className="text-[11px] leading-none font-medium tracking-[0.04em] uppercase sm:text-[12px]"
          />
        </Link>
        <Link
          href="#menu"
          className="inline-flex items-center justify-center text-black/68 justify-self-center"
        >
          <HeaderRoll
            text="Menu"
            className="text-[11px] leading-none font-medium tracking-[0.04em] uppercase sm:text-[12px]"
          />
        </Link>
        <HeaderContact />
      </div>
    </header>
  );
}

export default memo(Header);
