"use client";

import { ABOUT_BLOCKS } from "@/features/about/blocks";
import { AboutBlockPanel } from "@/features/about/components/about-block";

export function AboutSection() {
  return (
    <section className="bg-transparent">
      {ABOUT_BLOCKS.map((block, blockIndex) => (
        <AboutBlockPanel
          key={block.catalogLabel}
          block={block}
          blockIndex={blockIndex}
          totalBlocks={ABOUT_BLOCKS.length}
        />
      ))}
    </section>
  );
}
