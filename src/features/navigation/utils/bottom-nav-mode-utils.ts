import type {
  BottomNavMode,
  BottomNavSliderData,
} from "@/features/navigation/state/bottom-nav-store";

function hasSameTags(
  current: string[] | undefined,
  next: string[] | undefined
) {
  if (!current && !next) {
    return true;
  }

  if (!current || !next || current.length !== next.length) {
    return false;
  }

  return current.every((tag, index) => tag === next[index]);
}

function hasSameSliderData(
  current: BottomNavSliderData,
  next: BottomNavSliderData
) {
  return (
    current.title === next.title &&
    current.description === next.description &&
    current.onNext === next.onNext &&
    current.onPrevious === next.onPrevious &&
    hasSameTags(current.tags, next.tags)
  );
}

export function hasSameBottomNavMode(
  current: BottomNavMode,
  next: BottomNavMode
) {
  if (current.type !== next.type) {
    return false;
  }

  if (current.type === "menu" && next.type === "menu") {
    return true;
  }

  if (current.type === "slider" && next.type === "slider") {
    return hasSameSliderData(current.data, next.data);
  }

  return false;
}

export function getBottomNavContentKey(mode: BottomNavMode) {
  if (mode.type === "menu") {
    return "menu";
  }

  return `slider:${mode.data.title}:${mode.data.description ?? ""}:${
    mode.data.tags?.join("|") ?? ""
  }`;
}
