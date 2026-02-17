import { motion } from "motion/react";
import { ArrowIcon } from "@/shared/icons/arrow-icon";
import { BurgerIcon } from "@/shared/icons/burger-icon";
import { useBottomNavStore } from "@/features/navigation/state/bottom-nav-store";
import { Button } from "@/shared/ui/button";
import { NAV_TRANSITIONS } from "@/shared/config/animations";

interface SliderHeaderProps {
  onPrevious?: () => void;
  onNext?: () => void;
}

const sliderControlButtonBaseClassName =
  "rounded-lg border border-foreground/12 bg-foreground/[0.02] shadow-sm transition-colors duration-200 hover:bg-foreground/[0.06] hover:border-foreground/24";
const sliderToggleButtonClassName = `${sliderControlButtonBaseClassName} py-6`;

function SliderPreviousButton({ onPrevious }: { onPrevious?: () => void }) {
  return (
    <motion.div
      layoutId="slider-prev-button"
      layout
      transition={NAV_TRANSITIONS.container}
    >
      <Button
        onClick={onPrevious}
        disabled={!onPrevious}
        size="icon-xl"
        variant="ghost"
        aria-label="Previous"
        className={sliderControlButtonBaseClassName}
      >
        <ArrowIcon className="-rotate-180 size-5" />
      </Button>
    </motion.div>
  );
}

function SliderNextButton({ onNext }: { onNext?: () => void }) {
  return (
    <motion.div
      layoutId="slider-next-button"
      layout
      transition={NAV_TRANSITIONS.container}
    >
      <Button
        onClick={onNext}
        disabled={!onNext}
        size="icon-xl"
        variant="ghost"
        aria-label="Next"
        className={sliderControlButtonBaseClassName}
      >
        <ArrowIcon className="size-5" />
      </Button>
    </motion.div>
  );
}

function SliderToggleButton() {
  const { isExpanded, toggleMenu } = useBottomNavStore();

  return (
    <motion.div
      layoutId="slider-toggle-button"
      layout
      transition={NAV_TRANSITIONS.container}
    >
      <Button
        onClick={toggleMenu}
        variant="ghost"
        aria-label="Toggle details"
        className={sliderToggleButtonClassName}
      >
        Details
        <BurgerIcon isOpen={isExpanded} className="size-5" />
      </Button>
    </motion.div>
  );
}

export function SliderHeader({ onPrevious, onNext }: SliderHeaderProps) {
  return (
    <div className="flex items-center gap-2 justify-between relative z-10">
      <div className="flex gap-1.5">
        <SliderPreviousButton onPrevious={onPrevious} />
        <SliderNextButton onNext={onNext} />
      </div>

      <SliderToggleButton />
    </div>
  );
}

// Slider content
export function SliderContent({
  title,
  description,
  tags = [],
}: {
  title: string;
  description?: string;
  tags?: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={NAV_TRANSITIONS.content}
      className="max-w-full"
    >
      <div className="pt-6 pb-4 max-w-full">
        {/* Project Title */}
        <motion.h2
          key={`title-${title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-2xl font-bold text-foreground mb-4"
        >
          {title}
        </motion.h2>

        {/* Project Description */}
        {description && (
          <motion.p
            key={`description-${description}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-muted-foreground leading-relaxed mb-6 break-words"
          >
            {description}
          </motion.p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <motion.div
            key={`tags-${tags.join("-")}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-wrap gap-2"
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-xs font-medium
                             bg-foreground/5 text-muted-foreground
                             rounded-lg border border-white/10
                             uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
