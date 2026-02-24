import type { MetadataRoute } from "next";
import { getSiteUrlString } from "@/config/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrlString();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
