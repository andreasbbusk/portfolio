import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Andreas Busk Mikkelsen: frontend engineering focus, product mindset, and technical strengths.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="min-h-screen w-full flex flex-col gap-5 justify-center items-center">
        <h1 className="text-4xl uppercase">About</h1>
        <h2 className="font-mono text-2xl uppercase">Portfolio</h2>
      </section>
    </>
  );
}
