import type {
  BottomNavSliderMode,
  BottomNavSliderData,
} from "@/features/navigation/state/bottom-nav-store";

export interface BottomNavZoneDefinition {
  id?: string;
  label?: string;
  sliderMode: BottomNavSliderMode;
}

export function defineBottomNavZone(
  definition: BottomNavZoneDefinition
): BottomNavZoneDefinition {
  return definition;
}

export function defineBottomNavSliderMode(
  data: BottomNavSliderData
): BottomNavSliderMode {
  return {
    type: "slider",
    data,
  };
}
