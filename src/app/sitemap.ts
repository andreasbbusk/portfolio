import type { MetadataRoute } from "next";
import { getSiteUrlString } from "@/config/site-url";

const ROUTES = ["/", "/works"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrlString();
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
