"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { AboutRevealLine } from "@/features/about/components/about-reveal-line";
import { getRenderedLines } from "@/features/about/lines";
import { cn } from "@/utils/cn";

type AnimatedLineProps = {
  className: string;
  globalLineOffset: number;
  index: number;
  onRenderedLineCountChange: (index: number, count: number) => void;
  reducedMotion: boolean;
  progress: MotionValue<number>;
  sequenceRevealEnd: number;
  sequenceRevealStart: number;
  text: string;
  totalSequenceLines: number;
};

export function AboutAnimatedLine({
  className,
  globalLineOffset,
  index,
  onRenderedLineCountChange,
  progress,
  reducedMotion,
  sequenceRevealEnd,
  sequenceRevealStart,
  text,
  totalSequenceLines,
}: AnimatedLineProps) {
  const revealDuration = sequenceRevealEnd - sequenceRevealStart;
  const singleRevealStart =
    sequenceRevealStart +
    (revealDuration * globalLineOffset) / totalSequenceLines;
  const singleRevealEnd =
    sequenceRevealStart +
    (revealDuration * (globalLineOffset + 1)) / totalSequenceLines;
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [renderedLines, setRenderedLines] = useState<string[] | null>(null);
  const singleRevealPercent = useTransform(
    progress,
    [singleRevealStart, singleRevealEnd],
    [0, 100],
  );
  const singleClipPath = useTransform(
    singleRevealPercent,
    (value) => `inset(0 ${100 - value}% 0 0)`,
  );

  useEffect(() => {
    if (reducedMotion) {
      onRenderedLineCountChange(index, 1);
      return;
    }

    const measureNode = measureRef.current;

    if (!measureNode) {
      return;
    }

    const measure = () => {
      const nextLines = getRenderedLines(measureNode, text);
      onRenderedLineCountChange(index, nextLines.length);

      setRenderedLines((previousLines) => {
        if (
          previousLines &&
          previousLines.length === nextLines.length &&
          previousLines.every(
            (line, lineIndex) => line === nextLines[lineIndex],
          )
        ) {
          return previousLines;
        }

        return nextLines;
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(measureNode);

    const fontReady = document.fonts?.ready;
    if (fontReady) {
      void fontReady.then(measure);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [index, onRenderedLineCountChange, reducedMotion, text]);

  if (reducedMotion) {
    return <p className={cn(className, "text-[#09090a]")}>{text}</p>;
  }

  const splitLines =
    renderedLines && renderedLines.length > 1 ? renderedLines : null;
  const hasLineSplit = splitLines !== null;

  return (
    <p className={cn(className, "relative")}>
      <span className="sr-only">{text}</span>
      <span ref={measureRef} aria-hidden="true" className="invisible block">
        {text}
      </span>
      {hasLineSplit ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 block"
        >
          {splitLines.map((renderedLine, lineIndex) => {
            const lineStart =
              sequenceRevealStart +
              (revealDuration * (globalLineOffset + lineIndex)) /
                totalSequenceLines;
            const lineEnd =
              sequenceRevealStart +
              (revealDuration * (globalLineOffset + lineIndex + 1)) /
                totalSequenceLines;

            return (
              <AboutRevealLine
                key={`${lineIndex}-${renderedLine}`}
                className={className}
                progress={progress}
                revealStart={lineStart}
                revealEnd={lineEnd}
                text={renderedLine}
              />
            );
          })}
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 block"
        >
          <span className={cn(className, "relative block")}>
            <span className="block text-[#bcc0c6]">{text}</span>
            <motion.span
              style={{ clipPath: singleClipPath }}
              className="absolute inset-0 block text-[#09090a]"
            >
              {text}
            </motion.span>
          </span>
        </span>
      )}
    </p>
  );
}
