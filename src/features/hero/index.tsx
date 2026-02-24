import Link from "next/link";
import { heroCopy } from "@/features/hero/copy";
import {
  homepageEyebrowClass,
  homepageSansFontClass,
  homepagePrimaryButtonClass,
  homepageSecondaryButtonClass,
  homepageSectionClass,
  homepageShellClass,
} from "@/features/styles";
import { cn } from "@/utils/cn";

export function HeroSection() {
  return (
    <section
      className={cn(
        homepageSectionClass,
        "pt-[clamp(72px,8.5vw,136px)] pb-[calc(132px+env(safe-area-inset-bottom))] md:pb-[clamp(88px,10vw,160px)]",
      )}
    >
      <div className={homepageShellClass}>
        <div className="grid gap-[clamp(26px,2.9vw,46px)]">
          <p className={homepageEyebrowClass}>Web Developer Portfolio</p>
          <h1
            className={cn(
              homepageSansFontClass,
              "text-balance text-[clamp(32px,6.1vw,72px)] leading-[1.04] tracking-[-0.033em] font-semibold",
            )}
          >
            {heroCopy.headline}
          </h1>
          {heroCopy.subheadlineLines.length > 0 ? (
            <p
              className={cn(
                homepageSansFontClass,
                "text-[clamp(16px,2vw,32px)] leading-[1.08] tracking-[-0.02em]",
              )}
            >
              {heroCopy.subheadlineLines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </p>
          ) : null}
        </div>
        <div className="mt-[clamp(38px,4.8vw,72px)] flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {heroCopy.ctas.map((cta, index) => (
              <Link
                key={cta.label}
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noreferrer noopener" : undefined}
                className={cn(
                  index === 0
                    ? homepagePrimaryButtonClass
                    : homepageSecondaryButtonClass,
                  "h-[46px] min-w-[102px] rounded-xl px-5 text-[0.98rem] font-medium md:h-[50px] md:px-6",
                )}
              >
                {cta.label}
              </Link>
            ))}
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span
              className="size-2 rounded-full bg-current"
              aria-hidden="true"
            />
            <span aria-hidden="true" className="h-px flex-1 bg-current/25" />
          </div>
        </div>
      </div>
    </section>
  );
}
