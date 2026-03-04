import { cn } from "@/utils/cn";

export const homepageSectionClass = "py-[clamp(64px,8.5vw,164px)]";
export const homepageShellClass = "mx-auto w-full max-w-[1680px] px-6 md:px-12";
export const homepageSansFontClass = "[font-family:var(--font-dm-sans)]";
export const homepageButtonBaseClass =
  "inline-flex h-[54px] items-center justify-center rounded-2xl border border-transparent px-7 text-base tracking-[-0.01em] transition duration-200 hover:-translate-y-px hover:opacity-90";

export const homepagePrimaryButtonClass = cn(
  homepageButtonBaseClass,
  homepageSansFontClass,
  "bg-[#dd2f20] text-[#09090a]",
);

export const homepageSecondaryButtonClass = cn(
  homepageButtonBaseClass,
  homepageSansFontClass,
  "border-[#202126] bg-[#16161a]/95 text-white",
);
