import type { ProjectMetaProps } from "@/features/works-preview/types";
import type { PlaceholderVariant } from "@/features/works-preview/types";

export type WorksPreviewFeature = {
  mediaClassName?: string;
  meta: ProjectMetaProps;
  metaClassName?: string;
  url: string;
  variant: PlaceholderVariant;
};

export type WorksPreviewPortfolioFeature = {
  body: string;
  href: string;
  label: string;
  stack: string;
  title: string;
  url: string;
  variant: PlaceholderVariant;
};

export const VERTO_WORK: WorksPreviewFeature = {
  url: "verto.app",
  variant: "verto",
  meta: {
    title: "Verto",
    description:
      "A flashcard learning platform with a public marketing site and authenticated app: creation and editing flows, bulk import, reordering, and a study session built for keyboard navigation.",
    stack: "Next.js · TypeScript · Supabase · TanStack · Tailwind",
    primaryLink: { href: "/works/verto", label: "Read Case Study" },
  },
};

export const RANK_TRACKER_WORK: WorksPreviewFeature = {
  url: "conversio-hub.com",
  variant: "rank-tracker",
  mediaClassName: "lg:mt-16",
  metaClassName: "lg:mt-12",
  meta: {
    title: (
      <>
        <span className="block">Rank Tracker</span>
        <span className="mt-2 block text-[0.54em] leading-[1.02] tracking-[-0.02em] text-[#5f636a]">
          (Conversio Hub)
        </span>
      </>
    ),
    description: (
      <>
        <p>
          The SEO operations tool inside Conversio Hub. I built the first
          version during my internship at Conversio, laying the groundwork for
          the operator UI: dense tables, filtering, and in depth analysis.
        </p>
        <p>
          The hub.conversio.dk link shows Conversio&apos;s current production
          version, which the team has continued to evolve beyond the v1 I built.
          For my own development and testing, I used mock data. Conversio&apos;s
          production data and infrastructure setup is different.
        </p>
      </>
    ),
    stack: "Next.js · React · TypeScript · TanStack",
    secondaryLink: {
      href: "http://hub.conversio.dk",
      label: "hub.conversio.dk",
      external: true,
    },
    primaryLink: { href: "/works/rank-tracker", label: "Read Case Study" },
  },
};

export const GOLDILOX_WORK: WorksPreviewFeature = {
  url: "goldilox-paradox.dev",
  variant: "goldilox",
  meta: {
    title: "Goldilox Paradox",
    description:
      "A one-page WebGL scrollytelling experience about Earth, Venus, and Mars. Scroll-driven chapters, shader-driven visuals, no backend.",
    stack: "Astro · Three.js · GLSL · GSAP",
    primaryLink: { href: "/works/goldilox-paradox", label: "Read Case Study" },
  },
};

export const VEJLE_WORK: WorksPreviewFeature = {
  url: "vejlemodhudcancer.dk",
  variant: "vejle",
  meta: {
    title: (
      <>
        Vejle mod hudcancer{" "}
        <span className="text-[0.5em] italic text-[#7e8087]">
          (in progress)
        </span>
      </>
    ),
    description:
      "Website for the Danish non-profit Vejle mod hudcancer with CMS-driven project and gallery content. Dynamic pages and a motion layer that stays readable.",
    stack: "Next.js · Sanity · Tailwind · Motion",
    primaryLink: {
      href: "/works/vejle-mod-hudcancer",
      label: "Read Case Study",
    },
  },
};

export const PORTFOLIO_WORK: WorksPreviewPortfolioFeature = {
  url: "portfolio.andreas.dev",
  variant: "portfolio",
  title: "Portfolio",
  body: "My personal portfolio-in-progress, focused on interaction systems: nav behavior, loader flow, and smooth-scroll foundations.",
  stack: "Next.js · TypeScript · Motion · Tailwind",
  href: "https://github.com/andreasmikkelsen/portfolio",
  label: "View Source",
};
