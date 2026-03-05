import { SafariPlaceholderFrame } from "@/features/works-preview/components/works-preview-placeholders";
import { WorksPreviewLink } from "@/features/works-preview/components/works-preview-link";
import { WorksPreviewMeta } from "@/features/works-preview/components/works-preview-meta";
import type {
  WorksPreviewFeature,
  WorksPreviewPortfolioFeature,
} from "@/features/works-preview/data";
import { cn } from "@/utils/cn";

export function WorksPreviewMediaFirstRow({
  feature,
}: {
  feature: WorksPreviewFeature;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.78fr)_minmax(320px,0.9fr)] lg:items-center lg:gap-16">
      <SafariPlaceholderFrame
        href={feature.meta.primaryLink.href}
        imageSrc={feature.previewImageSrc}
        url={feature.url}
      />

      <div className={cn("lg:self-center", feature.metaClassName)}>
        <WorksPreviewMeta {...feature.meta} />
      </div>
    </div>
  );
}

export function WorksPreviewMetaFirstRow({
  feature,
}: {
  feature: WorksPreviewFeature;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.45fr)] lg:items-center lg:gap-16">
      <div className={feature.metaClassName}>
        <WorksPreviewMeta {...feature.meta} />
      </div>

      <SafariPlaceholderFrame
        className={feature.mediaClassName}
        href={feature.meta.primaryLink.href}
        imageSrc={feature.previewImageSrc}
        url={feature.url}
      />
    </div>
  );
}

export function WorksPreviewStackedColumnFeature({
  feature,
  className,
}: {
  feature: WorksPreviewFeature;
  className?: string;
}) {
  return (
    <div className={cn("grid content-start gap-7", className)}>
      <SafariPlaceholderFrame
        className={feature.mediaClassName}
        href={feature.meta.primaryLink.href}
        imageSrc={feature.previewImageSrc}
        url={feature.url}
      />

      <div className={feature.metaClassName}>
        <WorksPreviewMeta {...feature.meta} />
      </div>
    </div>
  );
}

export function WorksPreviewPortfolioCard({
  feature,
}: {
  feature: WorksPreviewPortfolioFeature;
}) {
  return (
    <div className="mx-auto w-full max-w-[980px] lg:w-[60%] lg:max-w-none">
      <div className="grid gap-8">
        <SafariPlaceholderFrame url={feature.url} />

        <div className="mx-auto grid max-w-[56ch] justify-items-center gap-4 text-center">
          <h3 className="text-3xl leading-[0.95] tracking-[-0.035em] font-normal text-neutral-950 sm:text-4xl">
            {feature.title}
          </h3>

          <p className="text-[15px] leading-relaxed text-[#5f636a] sm:text-base">
            {feature.body}
          </p>

          <p className="[font-family:var(--font-dm-mono)] text-[12px] tracking-[0.14em] text-[#7e8087]">
            {feature.stack}
          </p>

          <WorksPreviewLink
            external
            href={feature.href}
            label={feature.label}
          />
        </div>
      </div>
    </div>
  );
}
