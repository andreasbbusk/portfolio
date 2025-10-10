## Portfolio

A simple personal portfolio built with Next.js 15, React 19, and Tailwind CSS v4.

### Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build && npm start
   ```

### Scripts

- `npm run dev`: Start dev server (Turbopack)
- `npm run build`: Build the app (Turbopack)
- `npm start`: Start production server
- `npm run lint`: Run ESLint

### Project Structure

```
src/
  app/                # Next.js App Router
    layout.tsx
    page.tsx
    globals.css
    [routes]/
  modules/
    ui/               # Reusable UI components
    projects/
    about/
```

### Notes

- Tailwind v4 is configured via PostCSS (`@tailwindcss/postcss`).
- Absolute imports use the `@/` alias mapped to `src/`.
