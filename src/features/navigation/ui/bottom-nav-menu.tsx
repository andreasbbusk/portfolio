import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/shared/icons/logo";
import { BurgerIcon } from "@/shared/icons/burger-icon";
import { useBottomNavStore } from "@/features/navigation/state/bottom-nav-store";
import { Button } from "@/shared/ui/button";
import { SITE_NAVIGATION_CONFIG } from "@/features/navigation/utils/site-navigation-config";
import { NAV_TRANSITIONS, STAGGER_DELAY } from "@/shared/config/animations";

export function MenuHeader() {
  const { isExpanded, toggleMenu } = useBottomNavStore();

  return (
    <button
      onClick={toggleMenu}
      aria-label="Toggle menu"
      aria-expanded={isExpanded}
      className="flex items-center gap-6 justify-between w-full cursor-pointer
                   hover:opacity-80 transition-opacity outline-none relative z-10 mb-0 py-2"
    >
      <motion.div
        layoutId="nav-menu-logo"
        layout
        transition={NAV_TRANSITIONS.container}
      >
        <Logo className="h-8 w-8 text-foreground" />
      </motion.div>
      <motion.div
        layoutId="nav-menu-burger"
        layout
        transition={NAV_TRANSITIONS.container}
      >
        <BurgerIcon isOpen={isExpanded} className="size-6 text-foreground" />
      </motion.div>
    </button>
  );
}

export function MenuContent() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={NAV_TRANSITIONS.content}
    >
      {/* Navigation Items */}
      <nav className="flex flex-col pt-6 pb-4 gap-2">
        {[{ href: "/", label: "Home" }, ...SITE_NAVIGATION_CONFIG.primary].map(
          (item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  ...NAV_TRANSITIONS.stagger,
                  delay: index * STAGGER_DELAY,
                }}
              >
                <Link
                  href={item.href}
                  className={`
                    block px-4 py-3 text-lg font-medium rounded-lg
                    transition-colors duration-200
                    ${
                      isActive
                        ? "text-orange bg-orange/10"
                        : "text-foreground hover:bg-accent"
                    }
                  `}
                >
                  {item.label}
                </Link>
              </motion.div>
            );
          }
        )}
      </nav>

      {/* Contact Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ...NAV_TRANSITIONS.stagger, delay: 0.2 }}
        className="pt-2 pb-3"
      >
        <Button
          asChild
          variant="orange"
          size="lg"
          className="w-full uppercase tracking-wider"
        >
          <Link href="/contact">Contact</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
