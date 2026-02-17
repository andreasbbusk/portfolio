import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import AppProviders from "@/app/providers";
import SiteHeader from "@/features/navigation/ui/site-header";
import { BackToTop } from "@/shared/ui/back-to-top";
import { BottomNav } from "@/features/navigation/ui/bottom-nav";
import {
  BottomNavViewportController,
} from "@/features/navigation/ui/bottom-nav-viewport-controller";
import { LayoutEffects } from "@/features/loader/ui/layout-effects";
import {
  LOADER_COOKIE,
  shouldShowLoader,
} from "@/features/loader/utils/page-loader-storage";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cookies } from "next/headers";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio description",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialShowLoader = shouldShowLoader(
    cookieStore.get(LOADER_COOKIE)?.value,
  );

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} antialiased${
        initialShowLoader ? " page-loading" : ""
      }`}
    >
      <body>
        <AppProviders>
          <LayoutEffects initialShowLoader={initialShowLoader} />
          <BottomNavViewportController />
          <div className="page-content">
            <SiteHeader />
            <main>{children}</main>
            <BackToTop />
            <BottomNav />
          </div>
          <SpeedInsights />
        </AppProviders>
      </body>
    </html>
  );
}
