"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import type { BottomNavZoneDefinition } from "@/features/navigation/config/bottom-nav-zone-definitions";
import {
  registerBottomNavZone,
  removeBottomNavZone,
} from "@/features/navigation/utils/bottom-nav-zone-registry";

interface BottomNavZoneRegistration {
  ref: React.RefObject<HTMLElement | null>;
  zoneProps: {
    "data-bottom-nav-zone": string;
    "data-bottom-nav-zone-label"?: string;
  };
}

function sanitizeReactId(reactId: string) {
  return reactId.replace(/:/g, "");
}

export function useBottomNavZone(
  definition: BottomNavZoneDefinition
): BottomNavZoneRegistration {
  const elementRef = useRef<HTMLElement>(null);
  const reactId = useId();

  const zoneId =
    definition.id ?? `bottom-nav-zone-${sanitizeReactId(reactId)}`;

  const zoneProps = useMemo(() => {
    if (definition.label) {
      return {
        "data-bottom-nav-zone": zoneId,
        "data-bottom-nav-zone-label": definition.label,
      };
    }

    return {
      "data-bottom-nav-zone": zoneId,
    };
  }, [definition.label, zoneId]);

  useEffect(() => {
    registerBottomNavZone(zoneId, elementRef.current, definition.sliderMode);

    return () => {
      removeBottomNavZone(zoneId);
    };
  }, [definition.sliderMode, zoneId]);

  return {
    ref: elementRef,
    zoneProps,
  };
}
