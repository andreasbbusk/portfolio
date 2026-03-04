export const LOADER_COOKIE = "portfolio.page-loader.seen";
const LOADER_COOKIE_VALUE = "v1";
const LOADER_COOKIE_MAX_AGE = 60 * 60 * 24;

export function shouldShowLoader(
  cookieValue: string | null | undefined,
): boolean {
  return cookieValue !== LOADER_COOKIE_VALUE;
}

export function getLoaderCookieValue(cookieString: string): string | undefined {
  const cookiePrefix = `${LOADER_COOKIE}=`;
  const segments = cookieString.split(";");

  for (const rawSegment of segments) {
    const segment = rawSegment.trim();
    if (!segment.startsWith(cookiePrefix)) continue;
    return segment.slice(cookiePrefix.length);
  }

  return undefined;
}

export function shouldShowLoaderFromCookieString(cookieString: string): boolean {
  return shouldShowLoader(getLoaderCookieValue(cookieString));
}

export function markLoaderSeen(): void {
  if (typeof document === "undefined") {
    return;
  }

  const isSecure =
    typeof window !== "undefined" && window.location.protocol === "https:";

  const cookie = [
    `${LOADER_COOKIE}=${LOADER_COOKIE_VALUE}`,
    `Max-Age=${LOADER_COOKIE_MAX_AGE}`,
    "Path=/",
    "SameSite=Lax",
    isSecure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  document.cookie = cookie;
}
