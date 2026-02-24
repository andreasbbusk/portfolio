import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import SiteHeader from "@/features/navigation/header";
import { BackToTop } from "@/components/ui/back-to-top";
import { LayoutEffects } from "@/features/loader/effects";
import { ScrollControllerProvider } from "@/features/loader/scroll-controller";
import { PageTransition } from "@/features/loader/transition";
import { LOADER_COOKIE, shouldShowLoader } from "@/features/loader/storage";
import { getSiteUrl } from "@/config/site-url";
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

const siteName = "Andreas Busk Mikkelsen";
const siteUrl = getSiteUrl();
const defaultDescription =
  "Web Developer specializing in modern React architecture and polished user experiences.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `Portfolio | ${siteName}`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_DK",
    siteName,
    url: "/",
    title: `Portfolio | ${siteName}`,
    description: defaultDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteName} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Portfolio | ${siteName}`,
    description: defaultDescription,
    images: ["/opengraph-image"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Intentional dynamic rendering: this request cookie controls loader behavior
  // to prevent FOUC and keep first-visit transitions deterministic.
  const cookieStore = await cookies();
  const initialShowLoader = shouldShowLoader(
    cookieStore.get(LOADER_COOKIE)?.value,
  );

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${dmMono.variable} antialiased${initialShowLoader ? " page-loading" : ""}`}
    >
      <body>
        <ScrollControllerProvider>
          <LayoutEffects initialShowLoader={initialShowLoader} />
          <div className="page-content">
            <SiteHeader />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            <BackToTop />
          </div>
        </ScrollControllerProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
