import { create } from "zustand";

export interface BottomNavSliderData {
  title: string;
  description?: string;
  tags?: string[];
  onNext?: () => void;
  onPrevious?: () => void;
}

export type BottomNavSliderMode = {
  type: "slider";
  data: BottomNavSliderData;
};

export type BottomNavMode =
  | { type: "menu" }
  | BottomNavSliderMode;

interface BottomNavStore {
  isExpanded: boolean;
  isResolved: boolean;
  mode: BottomNavMode;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  setIsResolved: (resolved: boolean) => void;
  setMode: (mode: BottomNavMode) => void;
}

export const useBottomNavStore = create<BottomNavStore>((set) => ({
  isExpanded: false,
  isResolved: false,
  mode: { type: "menu" },
  openMenu: () => set({ isExpanded: true }),
  closeMenu: () => set({ isExpanded: false }),
  toggleMenu: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setIsResolved: (resolved) => set({ isResolved: resolved }),
  setMode: (mode) => set({ mode }),
}));
