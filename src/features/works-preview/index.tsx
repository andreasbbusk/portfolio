import { homepageShellClass } from "@/features/styles";
import {
  WorksPreviewMediaFirstRow,
  WorksPreviewMetaFirstRow,
  WorksPreviewPortfolioCard,
  WorksPreviewStackedColumnFeature,
} from "@/features/works-preview/components/works-preview-layouts";
import {
  GOLDILOX_WORK,
  PORTFOLIO_WORK,
  RANK_TRACKER_WORK,
  VERTO_WORK,
  VEJLE_WORK,
} from "@/features/works-preview/data";

export function SelectedWorksSection() {
  return (
    <section
      id="selected-works"
      aria-labelledby="selected-works-title"
      className="[font-family:var(--font-dm-sans)] py-[clamp(84px,11vw,188px)]"
    >
      <div className={homepageShellClass}>
        <div className="mx-auto grid w-full gap-8 ">
          <header className="grid gap-4">
            <h2
              id="selected-works-title"
              className="text-[clamp(42px,6.6vw,84px)] leading-[0.94] tracking-[-0.045em] font-normal text-neutral-950"
            >
              Selected Works
            </h2>
            <p className="max-w-[56ch] text-[15px] leading-relaxed text-[#5f636a] sm:text-base">
              A few projects I&apos;ve enjoyed building. Mostly frontend-heavy,
              with the data and API work that makes them feel complete.
            </p>
          </header>

          <div className="mt-6 grid gap-y-32 md:mt-10 md:gap-y-40 lg:gap-y-56">
            <WorksPreviewMediaFirstRow feature={VERTO_WORK} />

            <WorksPreviewMetaFirstRow feature={RANK_TRACKER_WORK} />

            <div className="grid gap-14 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
              <WorksPreviewStackedColumnFeature feature={GOLDILOX_WORK} />
              <WorksPreviewStackedColumnFeature
                feature={VEJLE_WORK}
                className="mt-0 lg:mt-32"
              />
            </div>

            <WorksPreviewPortfolioCard feature={PORTFOLIO_WORK} />
          </div>
        </div>
      </div>
    </section>
  );
}
