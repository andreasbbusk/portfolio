import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Case studies and selected work focused on scalable frontend architecture and polished user experiences.",
  alternates: {
    canonical: "/works",
  },
};

export default function WorksPage() {
  return (
    <section className="min-h-screen w-full flex flex-col gap-5 justify-center items-center">
      <h1 className="text-4xl uppercase">Works</h1>
      <h2 className="font-mono text-2xl">Case studies coming soon</h2>
    </section>
  );
}
