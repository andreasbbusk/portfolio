import { Button } from "@/shared/ui/button";
import { HomeFeaturedWork } from "@/app/(site)/_components/home-featured-work-section";

export default function HomePage() {
  return (
    <>
      <section className="min-h-screen w-full flex flex-col gap-5 justify-center items-center">
        <h1 className="text-4xl uppercase">Landing page</h1>
        <h2 className="font-mono text-2xl uppercase">Portfolio</h2>
        <Button variant="orange" className="">
          Tekst
        </Button>
      </section>

      <div className="h-[35vh]" />

      <HomeFeaturedWork />

      <div className="h-[45vh]" />
    </>
  );
}
