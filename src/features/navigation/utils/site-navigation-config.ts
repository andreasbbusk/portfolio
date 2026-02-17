export interface NavigationItem {
  href: string;
  label: string;
  external?: boolean;
}

export interface SiteNavigationConfig {
  primary: NavigationItem[];
  secondary: NavigationItem[];
}

export const SITE_NAVIGATION_CONFIG: SiteNavigationConfig = {
  // Main navigation - visible on desktop (≥768px)
  primary: [
    { href: "/works", label: "Works" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],

  // Secondary navigation - mobile menu only
  secondary: [
    { href: "/blog", label: "Blog" },
    { href: "/resume.pdf", label: "Resume", external: true },
    { href: "https://github.com", label: "GitHub", external: true },
    { href: "https://linkedin.com", label: "LinkedIn", external: true },
  ],
};
