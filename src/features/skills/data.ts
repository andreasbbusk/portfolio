export type SkillEntry = {
  name: string;
  tooltip: string;
};

export type SkillRow = {
  label: string;
  skills: SkillEntry[];
};

export const SKILL_CATALOG: SkillRow[] = [
  {
    label: "CORE FRONTEND",
    skills: [
      {
        name: "TypeScript",
        tooltip:
          "A typed layer on top of JavaScript that catches errors earlier and makes larger codebases easier to maintain.",
      },
      {
        name: "JavaScript",
        tooltip:
          "The foundational language of the web, essential for understanding how frameworks actually work under the hood.",
      },
      {
        name: "React",
        tooltip:
          "A component-driven UI library that forces you to think about state and declarative rendering.",
      },
      {
        name: "Next.js",
        tooltip:
          "A React framework that handles routing, server-side rendering, and performance out of the box.",
      },
      {
        name: "Astro",
        tooltip:
          "A framework optimized for content-heavy sites, shipping zero JavaScript by default for maximum speed.",
      },
    ],
  },
  {
    label: "UI & STYLING",
    skills: [
      {
        name: "Tailwind CSS",
        tooltip:
          "A utility-first CSS framework that keeps styling tightly coupled to markup without leaving the HTML.",
      },
      {
        name: "Radix UI",
        tooltip:
          "Unstyled, accessible component primitives that handle complex ARIA logic so I can focus on design.",
      },
      {
        name: "Motion",
        tooltip:
          "A declarative animation library for building smooth, physics-based transitions that feel natural.",
      },
      {
        name: "Accessibility",
        tooltip:
          "Ensuring interfaces are navigable and readable for everyone, not just a compliance checklist.",
      },
    ],
  },
  {
    label: "DATA & STATE",
    skills: [
      {
        name: "TanStack Query",
        tooltip:
          "Powerful asynchronous state management for caching, synchronizing, and updating server state in React.",
      },
      {
        name: "Zustand",
        tooltip:
          "A small, fast, and scalable bearbones state-management solution for complex local UI states.",
      },
      {
        name: "PostgreSQL",
        tooltip:
          "A robust relational database for when data needs strict structure and complex querying.",
      },
      {
        name: "NoSQL",
        tooltip:
          "Document-oriented databases for flexible, rapid iteration on unstructured or changing data models.",
      },
      {
        name: "REST",
        tooltip:
          "Designing and consuming predictable, stateless APIs to connect the frontend to backend services.",
      },
    ],
  },
  {
    label: "TESTING & TOOLING",
    skills: [
      {
        name: "Vitest",
        tooltip:
          "A blazing fast unit testing framework to ensure individual functions and components work as expected.",
      },
      {
        name: "Playwright",
        tooltip:
          "End-to-end testing that simulates real user interactions across different browsers to catch integration bugs.",
      },
      {
        name: "Git",
        tooltip:
          "Version control that allows for safe iteration, branching, and collaboration.",
      },
      {
        name: "GitHub Actions",
        tooltip:
          "Automating workflows like running tests on every pull request before code hits production.",
      },
      {
        name: "Vercel",
        tooltip:
          "A seamless deployment platform that optimizes frontend infrastructure automatically.",
      },
    ],
  },
  {
    label: "DESIGN & SYSTEMS",
    skills: [
      {
        name: "Figma",
        tooltip:
          "The collaborative interface design tool where visual intent is shaped before translating it into code.",
      },
      {
        name: "Design systems",
        tooltip:
          "Creating reusable, systematic patterns and tokens that ensure visual consistency at scale.",
      },
    ],
  },
  {
    label: "CREATIVE",
    skills: [
      {
        name: "Three.js",
        tooltip:
          "A 3D library that makes WebGL accessible for building immersive, interactive environments in the browser.",
      },
      {
        name: "GLSL",
        tooltip:
          "Writing custom shaders directly for the GPU to create high-performance visual effects.",
      },
      {
        name: "GSAP",
        tooltip:
          "The industry standard for robust, timeline-based sequencing and complex web animations.",
      },
    ],
  },
];
