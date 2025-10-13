export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

export interface NavConfig {
  primary: NavItem[];  
  secondary: NavItem[]; 
}

export const NAV_CONFIG: NavConfig = {
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
