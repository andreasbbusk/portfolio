import { Button } from "@/modules/components/ui/button";

export default function Page() {
  return (
    <section className="min-h-screen w-full flex flex-col gap-5 justify-center items-center">
      <h1 className="text-4xl uppercase">Landing page</h1>
      <h2 className="font-mono text-2xl uppercase">Portfolio</h2>
      <Button variant="default" className="">
        Tekst
      </Button>
    </section>
  );
}
