import { Safari } from "@/components/ui/safari";
import type { JSX } from "react";
import type { PlaceholderVariant } from "@/features/works-preview/types";
import { cn } from "@/utils/cn";

const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

const safariScreenStyle = {
  left: "0.083%",
  top: "6.905%",
  width: "99.751%",
  height: "92.961%",
} as const;

function PlaceholderBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 bg-neutral-100",
        className,
      )}
    />
  );
}

function VertoPlaceholderGrid() {
  return (
    <div className="grid h-full grid-cols-[1.55fr_0.85fr] gap-3">
      <div className="grid grid-rows-[auto_1fr_auto] gap-3">
        <PlaceholderBlock className="h-10" />
        <PlaceholderBlock className="min-h-0" />
        <div className="grid grid-cols-3 gap-3">
          <PlaceholderBlock className="h-14" />
          <PlaceholderBlock className="h-14" />
          <PlaceholderBlock className="h-14" />
        </div>
      </div>
      <div className="grid grid-rows-[auto_auto_1fr] gap-3">
        <PlaceholderBlock className="h-20" />
        <PlaceholderBlock className="h-20" />
        <PlaceholderBlock className="min-h-0" />
      </div>
    </div>
  );
}

function RankTrackerPlaceholderGrid() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3">
      <div className="grid grid-cols-3 gap-3">
        <PlaceholderBlock className="h-12" />
        <PlaceholderBlock className="h-12" />
        <PlaceholderBlock className="h-12" />
      </div>
      <div className="grid min-h-0 grid-cols-[1.35fr_0.95fr] gap-3">
        <PlaceholderBlock className="min-h-0" />
        <div className="grid grid-rows-2 gap-3">
          <PlaceholderBlock className="min-h-0" />
          <PlaceholderBlock className="min-h-0" />
        </div>
      </div>
    </div>
  );
}

function GoldiloxPlaceholderGrid() {
  return (
    <div className="grid h-full grid-rows-[1.25fr_0.75fr] gap-3">
      <PlaceholderBlock className="min-h-0" />
      <div className="grid grid-cols-2 gap-3">
        <PlaceholderBlock className="min-h-0" />
        <PlaceholderBlock className="min-h-0" />
      </div>
    </div>
  );
}

function VejlePlaceholderGrid() {
  return (
    <div className="grid h-full grid-rows-[1.1fr_auto_auto] gap-3">
      <PlaceholderBlock className="min-h-0" />
      <PlaceholderBlock className="h-11" />
      <div className="grid grid-cols-3 gap-3">
        <PlaceholderBlock className="h-12" />
        <PlaceholderBlock className="h-12" />
        <PlaceholderBlock className="h-12" />
      </div>
    </div>
  );
}

function PortfolioPlaceholderGrid() {
  return (
    <div className="grid h-full grid-cols-[1.15fr_0.85fr] gap-3">
      <div className="grid grid-rows-[auto_1fr] gap-3">
        <PlaceholderBlock className="h-10" />
        <PlaceholderBlock className="min-h-0" />
      </div>
      <div className="grid grid-rows-3 gap-3">
        <PlaceholderBlock className="min-h-0" />
        <PlaceholderBlock className="min-h-0" />
        <PlaceholderBlock className="min-h-0" />
      </div>
    </div>
  );
}

const PLACEHOLDER_GRID_BY_VARIANT: Record<
  PlaceholderVariant,
  () => JSX.Element
> = {
  verto: VertoPlaceholderGrid,
  "rank-tracker": RankTrackerPlaceholderGrid,
  goldilox: GoldiloxPlaceholderGrid,
  vejle: VejlePlaceholderGrid,
  portfolio: PortfolioPlaceholderGrid,
};

function PlaceholderGrid({ variant }: { variant: PlaceholderVariant }) {
  const Grid = PLACEHOLDER_GRID_BY_VARIANT[variant];

  return <Grid />;
}

export function SafariPlaceholderFrame({
  className,
  url,
  variant,
}: {
  className?: string;
  url: string;
  variant: PlaceholderVariant;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0 overflow-hidden"
        style={safariScreenStyle}
      >
        <div className="h-full w-full rounded-b-[11px] bg-neutral-50 p-3 sm:p-4">
          <div className="h-full w-full rounded-xl border border-neutral-200 bg-white p-3 sm:p-4">
            <PlaceholderGrid variant={variant} />
          </div>
        </div>
      </div>

      <Safari
        url={url}
        imageSrc={TRANSPARENT_PIXEL}
        className="relative z-10 block w-full transition-shadow duration-500 hover:shadow-[0_26px_86px_-48px_rgba(9,9,10,0.36)]"
      />
    </div>
  );
}
