"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Slot as SlotPrimitive } from "radix-ui";

import { cn } from "@/utils/cn";

type InlineCopyLinkContextValue = {
  copied: boolean;
  copyLabel: string;
  copiedLabel: string;
  interactionActive: boolean;
  value: string;
  onCopy: () => Promise<boolean>;
};

const InlineCopyLinkContext =
  React.createContext<InlineCopyLinkContextValue | null>(null);

function useInlineCopyLinkContext(componentName: string) {
  const context = React.useContext(InlineCopyLinkContext);

  if (!context) {
    throw new Error(`${componentName} must be used within <InlineCopyLink />`);
  }

  return context;
}

function copyWithExecCommand(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function emitMiniConfetti(origin: HTMLElement) {
  if (typeof window === "undefined") return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const rect = origin.getBoundingClientRect();
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = `${rect.left + rect.width / 2}px`;
  container.style.top = `${rect.top + rect.height / 2}px`;
  container.style.width = "0";
  container.style.height = "0";
  container.style.pointerEvents = "none";
  container.style.zIndex = "120";
  document.body.appendChild(container);

  const colors = ["#111111", "#6b7280", "#a1a1aa", "#d4d4d8"];
  const particleCount = 12;
  let maxDuration = 0;

  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement("span");
    const angle = ((Math.PI * 2) / particleCount) * index + (Math.random() - 0.5) * 0.35;
    const distance = 16 + Math.random() * 22;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 6;
    const rotate = (Math.random() - 0.5) * 220;
    const duration = 420 + Math.random() * 220;
    const delay = Math.random() * 35;

    maxDuration = Math.max(maxDuration, duration + delay);

    particle.style.position = "absolute";
    particle.style.left = "0";
    particle.style.top = "0";
    particle.style.width = `${3 + Math.random() * 3}px`;
    particle.style.height = `${2 + Math.random() * 2}px`;
    particle.style.borderRadius = "999px";
    particle.style.background = colors[Math.floor(Math.random() * colors.length)] ?? "#111111";
    particle.style.opacity = "0";
    particle.style.transform = "translate3d(0,0,0)";
    container.appendChild(particle);

    particle.animate(
      [
        {
          opacity: 0,
          transform: "translate3d(0, 0, 0) scale(0.7) rotate(0deg)",
        },
        {
          opacity: 1,
          offset: 0.12,
          transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)",
        },
        {
          opacity: 0,
          transform: `translate3d(${dx}px, ${dy}px, 0) scale(0.65) rotate(${rotate}deg)`,
        },
      ],
      {
        duration,
        delay,
        easing: "cubic-bezier(0.16, 0.84, 0.25, 1)",
        fill: "forwards",
      },
    );
  }

  window.setTimeout(() => {
    container.remove();
  }, maxDuration + 40);
}

type InlineCopyLinkProps = React.ComponentProps<"div"> & {
  value: string;
  copyValue?: string;
  copyLabel?: string;
  copiedLabel?: string;
};

function InlineCopyLink({
  className,
  children,
  value,
  copyValue,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  ...props
}: InlineCopyLinkProps) {
  const [copied, setCopied] = React.useState(false);
  const [interactionActive, setInteractionActive] = React.useState(false);
  const timeoutRef = React.useRef<number | null>(null);

  const onCopy = React.useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(copyValue ?? value);
      } else {
        copyWithExecCommand(copyValue ?? value);
      }

      setCopied(true);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 1400);
      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }, [copyValue, value]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <InlineCopyLinkContext.Provider
      value={{
        copied,
        copyLabel,
        copiedLabel,
        interactionActive,
        value,
        onCopy,
      }}
    >
      <div
        data-slot="inline-copy-link"
        className={cn(
          "group/inline-copy inline-flex max-w-full items-center text-black/72",
          className,
        )}
        onMouseEnter={() => setInteractionActive(true)}
        onMouseLeave={() => setInteractionActive(false)}
        onFocus={() => setInteractionActive(true)}
        onBlur={(event) => {
          if (event.currentTarget.contains(event.relatedTarget)) {
            return;
          }

          setInteractionActive(false);
        }}
        {...props}
      >
        {children}
      </div>
    </InlineCopyLinkContext.Provider>
  );
}

