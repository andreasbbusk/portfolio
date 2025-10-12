import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import { ClientLayout } from "@/modules/components/layout/client-layout";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${dmSans.variable} ${dmMono.variable} antialiased page-loading`}
    >
      <head>
        {/*
          Blocking script to prevent FOUC (Flash of Unstyled Content)
          Sets a CSS custom property based on sessionStorage.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var hasSeenLoader = sessionStorage.getItem('portfolio-loader-seen');
                if (hasSeenLoader) {
                  document.documentElement.style.setProperty('--loader-seen', 'visible');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ClientLayout>
          {children}
          <SpeedInsights />
        </ClientLayout>
      </body>
    </html>
  );
}
