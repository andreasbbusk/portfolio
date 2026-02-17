import { BottomNavSliderMode } from "@/features/navigation/state/bottom-nav-store";

export interface RegisteredBottomNavZone {
  id: string;
  element: HTMLElement | null;
  sliderMode: BottomNavSliderMode;
  version: number;
}

type ZoneListener = () => void;

const registeredZones = new Map<string, RegisteredBottomNavZone>();
const listeners = new Set<ZoneListener>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function registerBottomNavZone(
  id: string,
  element: HTMLElement | null,
  sliderMode: BottomNavSliderMode
) {
  const previousZone = registeredZones.get(id);

  registeredZones.set(id, {
    id,
    element,
    sliderMode,
    version: (previousZone?.version ?? 0) + 1,
  });

  notifyListeners();
}

export function removeBottomNavZone(id: string) {
  if (!registeredZones.delete(id)) {
    return;
  }

  notifyListeners();
}

export function getBottomNavZone(id: string) {
  return registeredZones.get(id);
}

export function getBottomNavZones() {
  return Array.from(registeredZones.values());
}

export function subscribeBottomNavZones(listener: ZoneListener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}
