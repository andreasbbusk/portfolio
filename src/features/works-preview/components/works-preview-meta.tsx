import { WorksPreviewLink } from "@/features/works-preview/components/works-preview-link";
import type { ProjectMetaProps } from "@/features/works-preview/types";
import { cn } from "@/utils/cn";

export function WorksPreviewMeta({
  ctaLabel,
  description,
  primaryLink,
  secondaryLink,
  stack,
  title,
}: ProjectMetaProps) {
  return (
    <div className={cn("grid content-start gap-0")}>
      <h3 className="mb-6 text-4xl leading-[0.95] tracking-[-0.035em] font-normal text-neutral-950 sm:text-5xl">
        {title}
      </h3>

      <div className="mb-8 max-w-[44ch] text-[15px] leading-relaxed text-[#5f636a] sm:text-base [&>p+p]:mt-4">
        {description}
      </div>

      <p
        className={cn(
          "[font-family:var(--font-dm-mono)] text-[12px] tracking-[0.14em] text-[#7e8087]",
          secondaryLink ? "mb-6" : "mb-8",
        )}
      >
        {stack}
      </p>

      {secondaryLink ? (
        <div className="mb-8">
          <WorksPreviewLink {...secondaryLink} />
        </div>
      ) : null}

      <WorksPreviewLink
        {...primaryLink}
        label={ctaLabel ?? primaryLink.label}
      />
    </div>
  );
}
