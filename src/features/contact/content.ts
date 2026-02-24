export type ContactLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const CONTACT_EMAIL = "contact@andreasbusk.dk";

export const CONTACT_MESSAGE =
  "If you're working on something interesting and think I'd be a good fit, I'd like to hear about it. I'm currently looking for a frontend internship.";

export const CONTACT_LINKS = [
  { label: "Download CV", href: "/cv.pdf" },
  { label: "LinkedIn", href: "https://linkedin.com", external: true },
  { label: "GitHub", href: "https://github.com", external: true },
  { label: "Candeno", href: "https://candeno.com", external: true },
] as const satisfies readonly ContactLink[];
