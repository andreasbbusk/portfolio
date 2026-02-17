"use client";

import { memo } from "react";
import Link from "next/link";
import { Logo } from "@/shared/icons/logo";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { useScrollDirection } from "@/features/navigation/hooks/use-scroll-direction";

function SiteHeader() {
  const isVisible = useScrollDirection({ threshold: 100, delta: 5 });

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-40
        py-4 px-8 w-full
        bg-background/95 backdrop-blur-md
        border-b border-foreground/10
        transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Go to home page"
          className="transition-opacity hover:opacity-70"
        >
          <Logo className="h-10 w-10 text-foreground" />
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}

export default memo(SiteHeader);