type InlineCopyLinkAnchorProps = React.ComponentProps<"a"> & {
  asChild?: boolean;
  hrefPrefix?: string;
};

function InlineCopyLinkAnchor({
  asChild = false,
  children,
  className,
  href,
  hrefPrefix,
  ...props
}: InlineCopyLinkAnchorProps) {
  const { value } = useInlineCopyLinkContext("InlineCopyLinkAnchor");
  const Comp = asChild ? SlotPrimitive.Slot : "a";

  return (
    <Comp
      data-slot="inline-copy-link-anchor"
      className={cn(
        "group/inline-copy-anchor order-2 min-w-0 text-[14px] leading-relaxed transition-colors duration-320 ease-[cubic-bezier(0.2,0.9,0.28,1)] hover:text-black focus-visible:text-black focus-visible:outline-none motion-reduce:transition-none",
        className,
      )}
      href={href ?? (hrefPrefix ? `${hrefPrefix}${value}` : undefined)}
      {...props}
    >
      <span className="relative block min-w-0 pb-[0.12em]">
        <span className="block truncate">{children ?? value}</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-out group-hover/inline-copy-anchor:scale-x-100 group-focus-visible/inline-copy-anchor:scale-x-100 group-hover/inline-copy:scale-x-100 motion-reduce:transition-none"
        />
      </span>
    </Comp>
  );
}

type InlineCopyLinkButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  copyAriaLabel?: string;
};

function InlineCopyLinkButton({
  asChild = false,
  children,
  className,
  onClick,
  type,
  copyAriaLabel = "Copy value",
  ...props
}: InlineCopyLinkButtonProps) {
  const { copied, copyLabel, copiedLabel, interactionActive, onCopy } =
    useInlineCopyLinkContext("InlineCopyLinkButton");
  const Comp = asChild ? SlotPrimitive.Slot : "button";

  return (
    <Comp
      data-slot="inline-copy-link-button"
      aria-label={copyAriaLabel}
      aria-hidden={!interactionActive}
      className={cn(
        "peer/inline-copy-button order-1 inline-flex h-5 max-w-0 shrink-0 items-center justify-start gap-0.5 overflow-hidden whitespace-nowrap text-[12px] leading-none font-medium text-black/55 opacity-0 pointer-events-none after:inline-block after:w-0 after:shrink-0 after:content-[''] transition-[max-width,opacity,color] duration-320 ease-[cubic-bezier(0.2,0.9,0.28,1)] after:transition-[width] after:duration-320 after:ease-[cubic-bezier(0.2,0.9,0.28,1)] hover:text-black focus-visible:max-w-[88px] focus-visible:opacity-100 focus-visible:pointer-events-auto focus-visible:text-black focus-visible:outline-none focus-visible:after:w-1 group-hover/inline-copy:max-w-[88px] group-hover/inline-copy:opacity-100 group-hover/inline-copy:pointer-events-auto group-hover/inline-copy:after:w-1 motion-reduce:transition-none motion-reduce:after:transition-none",
        className,
      )}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        const origin = event.currentTarget;
        void (async () => {
          const didCopy = await onCopy();

          if (didCopy) {
            emitMiniConfetti(origin);
          }
        })();
      }}
      tabIndex={interactionActive ? 0 : -1}
      type={type ?? "button"}
      {...props}
    >
      {children ?? (
        <>
          {copied ? (
            <Check className="size-3.5 shrink-0" aria-hidden="true" />
          ) : (
            <Copy className="size-3.5 shrink-0" aria-hidden="true" />
          )}
          <span>{copied ? copiedLabel : copyLabel}</span>
        </>
      )}
    </Comp>
  );
}

export { InlineCopyLink, InlineCopyLinkAnchor, InlineCopyLinkButton };
