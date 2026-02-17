"use client";

import { useEffect, useRef, useState } from "react";

interface UseMeasuredContentHeightOptions {
  isActive: boolean;
  contentKey: string;
}

export function useMeasuredContentHeight({
  isActive,
  contentKey,
}: UseMeasuredContentHeightOptions) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    if (!isActive || !contentRef.current) {
      return;
    }

    const node = contentRef.current;
    const updateHeight = () => {
      setMeasuredHeight(node.scrollHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isActive, contentKey]);

  return {
    contentRef,
    measuredHeight,
  };
}
