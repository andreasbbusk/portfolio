"use client";

import { useEffect } from "react";

interface GlobalErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <section className="min-h-screen w-full flex flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            A critical error occurred
          </h1>
          <p className="max-w-md text-muted-foreground">
            Please refresh and try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-xl bg-orange px-5 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Reload
          </button>
        </section>
      </body>
    </html>
  );
}
