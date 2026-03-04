import type { ProjectMetaProps } from "@/features/works-preview/types";

export type WorksPreviewFeature = {
  mediaClassName?: string;
  meta: ProjectMetaProps;
  metaClassName?: string;
  previewImageAlt: string;
  previewImageSrc: string;
  url: string;
};

export type WorksPreviewPortfolioFeature = {
  body: string;
  href: string;
  label: string;
  stack: string;
  title: string;
  url: string;
};

export const VERTO_WORK: WorksPreviewFeature = {
  url: "verto-zeta.vercel.app",
  previewImageSrc: "/images/works/verto-1.webp",
  previewImageAlt:
    "Verto study session preview with flashcard interface and keyboard-first controls",
  meta: {
    title: "Verto",
    description:
      "A flashcard learning platform with a public marketing site and authenticated app: creation and editing flows, bulk import, reordering, and a study session built for keyboard navigation.",
    stack: "Next.js · TypeScript · Supabase · TanStack · Tailwind",
    primaryLink: { href: "/works/verto", label: "Read Case Study" },
  },
};

export const RANK_TRACKER_WORK: WorksPreviewFeature = {
  url: "rank-tracker-flax.vercel.app",
  previewImageSrc: "/images/works/rank-tracker-1.webp",
  previewImageAlt:
    "Rank Tracker dashboard preview with performance scorecards and trend graph",
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
    stack: "Next.js · TypeScript · MongoDB · TanStack Table · Recharts",
    secondaryLink: {
      href: "http://hub.conversio.dk",
      label: "hub.conversio.dk",
      external: true,
    },
    primaryLink: { href: "/works/rank-tracker", label: "Read Case Study" },
  },
};

export const GOLDILOX_WORK: WorksPreviewFeature = {
  url: "",
  previewImageSrc: "/images/works/goldilox-1.webp",
  previewImageAlt:
    "Goldilox Paradox Earth chapter preview with atmospheric glow and starfield",
  meta: {
    title: "Goldilox Paradox",
    description:
      "A single-page WebGL scrollytelling experience about planetary habitability. Ray-traced planets via custom GLSL shaders, scroll-driven chapters, no backend.",
    stack: "Astro · Three.js · GLSL · SCSS",
    primaryLink: { href: "/works/goldilox-paradox", label: "Read Case Study" },
  },
};

export const VEJLE_WORK: WorksPreviewFeature = {
  url: "",
  previewImageSrc: "/images/works/vmh-1.webp",
  previewImageAlt:
    "Vejle mod hudcancer homepage preview with hero, statistics, and event section",
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
    stack: "Next.js · Sanity · Tailwind · Framer Motion",
    primaryLink: {
      href: "/works/vejle-mod-hudcancer",
      label: "Read Case Study",
    },
  },
};

export const PORTFOLIO_WORK: WorksPreviewPortfolioFeature = {
  url: "portfolio.andreas.dev",
  title: "Portfolio",
  body: "My personal portfolio-in-progress, focused on interaction systems: nav behavior, loader flow, and smooth-scroll foundations.",
  stack: "Next.js · TypeScript · Motion · GSAP · Tailwind",
  href: "https://github.com/andreasbbusk",
  label: "View Source",
};
