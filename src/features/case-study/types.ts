export type CaseStudyMeta = {
  role: string;
  stack: string;
  year: string;
  liveUrl?: string;
  liveLabel?: string;
  sourceUrl?: string;
  sourceLabel?: string;
};

export type CaseStudyNarrativeBlock = {
  number: string;
  heading: string;
  body: string;
};

export type CaseStudyCodeBlock = {
  language: string;
  filename?: string;
  code: string;
};

export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Backing card color: "white" | "gray" */
  backing?: "white" | "gray";
};

export type CaseStudyLiveDemo = {
  embedUrl: string;
  launchUrl: string;
  title: string;
  posterImage: {
    src: string;
    alt: string;
  };
  aspectRatio: "16/10" | "16/9" | "4/3";
  timeoutMs?: number;
  ctaLabel?: string;
  fallbackLabel?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle?: string;
  pullQuote?: string;
  meta: CaseStudyMeta;
  heroImage: CaseStudyImage;
  narrative: CaseStudyNarrativeBlock[];
  liveDemo?: CaseStudyLiveDemo;
  secondaryImages?: CaseStudyImage[];
  codeBlocks?: CaseStudyCodeBlock[];
  nextProject?: {
    slug: string;
    title: string;
  };
};
