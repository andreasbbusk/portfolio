"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { AboutAnimatedLine } from "@/features/about/components/about-animated-line";
import type {
  AboutAccordionBlock,
  AboutBlock,
  AboutEditorialBlock,
} from "@/features/about/blocks";
import { homepageSansFontClass, homepageShellClass } from "@/features/styles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/utils/cn";

type AboutBlockPanelProps = {
  block: AboutBlock;
  blockIndex: number;
  totalBlocks: number;
};

function AboutAccordionBody({ block }: { block: AboutAccordionBlock }) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={`${block.catalogLabel}-0`}
      className="w-full border-b border-black/10"
    >
      {block.items.map((item, lineIndex) => (
        <AccordionItem
          key={`${block.catalogLabel}-${lineIndex}`}
          value={`${block.catalogLabel}-${lineIndex}`}
          className="border-black/10 py-1 sm:py-1.5"
        >
          <AccordionTrigger
            className={cn(
              homepageSansFontClass,
              "rounded-none border-0 bg-transparent px-0 py-5 sm:py-6 text-[clamp(17px,1.35vw,25px)] leading-[1.3] tracking-[-0.01em] text-[#09090a] no-underline hover:no-underline focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent [&>svg]:size-5 [&>svg]:text-black/40",
            )}
          >
            <span className="min-w-0 pr-4">{item.summary}</span>
          </AccordionTrigger>
          <AccordionContent className="pb-6 sm:pb-7">
            <p
              className={cn(
                homepageSansFontClass,
                "max-w-[96ch] pr-8 text-[clamp(16px,1.15vw,20px)] leading-relaxed text-black/62",
              )}
            >
              {item.detail}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function AboutEditorialBody({
  block,
  progress,
  reducedMotion,
  sequenceRevealEnd,
  sequenceRevealStart,
}: {
  block: AboutEditorialBlock;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
  sequenceRevealEnd: number;
  sequenceRevealStart: number;
}) {
  const [visualLineCounts, setVisualLineCounts] = useState<
    Record<number, number>
  >({});
  const lineCounts = block.lines.map((_, lineIndex) =>
    Math.max(1, visualLineCounts[lineIndex] ?? 1),
  );
  const lineOffsets: number[] = [];
  let totalSequenceLines = 0;

  for (const count of lineCounts) {
    lineOffsets.push(totalSequenceLines);
    totalSequenceLines += count;
  }

  const safeTotalSequenceLines = Math.max(1, totalSequenceLines);

  return (
    <div className="grid gap-7 sm:gap-8 md:gap-10">
      {block.lines.map((line, lineIndex) => (
        <AboutAnimatedLine
          key={`${block.catalogLabel}-${lineIndex}`}
          globalLineOffset={lineOffsets[lineIndex] ?? 0}
          progress={progress}
          index={lineIndex}
          onRenderedLineCountChange={(nextIndex, count) => {
            setVisualLineCounts((previous) => {
              if (previous[nextIndex] === count) {
                return previous;
              }

              return { ...previous, [nextIndex]: count };
            });
          }}
          reducedMotion={reducedMotion}
          sequenceRevealStart={sequenceRevealStart}
          sequenceRevealEnd={sequenceRevealEnd}
          text={line}
          totalSequenceLines={safeTotalSequenceLines}
          className={cn(
            homepageSansFontClass,
            "text-[clamp(16px,1.3vw,24px)] leading-relaxed",
          )}
        />
      ))}
    </div>
  );
}

export function AboutBlockPanel({
  block,
  blockIndex,
  totalBlocks,
}: AboutBlockPanelProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end center"],
  });
  const isAccordionBlock = block.kind === "accordion";
  const blockLineCount = isAccordionBlock
    ? block.items.length
    : block.lines.length;
  const sequenceRevealStart = isAccordionBlock ? 0.14 : 0.2;
  const originalSequenceRevealEnd =
    sequenceRevealStart + (blockLineCount - 1) * 0.09 + 0.24;
  const sequenceRevealEnd = isAccordionBlock
    ? Math.min(originalSequenceRevealEnd, 0.64)
    : originalSequenceRevealEnd;

  const blockOpacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.72, 0.9, 1],
    [0.2, 1, 1, 0.28, 0],
  );
  const blockY = useTransform(scrollYProgress, [0, 0.2, 1], [30, 0, -28]);
  const headlineOpacity = useTransform(scrollYProgress, [0.06, 0.2], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.06, 0.2], [20, 0]);
  const catalogOpacity = useTransform(scrollYProgress, [0.14, 0.28], [0, 1]);
  const catalogY = useTransform(scrollYProgress, [0.14, 0.28], [12, 0]);
  const chapterProgress = useTransform(
    scrollYProgress,
    [sequenceRevealStart, sequenceRevealEnd],
    [0, 1],
  );
  const chapterName =
    block.catalogLabel.split("_")[0] ?? block.headline.toUpperCase();
  const chapterIndexLabel = String(blockIndex + 1).padStart(2, "0");
  const chapterTotalLabel = String(totalBlocks).padStart(2, "0");
  const isCenteredEditorialFrame =
    block.kind === "editorial" && block.layout === "centered";
  const contentFrameMinHeightClass = isAccordionBlock
    ? "min-h-[clamp(260px,36vh,420px)]"
    : isCenteredEditorialFrame
      ? "min-h-[clamp(240px,30vh,360px)]"
      : "min-h-[clamp(320px,46vh,560px)]";
  const contentGridAlignClass = isAccordionBlock
    ? "items-start md:items-center"
    : "items-center";
  const copyColumnClass = isAccordionBlock
    ? "w-full max-w-none"
    : isCenteredEditorialFrame
      ? "mx-auto w-full max-w-[88ch] text-left"
      : "w-full max-w-[88ch]";
  const contentFrameClass = isAccordionBlock
    ? "relative overflow-hidden bg-white/55"
    : isCenteredEditorialFrame
      ? "relative mx-1 mt-1 overflow-hidden border border-black/10 bg-white/55 sm:mx-2 sm:mt-2 md:mx-4 md:mt-3 lg:mx-6"
      : "relative overflow-hidden border border-black/10 bg-white/55";
  const contentFrameGridClass = isCenteredEditorialFrame
    ? "grid px-8 py-12 sm:px-12 sm:py-16 md:px-0 md:py-0"
    : "grid px-8 py-10 sm:px-12 sm:py-14 md:px-0 md:py-0";
  const contentInnerWrapClass = isCenteredEditorialFrame
    ? "mx-auto w-full py-4 sm:py-5 md:py-[clamp(56px,8vh,108px)] md:px-[clamp(56px,8vw,132px)] lg:px-[clamp(84px,10vw,180px)]"
    : "py-3 sm:py-4 md:py-[clamp(40px,6vh,72px)] md:px-[clamp(40px,6vw,104px)] lg:px-[clamp(56px,7vw,132px)]";

  return (
    <section ref={sectionRef} className="relative min-h-[38vh]">
      <motion.div
        style={reducedMotion ? undefined : { opacity: blockOpacity, y: blockY }}
        className="sticky top-0 flex min-h-[clamp(520px,78vh,860px)] items-start py-[clamp(24px,3vw,52px)]"
      >
        <div className={homepageShellClass}>
          <div className="mx-auto grid w-full max-w-328 gap-[clamp(10px,1.4vw,16px)] px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="grid gap-4 pb-[clamp(14px,1.6vw,22px)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8">
              <motion.h2
                style={
                  reducedMotion
                    ? undefined
                    : { opacity: headlineOpacity, y: headlineY }
                }
                className={cn(
                  homepageSansFontClass,
                  "max-w-[20ch] text-[clamp(40px,5.5vw,72px)] leading-[0.95] tracking-[-0.03em] font-semibold text-[#09090a]",
                )}
              >
                {block.headline}
              </motion.h2>
              <motion.div
                style={
                  reducedMotion
                    ? undefined
                    : { opacity: catalogOpacity, y: catalogY }
                }
                className="flex items-start gap-2 pt-1 sm:flex-col sm:items-end sm:gap-2.5"
              >
                <p className="[font-family:var(--font-dm-mono)] text-[13px] tracking-[0.14em] text-[#7e8087] sm:text-right sm:text-sm">
                  {chapterIndexLabel} / {chapterTotalLabel} {"\u2014"}{" "}
                  {chapterName}
                </p>
                <span
                  aria-hidden="true"
                  className="relative mt-0.5 h-px w-[46px] shrink-0 bg-black/12 sm:mt-0"
                >
                  <motion.span
                    style={{ scaleX: chapterProgress }}
                    className="absolute inset-0 origin-left bg-[#09090a]/70"
                  />
                </span>
              </motion.div>
            </div>
            <div className={contentFrameClass}>
              <div
                className={cn(
                  contentFrameGridClass,
                  contentFrameMinHeightClass,
                  contentGridAlignClass,
                )}
              >
                <div className={contentInnerWrapClass}>
                  <div className={copyColumnClass}>
                    {block.kind === "accordion" ? (
                      <AboutAccordionBody block={block} />
                    ) : (
                      <AboutEditorialBody
                        block={block}
                        progress={scrollYProgress}
                        reducedMotion={reducedMotion}
                        sequenceRevealStart={sequenceRevealStart}
                        sequenceRevealEnd={sequenceRevealEnd}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
