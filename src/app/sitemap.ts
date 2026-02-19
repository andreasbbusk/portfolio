import type { MetadataRoute } from "next";
import { getSiteUrlString } from "@/shared/config/site-url";

const ROUTES = ["/", "/about", "/works", "/contact"] as const;

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
