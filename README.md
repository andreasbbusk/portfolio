## Portfolio

A simple personal portfolio built with Next.js 16, React 19, and Tailwind CSS v4.

### Tech Stack

- Next.js 16 (App Router)
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

```txt
src/
  app/
    layout.tsx
    providers.tsx
    globals.css
    favicon.ico
    (site)/
      page.tsx
      about/page.tsx
      works/page.tsx
      contact/page.tsx
      _components/
  features/
    navigation/
      ui/
      hooks/
      state/
      config/
      utils/
    loader/
      ui/
      utils/
  shared/
    ui/
    icons/
    config/
    utils/
```

### Notes

- Tailwind v4 is configured via PostCSS (`@tailwindcss/postcss`).
- Absolute imports use the `@/` alias mapped to `src/`.
