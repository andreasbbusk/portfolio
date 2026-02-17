export const LOADER_COOKIE = "portfolio.page-loader.seen";
const LOADER_COOKIE_VALUE = "v1";
const LOADER_COOKIE_MAX_AGE = 60 * 60 * 24;

export function shouldShowLoader(cookieValue: string | undefined): boolean {
  return cookieValue !== LOADER_COOKIE_VALUE;
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
