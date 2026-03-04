import type { ReactNode } from "react";

export type ProjectLink = {
  external?: boolean;
  href: string;
  label: string;
};

export type ProjectMetaProps = {
  ctaLabel?: string;
  description: ReactNode;
  primaryLink: ProjectLink;
  secondaryLink?: ProjectLink;
  stack: string;
  title: ReactNode;
};
