"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SmoothScroll } from "@/features/loader/scroll";

const PageLoader = dynamic(
  () =>
    import("@/features/loader/loader").then(
      (module) => module.PageLoader,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-100 bg-background" aria-hidden="true" />
    ),
  },
);

type LayoutEffectsProps = {
  initialShowLoader: boolean;
};

export function LayoutEffects({ initialShowLoader }: LayoutEffectsProps) {
  const [showLoader, setShowLoader] = useState(initialShowLoader);

  useEffect(() => {
    if (showLoader === false) {
      document.documentElement.classList.remove("page-loading");
    }
  }, [showLoader]);

  const handleLoadingComplete = () => {
    setShowLoader(false);
    document.documentElement.classList.remove("page-loading");
  };

  return (
    <>
      <SmoothScroll disabled={showLoader !== false} />
      {showLoader && <PageLoader onComplete={handleLoadingComplete} />}
    </>
  );
}
