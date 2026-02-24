import type { Metadata } from "next";
import { AboutSection } from "@/features/about";
import { ContactFooterSection } from "@/features/contact";
import { HeroSection } from "@/features/hero";
import { SelectedWorksSection } from "@/features/works-preview";
import { SkillsSection } from "@/features/skills";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Frontend projects, architecture decisions, and interaction design built with modern React and Next.js.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div
      id="top"
      className="pt-[84px] text-[#09090a] [font-family:var(--font-dm-sans)]"
    >
      <HeroSection />
      <SelectedWorksSection />
      <AboutSection />
      <SkillsSection />
      <ContactFooterSection />
    </div>
  );
}
