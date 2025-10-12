"use client";

import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/modules/components/svg";

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Header() {
  const pathname = usePathname();

  return (
    <header className="absolute py-4 px-8">
      <nav aria-label="Main navigation">
        <ul className="flex gap-6 list-none items-center">
          <li className="text-foreground">
            <Logo className="h-10 w-10" />
          </li>

          {NAV_ITEMS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={isActive ? "font-bold underline" : ""}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default memo(Header);
