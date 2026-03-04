"use client";

import Link from "next/link";
import { memo } from "react";
import { HeaderContact } from "@/features/navigation/components/header-contact";
import { HeaderMenu } from "@/features/navigation/components/header-menu";
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
      {/* Bauhaus compound rule — tri-color segments into architectural line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-3 right-3 top-[8px] flex h-[2px] overflow-hidden sm:left-5 sm:right-5 sm:top-[10px]"
      >
        <div className="w-7 bg-[#dd2f20]" />
        <div className="w-7 bg-[#264491]" />
        <div className="w-7 bg-[#D4A72C]" />
        <div className="flex-1 bg-[#09090a]" />
      </div>
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center px-3 pt-2 sm:px-5 sm:pt-3">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 text-black/68 justify-self-start"
        >
          {/* Bauhaus square marker — Kandinsky red */}
          <span
            aria-hidden="true"
            className="size-[7px] shrink-0 bg-[#dd2f20]"
          />
          <HeaderRoll
            text="Andreas Busk Mikkelsen"
            className="font-mono text-[11px] leading-none font-medium tracking-[0.14em] uppercase sm:text-[12px]"
          />
        </Link>
        <HeaderMenu />
        <HeaderContact />
      </div>
    </header>
  );
}

export default memo(Header);
