import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCaseStudyBySlug,
  getAllCaseStudySlugs,
  getPreviousProject,
} from "@/features/case-study/data";
import {
  CaseStudyHero,
  CaseStudyHeroImage,
  CaseStudyLiveDemo,
  CaseStudyNarrative,
  CaseStudyVisuals,
  CaseStudyProjectNav,
  CaseStudyProgress,
} from "@/features/case-study";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Not Found" };
  }

  return {
    title: study.title,
    description: `Case study: ${study.title}${study.subtitle ? ` — ${study.subtitle}` : ""}. ${study.meta.role}, ${study.meta.year}.`,
    alternates: {
      canonical: `/works/${study.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const previousProject = getPreviousProject(study.slug);

  return (
    <article className="text-[#09090a] [font-family:var(--font-dm-sans)]">
      {/* Fixed reading progress bar */}
      <CaseStudyProgress />

      {/* 1. The Specification Sheet */}
      <CaseStudyHero
        title={study.title}
        subtitle={study.subtitle}
        meta={study.meta}
      />

      {/* 2. Hero media: live demo (if configured) or static hero image */}
      {study.liveDemo ? (
        <CaseStudyLiveDemo demo={study.liveDemo} />
      ) : (
        <CaseStudyHeroImage image={study.heroImage} bleed="right" />
      )}

      {/* 3. The Narrative Content: Structured Columns */}
      <CaseStudyNarrative blocks={study.narrative} />

      {/* 5. Visual Presentation & Code Blocks */}
      <CaseStudyVisuals
        images={study.secondaryImages}
        codeBlocks={study.codeBlocks}
      />

      {/* Bauhaus end mark — Kandinsky's three forms */}
      <div
        aria-hidden="true"
        className="flex items-center justify-center gap-4 py-12"
      >
        <svg width="8" height="7" viewBox="0 0 8 7">
          <polygon points="4,0 8,7 0,7" fill="#D4A72C" opacity="0.3" />
        </svg>
        <svg width="7" height="7" viewBox="0 0 7 7">
          <rect width="7" height="7" fill="#dd2f20" opacity="0.3" />
        </svg>
        <svg width="8" height="8" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="4" fill="#264491" opacity="0.3" />
        </svg>
      </div>

      {/* 6. The Project Footer: Dual Navigation */}
      <CaseStudyProjectNav
        previousProject={previousProject}
        nextProject={study.nextProject}
      />
    </article>
  );
}
