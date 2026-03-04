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

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle?: string;
  pullQuote?: string;
  meta: CaseStudyMeta;
  heroImage: CaseStudyImage;
  narrative: CaseStudyNarrativeBlock[];
  secondaryImages?: CaseStudyImage[];
  codeBlocks?: CaseStudyCodeBlock[];
  nextProject?: {
    slug: string;
    title: string;
  };
};
