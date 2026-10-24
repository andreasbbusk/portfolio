import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/features/case-study/data";
import { homepageShellClass } from "@/features/styles";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Case studies and selected work focused on scalable frontend architecture and polished user experiences.",
  alternates: {
    canonical: "/works",
  },
};

export default function WorksPage() {
  return (
    <section className="pb-[clamp(84px,9vw,148px)] pt-[clamp(116px,13vw,184px)] [font-family:var(--font-dm-sans)]">
      <div className={homepageShellClass}>
        <div className="mx-auto grid w-full gap-7">
          <header className="grid gap-4">
            <h1 className="text-[clamp(42px,6.4vw,84px)] leading-[0.94] tracking-[-0.045em] font-normal text-ink">
              Works
            </h1>
            <p className="max-w-[52ch] text-[15px] leading-relaxed text-[#5a5448] sm:text-base">
              Case studies with product context, architecture notes, and
              implementation details.
            </p>
          </header>

          <div aria-hidden="true" className="flex h-[2px] items-center">
            <span className="h-full flex-1 bg-ink" />
          </div>

          <div className="mt-5 grid divide-y divide-[#26221b]/12 border-y border-[#26221b]/12">
            {CASE_STUDIES.map((study, index) => (
              <Link
                key={study.slug}
                href={`/works/${study.slug}`}
                className="group grid gap-2 px-1 py-6 transition-colors duration-200 hover:bg-ink/[0.02] sm:px-2 md:gap-3 md:py-7"
              >
                <div className="flex flex-wrap items-end justify-between gap-x-5 gap-y-1">
                  <div className="flex items-end gap-3 sm:gap-4">
                    <span className="[font-family:var(--font-dm-mono)] text-[11px] leading-none tracking-[0.14em] text-[#7b7466] sm:text-[12px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-[clamp(28px,4.6vw,44px)] leading-[0.96] tracking-[-0.035em] font-normal text-ink">
                      {study.title}
                    </h2>
                  </div>
                  <span className="[font-family:var(--font-dm-mono)] text-[11px] tracking-[0.14em] text-[#4a453b] uppercase transition-transform duration-300 group-hover:translate-x-1 sm:text-[12px]">
                    Open
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-[#5a5448] sm:text-base">
                  {study.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
