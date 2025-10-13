"use client";

import { ReactNode, useEffect, useState } from "react";
import Header from "@/modules/components/ui/header";
import { PageLoader } from "@/modules/components/ui/page-loader";
import { BackToTop } from "@/modules/components/ui/back-to-top";
import { SmoothScroll } from "@/modules/components/layout/smooth-scroll";
import Providers from "@/app/providers";

interface ClientLayoutProps {
  children: ReactNode;
}

/**
 * ClientLayout
 *
 * Client-side wrapper for the application layout.
 * Clean, simple approach to FOUC prevention:
 * - CSS controls visibility via custom property
 * - React just decides whether to show loader
 * - No DOM manipulation needed
 */
export function ClientLayout({ children }: ClientLayoutProps) {
  const [showLoader, setShowLoader] = useState(() => {
    // Check on mount if loader should show
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem('portfolio-loader-seen');
  });

  useEffect(() => {
    if (!showLoader) {
      // User has seen loader - remove loading class to show content
      document.documentElement.classList.remove('page-loading');
    }
  }, [showLoader]);

  const handleLoadingComplete = () => {
    setShowLoader(false);
    document.documentElement.classList.remove('page-loading');
  };

  return (
    <Providers>
      <SmoothScroll disabled={showLoader} />
      {showLoader && <PageLoader onComplete={handleLoadingComplete} />}
      <div className="page-content">
        <Header />
        <main>
          {children}
        </main>
        <BackToTop />
      </div>
    </Providers>
  );
}
