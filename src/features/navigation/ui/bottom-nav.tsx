"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  type BottomNavMode,
  useBottomNavStore,
} from "@/features/navigation/state/bottom-nav-store";
import { useMeasuredContentHeight } from "@/features/navigation/hooks/use-measured-content-height";
import { getBottomNavContentKey } from "@/features/navigation/utils/bottom-nav-mode-utils";
import { NAV_TRANSITIONS } from "@/shared/config/animations";
import { SliderContent, SliderHeader } from "./bottom-nav-slider";
import { MenuContent, MenuHeader } from "./bottom-nav-menu";

interface BottomNavContainerProps {
  children: ReactNode;
  className?: string;
}

function BottomNavContainer({
  children,
  className = "",
}: BottomNavContainerProps) {
  const { isExpanded, closeMenu, isResolved } = useBottomNavStore();
  const containerWidth = isExpanded
    ? "min(calc(100vw - 2rem), 480px)"
    : "min(calc(100vw - 2rem), 340px)";

  return (
    <>
      {/* Invisible backdrop to detect outside clicks */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={NAV_TRANSITIONS.backdrop}
            className="fixed inset-0 z-20"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.div
        layoutId="bottom-nav-container"
        layout
        initial={false}
        animate={{ width: containerWidth }}
        transition={{
          layout: NAV_TRANSITIONS.container,
          width: NAV_TRANSITIONS.container,
        }}
        className={`
          fixed bottom-8 left-1/2 -translate-x-1/2 z-30
          bg-background/95 backdrop-blur-md
          border border-foreground/20
          rounded-2xl shadow-2xl
          overflow-hidden
          transition-opacity duration-150
          px-4 py-3
          ${isResolved ? "opacity-100" : "opacity-0 pointer-events-none"}
          ${className}
        `}
      >
        {children}
      </motion.div>
    </>
  );
}

function BottomNavHeader({ mode }: { mode: BottomNavMode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {mode.type === "menu" ? (
        <motion.div
          key="menu-header"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={NAV_TRANSITIONS.header}
        >
          <MenuHeader />
        </motion.div>
      ) : (
        <motion.div
          key="slider-header"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={NAV_TRANSITIONS.header}
        >
          <SliderHeader
            onPrevious={mode.data.onPrevious}
            onNext={mode.data.onNext}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BottomNavExpandedContent({
  mode,
  isExpanded,
}: {
  mode: BottomNavMode;
  isExpanded: boolean;
}) {
  const contentKey = getBottomNavContentKey(mode);
  const { contentRef, measuredHeight } = useMeasuredContentHeight({
    isActive: isExpanded,
    contentKey,
  });

  const targetHeight = measuredHeight > 0 ? measuredHeight : "auto";

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          key="expanded-shell"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: targetHeight }}
          exit={{ opacity: 0, height: 0 }}
          transition={NAV_TRANSITIONS.content}
          className="overflow-hidden"
        >
          <div ref={contentRef}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={contentKey}
                initial={{ opacity: 0.25 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full"
              >
                {mode.type === "menu" ? (
                  <MenuContent />
                ) : (
                  <SliderContent
                    title={mode.data.title}
                    description={mode.data.description}
                    tags={mode.data.tags}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function BottomNav() {
  const { isExpanded, mode } = useBottomNavStore();

  return (
    <BottomNavContainer>
      <div className="flex flex-col w-full">
        <BottomNavHeader mode={mode} />
        <BottomNavExpandedContent mode={mode} isExpanded={isExpanded} />
      </div>
    </BottomNavContainer>
  );
}
