"use client";

import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { memo, useSyncExternalStore } from "react";

export const ThemeToggle = memo(function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Show loading skeleton during SSR to avoid hydration mismatch.
  if (!isMounted) {
    return (
      <div
        className="h-9 w-16 rounded-full bg-muted animate-pulse"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-checked={isDark}
      role="switch"
      className="relative h-9 w-16 rounded-full
                 focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-ring focus-visible:ring-offset-2
                 transition-colors cursor-pointer border"
      type="button"
    >
      {/* Track background with color transition */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: isDark ? "oklch(0.269 0 0)" : "oklch(0.97 0 0)",
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Sliding thumb with spring animation */}
      <motion.div
        className="absolute top-1 left-1 h-7 w-7 rounded-full
                   bg-primary shadow-md flex items-center justify-center"
        animate={{
          x: isDark ? 28 : 0, // Slide 28px to the right when dark
        }}
        transition={{
          type: "spring",
          stiffness: 500, // High stiffness for snappy feel
          damping: 30, // Balanced damping for smooth stop
        }}
      >
        {/* Icon inside thumb with rotation */}
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 360 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="text-primary-foreground"
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.div>
      </motion.div>

      {/* Screen reader announcement */}
      <span className="sr-only">
        Current theme: {isDark ? "dark" : "light"}
      </span>
    </button>
  );
});

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
    </svg>
  );
}
