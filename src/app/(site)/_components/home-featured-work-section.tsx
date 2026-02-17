"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  defineBottomNavSliderMode,
  defineBottomNavZone,
} from "@/features/navigation/config/bottom-nav-zone-definitions";
import { BottomNavZoneSection } from "@/features/navigation/ui/bottom-nav-zone-section";

interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  accentGradientClassName: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "greystone",
    title: "Greystone",
    description:
      "Long-term product design and frontend development partnership across multiple platforms.",
    tags: ["Design System", "Motion", "Frontend"],
    accentGradientClassName: "from-slate-700 to-slate-900",
  },
  {
    id: "digital-commerce",
    title: "Digital Commerce",
    description:
      "Conversion-focused storefront with custom checkout UX and performance-first architecture.",
    tags: ["E-Commerce", "UX", "Performance"],
    accentGradientClassName: "from-blue-600 to-cyan-600",
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    description:
      "Visual system and storytelling framework translated into a cohesive web presence.",
    tags: ["Branding", "Visual Design", "UI"],
    accentGradientClassName: "from-orange-500 to-rose-600",
  },
];

export function HomeFeaturedWork() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = FEATURED_PROJECTS[activeProjectIndex];

  const featuredWorkZone = useMemo(
    () =>
      defineBottomNavZone({
        id: "home-featured-work",
        label: "Featured work",
        sliderMode: defineBottomNavSliderMode({
          title: activeProject.title,
          description: activeProject.description,
          tags: activeProject.tags,
          onPrevious:
            activeProjectIndex > 0
              ? () => setActiveProjectIndex((index) => index - 1)
              : undefined,
          onNext:
            activeProjectIndex < FEATURED_PROJECTS.length - 1
              ? () => setActiveProjectIndex((index) => index + 1)
              : undefined,
        }),
      }),
    [
      activeProject.description,
      activeProject.tags,
      activeProject.title,
      activeProjectIndex,
    ]
  );

  return (
    <BottomNavZoneSection zoneDefinition={featuredWorkZone} className="w-full px-6 md:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className={`rounded-3xl bg-gradient-to-br ${activeProject.accentGradientClassName} p-10 text-white shadow-2xl`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.4, once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
            Featured Work
          </p>
          <h3 className="mb-4 text-4xl font-bold">{activeProject.title}</h3>
          <p className="max-w-2xl text-white/90">{activeProject.description}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {activeProject.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-medium uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </BottomNavZoneSection>
  );
}
