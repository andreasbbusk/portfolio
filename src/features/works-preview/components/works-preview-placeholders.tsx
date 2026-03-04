import { Safari } from "@/components/ui/safari";
import { cn } from "@/utils/cn";

export function SafariPlaceholderFrame({
  className,
  imageSrc,
  url,
}: {
  className?: string;
  imageSrc?: string;
  url: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Safari
        url={url}
        imageSrc={imageSrc}
        className="relative z-10 block w-full transition-shadow duration-500 hover:shadow-[0_26px_86px_-48px_rgba(9,9,10,0.36)]"
      />
    </div>
  );
}
