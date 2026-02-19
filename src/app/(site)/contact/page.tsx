import type { Metadata } from "next";
import { Button } from "@/shared/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Andreas Busk Mikkelsen for frontend engineering and product-focused web development opportunities.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="min-h-screen w-full flex flex-col gap-5 justify-center items-center">
        <h1 className="text-4xl uppercase">Contact</h1>
        <h2 className="font-mono text-2xl uppercase">Portfolio</h2>
        <Button variant="default" className="">
          Tekst
        </Button>
      </section>
    </>
  );
}
