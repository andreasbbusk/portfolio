"use client";

import { useCallback, useEffect, useRef } from "react";
import { useViewportContent } from "@amikkelsen/viewport-guides-react";
import {
  getBottomNavZone,
  subscribeBottomNavZones,
} from "@/features/navigation/utils/bottom-nav-zone-registry";
import {
  type BottomNavMode,
  useBottomNavStore,
} from "@/features/navigation/state/bottom-nav-store";
import { hasSameBottomNavMode } from "@/features/navigation/utils/bottom-nav-mode-utils";

const NO_ACTIVE_ZONE_GRACE_MS = 180;

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

  const subscribeTracker = useCallback((notify: () => void) => {
    let rafId: number | null = null;
    const queueNotify = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        notify();
      });
    };

    window.addEventListener("scroll", queueNotify, { passive: true });
    window.addEventListener("resize", queueNotify, { passive: true });
    const unsubscribeZones = subscribeBottomNavZones(queueNotify);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener("scroll", queueNotify);
      window.removeEventListener("resize", queueNotify);
      unsubscribeZones();
    };
  }, []);

  const { controller, activeZoneId } = useViewportContent({
    guides: {
      enabled: false,
      storageKey: null,
      queryParam: null,
      toggleKey: null,
    },
    tracker: {
      zoneSelector: "[data-bottom-nav-zone]",
      zoneIdAttribute: "data-bottom-nav-zone",
      lineRatio: 0.65,
      fallbackToNearest: false,
      subscribe: subscribeTracker,
    },
  });

  useEffect(() => {
    if (!controller) {
      return;
    }

    controller.start();
    controller.syncZones();
    controller.refresh();
  }, [controller]);

  useEffect(() => {
    activeZoneIdRef.current = activeZoneId;
    applyZoneState(activeZoneId);
  }, [activeZoneId, applyZoneState]);

  useEffect(() => {
    return subscribeBottomNavZones(() => {
      applyZoneState(activeZoneIdRef.current);
    });
  }, [applyZoneState]);

  useEffect(() => {
    return () => {
      clearNoZoneTimeout();
    };
  }, [clearNoZoneTimeout]);

  return null;
}
