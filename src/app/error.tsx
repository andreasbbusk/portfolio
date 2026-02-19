"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="max-w-md text-muted-foreground">
        An unexpected error occurred while loading this page.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-xl bg-orange px-5 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </section>
  );
}
