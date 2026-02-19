const DEFAULT_SITE_URL = "https://andreasbusk.dk/";

function normalizeSiteUrl(siteUrl: string): string {
  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

export function getSiteUrlString(): string {
  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;

  try {
    const parsed = new URL(configuredSiteUrl);
    return normalizeSiteUrl(parsed.toString());
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function getSiteUrl(): URL {
  return new URL(getSiteUrlString());
}
