"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  getBottomNavZones,
  getBottomNavZone,
  subscribeBottomNavZones,
} from "@/features/navigation/utils/bottom-nav-zone-registry";
import {
  type BottomNavMode,
  useBottomNavStore,
} from "@/features/navigation/state/bottom-nav-store";
import { hasSameBottomNavMode } from "@/features/navigation/utils/bottom-nav-mode-utils";

const NO_ACTIVE_ZONE_GRACE_MS = 180;
const TRACKER_LINE_RATIO = 0.65;

function getActiveZoneIdAtLine(lineY: number): string | null {
  const zones = getBottomNavZones();
  let activeZoneId: string | null = null;
  let activeDistance = Number.POSITIVE_INFINITY;

  for (const zone of zones) {
    const element = zone.element;

    if (!element || !element.isConnected) {
      continue;
    }

    const bounds = element.getBoundingClientRect();
    const containsLine = bounds.top <= lineY && bounds.bottom >= lineY;
    if (!containsLine) {
      continue;
    }

    const distanceFromLine = Math.abs(bounds.top - lineY);
    if (distanceFromLine < activeDistance) {
      activeDistance = distanceFromLine;
      activeZoneId = zone.id;
    }
  }

  return activeZoneId;
}

export function BottomNavViewportController() {
  const activeZoneIdRef = useRef<string | null>(null);
  const noZoneTimeoutRef = useRef<number | null>(null);

  const clearNoZoneTimeout = useCallback(() => {
    if (noZoneTimeoutRef.current !== null) {
      window.clearTimeout(noZoneTimeoutRef.current);
      noZoneTimeoutRef.current = null;
    }
  }, []);

  const applyZoneState = useCallback(
    (zoneId: string | null) => {
      const state = useBottomNavStore.getState();
      const zone = zoneId ? getBottomNavZone(zoneId) : undefined;

      if (zone) {
        clearNoZoneTimeout();

        const nextMode: BottomNavMode = zone.sliderMode;
        const shouldKeepExpanded =
          state.isExpanded &&
          state.mode.type === "slider" &&
          nextMode.type === "slider";

        if (state.isExpanded && !shouldKeepExpanded) {
          state.closeMenu();
        }

        if (!hasSameBottomNavMode(state.mode, nextMode)) {
          state.setMode(nextMode);
        }

        if (!state.isResolved) {
          state.setIsResolved(true);
        }

        return;
      }

      const nextMode: BottomNavMode = { type: "menu" };

      // If expanded slider momentarily loses an active zone while scrolling
      // between two slider sections, keep it alive briefly to avoid flicker.
      if (state.isExpanded && state.mode.type === "slider") {
        if (noZoneTimeoutRef.current === null) {
          noZoneTimeoutRef.current = window.setTimeout(() => {
            noZoneTimeoutRef.current = null;

            // If a new zone became active during grace period, do nothing.
            if (activeZoneIdRef.current !== null) {
              return;
            }

            const latestState = useBottomNavStore.getState();
            if (latestState.isExpanded) {
              latestState.closeMenu();
            }
            if (!hasSameBottomNavMode(latestState.mode, nextMode)) {
              latestState.setMode(nextMode);
            }
            if (!latestState.isResolved) {
              latestState.setIsResolved(true);
            }
          }, NO_ACTIVE_ZONE_GRACE_MS);
        }

        return;
      }

      clearNoZoneTimeout();

      // If nav is closed while outside any zone, force menu mode immediately.
      if (!hasSameBottomNavMode(state.mode, nextMode)) {
        state.setMode(nextMode);
      }

      if (!state.isResolved) {
        state.setIsResolved(true);
      }
    },
    [clearNoZoneTimeout]
  );

  const syncActiveZone = useCallback(() => {
    const lineY = window.innerHeight * TRACKER_LINE_RATIO;
    const activeZoneId = getActiveZoneIdAtLine(lineY);

    activeZoneIdRef.current = activeZoneId;
    applyZoneState(activeZoneId);
  }, [applyZoneState]);

  useEffect(() => {
    let rafId: number | null = null;

    const queueSync = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        syncActiveZone();
      });
    };

    window.addEventListener("scroll", queueSync, { passive: true });
    window.addEventListener("resize", queueSync, { passive: true });
    const unsubscribeZones = subscribeBottomNavZones(queueSync);

    queueSync();

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", queueSync);
      window.removeEventListener("resize", queueSync);
      unsubscribeZones();
    };
  }, [syncActiveZone]);

  useEffect(() => {
    return () => {
      clearNoZoneTimeout();
    };
  }, [clearNoZoneTimeout]);

  return null;
}
