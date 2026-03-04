export type HeroLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const heroCopy = {
  headline:
    "I'm Andreas, a frontend developer working at the overlap between design and engineering.",
  subheadlineLines: [
    "I build interfaces that feel calm and intentional.",
    "Especially the data-heavy kind: dashboards, integrations, and workflows where real state and edge cases matter.",
  ],
  ctas: [
    { label: "Download CV", href: "/cv.pdf" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/andreas-busk-mikkelsen",
      external: true,
    },
  ] satisfies HeroLink[],
};
