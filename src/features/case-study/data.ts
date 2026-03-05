import type { CaseStudy } from "@/features/case-study/types";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "verto",
    title: "Verto",
    subtitle: "Flashcard learning platform",
    pullQuote:
      "Every interaction had to feel like typing in a document, not filling out a form.",
    meta: {
      role: "Full-Stack Developer",
      stack: "Next.js 16, TypeScript, Supabase, TanStack Query, Zustand, Tailwind CSS v4, dnd-kit",
      year: "2025",
      liveUrl: "https://verto-zeta.vercel.app",
      liveLabel: "verto-zeta.vercel.app",
    },
    heroImage: {
      src: "/images/works/verto-thumbnail.svg",
      alt: "Verto branded thumbnail with logo and yellow background",
    },
    liveDemo: {
      embedUrl: "https://verto-zeta.vercel.app/demo/embed",
      launchUrl: "https://verto-zeta.vercel.app",
      title: "Verto live demo",
      posterImage: {
        src: "/images/works/verto-thumbnail.svg",
        alt: "Verto branded thumbnail with logo and yellow background",
      },
      aspectRatio: "16/9",
      timeoutMs: 8000,
      ctaLabel: "Play Live Demo",
      fallbackLabel: "Open in New Tab",
    },
    narrative: [
      {
        number: "01",
        heading: "The Constraint",
        body: "Flashcard tools tend to bury creation behind menus and limit you to one card at a time. The goal was to make creation as fluid as the study flow itself. Every interaction had to feel like typing in a document, not filling out a form — and the study mode had to work entirely from the keyboard.",
      },
      {
        number: "02",
        heading: "The Architecture",
        body: "The app is split into three route groups: a public marketing site, an auth flow with email/password and Google OAuth via Supabase, and an authenticated dashboard shell. All data mutations go through Next.js server actions — no API routes except the OAuth callback. TanStack React Query handles the client cache with server-side prefetching via HydrationBoundary on every dashboard page, and Zustand persisted stores track study progress and card order in localStorage. Flashcard data lives in Supabase PostgreSQL with row-level security scoped by user, and a performance JSONB column stores spaced repetition metadata per card.",
      },
      {
        number: "03",
        heading: "The Interface",
        body: "Study mode is a full-screen immersive view with 3D CSS flip animations. Navigation is keyboard-first: spacebar to flip, arrow keys to advance, and a starred-only filter to focus on difficult cards. Drag-and-drop reordering via dnd-kit uses optimistic updates so the list never flickers during a move. JSON bulk import validates and previews cards before committing. A global command palette accessible via Cmd+K provides fast set navigation, and the collapsible sidebar prefetches set data on hover for instant transitions.",
      },
    ],
    secondaryImages: [
      {
        src: "/images/works/verto-2.webp",
        alt: "Verto flashcard editor with keyboard navigation and bulk import",
        backing: "white",
      },
      {
        src: "/images/works/verto-3.webp",
        alt: "Verto study session with 3D card flip and progress tracking",
        backing: "gray",
      },
    ],
    codeBlocks: [
      {
        language: "typescript",
        filename: "study-progress.store.ts",
        code: `// Zustand persisted store — study progress survives refresh
export const useStudyProgressStore = create<StudyProgressState>()(
  persist(
    (set) => ({
      sessions: {},
      saveProgress: (setId, index, starred) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [setId]: { currentIndex: index, starredOnly: starred },
          },
        })),
      clearProgress: (setId) =>
        set((state) => {
          const { [setId]: _, ...rest } = state.sessions;
          return { sessions: rest };
        }),
    }),
    { name: "verto-study-progress" },
  ),
);`,
      },
    ],
    nextProject: {
      slug: "rank-tracker",
      title: "Rank Tracker",
    },
  },
  {
    slug: "rank-tracker",
    title: "Rank Tracker",
    subtitle: "Conversio Hub",
    pullQuote:
      "A dense, operator-grade interface handling thousands of keywords — with every filter composable into a single pipeline.",
    meta: {
      role: "Frontend Developer (Intern)",
      stack: "Next.js 15, TypeScript, MongoDB, Mongoose, TanStack Table, Zustand, Recharts, Tailwind CSS",
      year: "2024\u20132025",
      liveUrl: "https://rank-tracker-flax.vercel.app",
      liveLabel: "rank-tracker-flax.vercel.app",
      sourceUrl: "https://hub.conversio.dk",
      sourceLabel: "hub.conversio.dk",
    },
    heroImage: {
      src: "/images/works/rank-tracker-thumbnail.svg",
      alt: "Rank Tracker branded thumbnail with logo and blue background",
    },
    narrative: [
      {
        number: "01",
        heading: "The Constraint",
        body: "The first version was built during my internship at Conversio, laying the groundwork for the operator UI. After the internship I rebuilt the project as a standalone portfolio piece with its own data layer. The challenge: create a dense, operator-grade interface that handles thousands of keywords across multiple domains, with inline charts, composable filters, and a modular report builder — all backed by a multi-tenant sandbox so every visitor gets an isolated demo session with seeded data.",
      },
      {
        number: "02",
        heading: "The Architecture",
        body: "MongoDB stores domains, keywords, tags, notes, and reports. The multi-tenant isolation uses an overlay model: a shared immutable seed tenant provides baseline data, and each visitor gets a per-session overlay with copy-on-write semantics and tombstone-based deletions. All mutations go through server actions into a service layer backed by Mongoose models. A daily Vercel cron job prunes expired tenant overlays. The keyword table uses TanStack Table with virtualized rendering, column pinning, and composable filter predicates — position range, country, tags, keyword search — that can combine into a single pipeline. Three Zustand stores handle optimistic UI mutations for keywords, reports, and the main tracker state.",
      },
      {
        number: "03",
        heading: "The Interface",
        body: "The domain view shows keyword counts, average position, clicks, impressions, and top-ranking keywords with date-range comparison. Per-keyword rows include sparkline position charts via Recharts, daily stats with current versus previous period deltas, and expandable detail with landing pages, search volume, and notes. The dashboard aggregates eight scorecards with trend indicators and position, click, and impression graphs over selectable time ranges. The report builder lets operators compose modular content blocks — text, scorecards, graphs, metrics, highlights, top keywords, conclusions — with drag-and-drop reordering via dnd-kit and resizable block widths from full to quarter. Content gap intelligence surfaces optimization opportunities, new content gaps, and CTR improvements from Google Search Console data.",
      },
    ],
    secondaryImages: [
      {
        src: "/images/works/rank-tracker-2.webp",
        alt: "Dense keyword ranking table with inline sparklines and composable filters",
        backing: "gray",
      },
      {
        src: "/images/works/rank-tracker-3.webp",
        alt: "Report builder with drag-and-drop content blocks and resizable widths",
        backing: "white",
      },
    ],
    nextProject: {
      slug: "goldilox-paradox",
      title: "Goldilox Paradox",
    },
  },
  {
    slug: "goldilox-paradox",
    title: "Goldilox Paradox",
    subtitle: "WebGL scrollytelling experience",
    pullQuote:
      "The scroll position is the narrative cursor. No clicks, no menus, no pagination.",
    meta: {
      role: "Designer & Developer",
      stack: "Astro 5, Three.js, GLSL (ES 3.0), SCSS",
      year: "2025\u20132026",
    },
    heroImage: {
      src: "/images/works/goldilox-1.webp",
      alt: "Goldilox Paradox showing the ray-traced Earth with cloud layers and city lights",
    },
    narrative: [
      {
        number: "01",
        heading: "The Constraint",
        body: "Tell the story of planetary habitability — why Earth sits in the Goldilocks Zone while Venus burned and Mars froze — using scroll as the only input device. No clicks, no menus, no pagination. The scroll position is the narrative cursor. A 460-line Master Design Document defined the emotional arc (curiosity, dread, wonder, melancholy, humility), the canonical script, pacing controls, and scientific accuracy guardrails sourced from NASA mission data.",
      },
      {
        number: "02",
        heading: "The Architecture",
        body: "Astro serves a single static HTML page. The rendering pipeline uses Three.js as a thin WebGL2 wrapper — not its scene graph. An orthographic camera renders a fullscreen quad, and all planet geometry is computed entirely inside the fragment shaders via ray-sphere intersection. Scene switching is uniform-driven: when the user scrolls into a new chapter, the renderer swaps the fragment shader and uniform set, then disposes and recreates the material. A hand-rolled scrollytelling engine uses IntersectionObserver for chapter detection and requestAnimationFrame for scroll-position-mapped animations with custom easing functions. Hash-based navigation supports deep-linking to individual chapters.",
      },
      {
        number: "03",
        heading: "The Shaders",
        body: "Two GLSL ES 3.0 fragment shaders handle all planet rendering. The Earth shader composites five texture layers — daytime albedo, nightside city lights emission-mapped by sun angle, cloud cover with density control, specular ocean highlights via Phong reflectance, and a bump map that perturbs normals for terrain relief. The generic planet shader handles Venus and Mars with single-texture ray tracing, S-curve color grading, and luminance-derived bump mapping. Both share atmosphere glow computed from edge proximity, an equirectangular starfield that counter-rotates at one-twelfth planet speed, Reinhard tone mapping, and vignette post-processing. Texture resolution adapts to device — 8K starfield on desktop, 4K on mobile.",
      },
    ],
    secondaryImages: [
      {
        src: "/images/works/goldilox-2.webp",
        alt: "Venus chapter with orange atmosphere glow and single-texture ray tracing",
        backing: "white",
      },
    ],
    codeBlocks: [
      {
        language: "glsl",
        filename: "earth.fragment.glsl",
        code: `// Ray-sphere intersection — all geometry computed in the shader
float t = raySphereIntersect(ro, rd, PLANET_CENTER, PLANET_RADIUS);
if (t > 0.0) {
  vec3 pos = ro + rd * t;
  vec3 normal = normalize(pos - PLANET_CENTER);

  // Five-layer texture compositing
  vec2 uv = sphereUV(normal);
  vec3 dayColor   = texture(uEarthColor, uv).rgb;
  vec3 nightColor = texture(uEarthNight, uv).rgb;
  float clouds    = texture(uEarthClouds, uv).r;
  float specMask  = texture(uEarthSpecular, uv).r;
  float bump      = texture(uEarthBump, uv).r;

  // Perturb normal with bump map for terrain relief
  normal = perturbNormal(normal, bump, uv);

  // Blend day/night based on sun angle
  float sunDot = dot(normal, uSunDirection);
  vec3 surface = mix(nightColor * NIGHT_EMISSION,
                     dayColor, smoothstep(-0.1, 0.3, sunDot));

  // Cloud layer + ocean specular + atmosphere
  surface = mix(surface, vec3(1.0), clouds * CLOUD_DENSITY);
  surface += specMask * phongSpecular(rd, normal, uSunDirection);
}`,
      },
    ],
    nextProject: {
      slug: "vejle-mod-hudcancer",
      title: "Vejle mod hudcancer",
    },
  },
  {
    slug: "vejle-mod-hudcancer",
    title: "Vejle mod hudcancer",
    subtitle: "Danish non-profit website",
    pullQuote:
      "100% of donations going directly to research — and a website their non-technical team could own.",
    meta: {
      role: "Frontend Developer",
      stack: "Next.js 15, TypeScript, Sanity CMS, Tailwind CSS v4, Framer Motion, Radix UI",
      year: "2025",
    },
    heroImage: {
      src: "/images/works/vmh-1.webp",
      alt: "Vejle mod hudcancer homepage with hero section and fundraising statistics",
    },
    narrative: [
      {
        number: "01",
        heading: "The Constraint",
        body: "Vejle mod hudcancer is a Danish non-profit that has raised over 3.4 million DKK for local skin cancer research since 2017, with 100% of donations going directly to research. The organization needed a website their non-technical team could update on their own — new research projects, photo galleries, event announcements — without any developer involvement. The site is entirely in Danish, and the design had to communicate trust for an organization whose collections are audited by Ernst & Young.",
      },
      {
        number: "02",
        heading: "The Architecture",
        body: "Sanity CMS provides the content layer with GROQ queries driving all page data. Content types include research projects with funding goals and status tracking, gallery year pages with photographer-categorized image batches, and event pages. All pages are server components that fetch at build time, with tiered ISR revalidation — 60 seconds for the project landing page, 300 seconds for standard content, 600 seconds for navigation data. React cache() deduplicates requests within a single render pass. The header navigation fetches project and gallery previews from Sanity in parallel via Promise.all, rendering dynamic dropdown menus with Radix NavigationMenu.",
      },
      {
        number: "03",
        heading: "The Interface",
        body: "The projects section features spring-animated fundraising counters and animated bar charts that build sequentially on scroll, showing money raised per year with 3D shadow effects. Individual project pages show a funding progress bar, status badges, and image galleries — all CMS-driven via generateStaticParams. The gallery pages support filtering by photographer and photobooth categories using Radix Tabs, with a full-screen lightbox and download capability. The responsive header transforms on scroll — adding a blur backdrop, rounded corners, and floating effect — and the mobile menu uses Framer Motion for staggered item reveals with body scroll lock. Adobe Typekit serves the brand fonts: Adelle (serif) for headlines and Adelle Sans for body text.",
      },
    ],
    secondaryImages: [
      {
        src: "/images/works/vmh-2.webp",
        alt: "Projects page with animated fundraising charts and progress tracking",
        backing: "white",
      },
      {
        src: "/images/works/vmh-3.webp",
        alt: "Gallery page with category filters and lightbox image viewer",
        backing: "gray",
      },
    ],
    nextProject: {
      slug: "verto",
      title: "Verto",
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((cs) => cs.slug);
}

/**
 * Derives the previous project from the circular chain.
 * Finds whichever study has `nextProject.slug === slug`.
 */
export function getPreviousProject(
  slug: string,
): { slug: string; title: string } | undefined {
  const prev = CASE_STUDIES.find((cs) => cs.nextProject?.slug === slug);
  if (!prev) return undefined;
  return { slug: prev.slug, title: prev.title };
}
