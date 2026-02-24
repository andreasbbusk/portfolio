# Portfolio

Personal portfolio site built with Next.js 16, React 19, and Tailwind CSS v4.

## Tech

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Motion

## Getting Started

```bash
bun install
bun run dev
```

Build and run:

```bash
bun run build
bun run start
```

## Scripts

- `bun run dev`
- `bun run build`
- `bun run start`
- `bun run lint`

## Structure

```txt
src/
  app/                # Next.js routes
  features/
    home/             # Homepage sections (hero/about/skills/contact/works preview)
    works/            # /works route (future case-study route support lives here)
    navigation/       # Header + header-specific components
    loader/           # Loader, transition, smooth scroll, storage
  ui/                 # Global reusable primitives/components
  icons/              # Global icons
  utils/              # Small helpers
  config/             # App config
```

## Notes

- `ui/` is for global reusable primitives/components.
- `features/*/components/` is for feature-specific pieces only.
- `/about` and `/contact` are intentionally homepage sections, not routes.
- Experimental/archive code is kept outside this repo in `/Users/andreasmikkelsen/Documents/GitHub/tmp/portfolio-archive/`.
- Absolute imports use the `@/` alias mapped to `src/`.
