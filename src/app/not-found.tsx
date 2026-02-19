import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.12em] text-muted-foreground">
        404
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you are looking for does not exist or has moved.
      </p>
      <Link href="/" className="text-orange underline underline-offset-4">
        Go back home
      </Link>
    </section>
  );
}
