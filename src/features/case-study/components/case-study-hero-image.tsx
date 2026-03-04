"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { CaseStudyImage } from "@/features/case-study/types";
import { BLUR_DATA_URL } from "@/utils/image-placeholder";

type CaseStudyHeroImageProps = {
  image: CaseStudyImage;
  /** Which side the geometric container bleeds toward */
  bleed?: "left" | "right";
};

/**
 * The Hero Image Anchor
 *
 * Primary project image with a subtle parallax scroll effect.
 */
export function CaseStudyHeroImage({
  image,
  bleed = "right",
}: CaseStudyHeroImageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      ref={sectionRef}
      className="relative px-6 pb-[clamp(64px,8vw,128px)] md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-sm bg-white">
          <motion.div
            className="absolute -top-5 right-0 -bottom-5 left-0"
            style={
              prefersReducedMotion ? undefined : { y: imageY }
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 92vw, 1400px"
              className="object-cover object-[0%_20px]"
            />
          </motion.div>
        </div>
        {image.caption && (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-[#7e8087]">
            {image.caption}
          </p>
        )}
      </div>
    </section>
  );
}
