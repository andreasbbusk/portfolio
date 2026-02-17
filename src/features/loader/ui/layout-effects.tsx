"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SmoothScroll } from "@/features/loader/ui/smooth-scroll";

const PageLoader = dynamic(
  () =>
    import("@/features/loader/ui/page-loader").then(
      (module) => module.PageLoader
    ),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-[100] bg-background" aria-hidden="true" />
    ),
  }
);

interface LayoutEffectsProps {
  initialShowLoader: boolean;
}

export function LayoutEffects({ initialShowLoader }: LayoutEffectsProps) {
  const [showLoader, setShowLoader] = useState(initialShowLoader);

  useEffect(() => {
    if (!showLoader) {
      document.documentElement.classList.remove("page-loading");
    }
  }, [showLoader]);

  const handleLoadingComplete = () => {
    setShowLoader(false);
    document.documentElement.classList.remove("page-loading");
  };

  return (
    <>
      <SmoothScroll disabled={showLoader} />
      {showLoader && <PageLoader onComplete={handleLoadingComplete} />}
    </>
  );
}
