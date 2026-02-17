"use client";

import type { ComponentPropsWithoutRef } from "react";
import type { BottomNavZoneDefinition } from "@/features/navigation/config/bottom-nav-zone-definitions";
import { useBottomNavZone } from "@/features/navigation/hooks/use-bottom-nav-zone";

interface BottomNavZoneSectionProps
  extends ComponentPropsWithoutRef<"section"> {
  zoneDefinition: BottomNavZoneDefinition;
}

export function BottomNavZoneSection({
  zoneDefinition,
  ...sectionProps
}: BottomNavZoneSectionProps) {
  const { ref, zoneProps } = useBottomNavZone(zoneDefinition);

  return <section ref={ref} {...zoneProps} {...sectionProps} />;
}
