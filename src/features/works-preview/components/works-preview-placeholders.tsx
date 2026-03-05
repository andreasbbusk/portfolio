import Link from "next/link";
import { Pointer } from "@/components/ui/pointer";
import { Safari } from "@/components/ui/safari";
import { cn } from "@/utils/cn";

export function SafariPlaceholderFrame({
  className,
  href,
  imageSrc,
  url,
}: {
  className?: string;
  href?: string;
  imageSrc?: string;
  url: string;
}) {
  const safariFrame = (
    <>
      <Safari
        url={url}
        imageSrc={imageSrc}
        className="relative z-10 block w-full transition-shadow duration-500 hover:shadow-[0_26px_86px_-48px_rgba(9,9,10,0.36)]"
      />
      {href ? (
        <Pointer style={{ marginLeft: 16, marginTop: 16 }}>
          <span className="inline-flex size-[clamp(74px,6.2vw,92px)] items-center justify-center rounded-full bg-white text-[clamp(12px,1vw,15px)] font-medium leading-none tracking-[0.01em] text-[#09090a] shadow-[0_24px_70px_-40px_rgba(9,9,10,0.55)]">
            Explore
          </span>
        </Pointer>
      ) : null}
    </>
  );

  return (
    <div className={cn("relative", className)}>
      {href ? (
        <Link href={href} aria-label="Open case study">
          {safariFrame}
        </Link>
      ) : (
        safariFrame
      )}
    </div>
  );
}
