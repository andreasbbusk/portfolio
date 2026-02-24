import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface WorksPreviewLinkProps {
  external?: boolean;
  href: string;
  label: string;
}

export function WorksPreviewLink({
  external,
  href,
  label,
}: WorksPreviewLinkProps) {
  const Icon = external ? ArrowUpRight : ArrowRight;

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group/link inline-flex items-center gap-2 [font-family:var(--font-dm-mono)] text-[12px] tracking-[0.14em] text-neutral-900"
    >
      <span className="relative">
        {label}
        <span className="absolute inset-x-0 bottom-[-0.4rem] h-px origin-left scale-x-0 bg-neutral-900 transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
      </span>
      <Icon aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={2} />
    </Link>
  );
}
