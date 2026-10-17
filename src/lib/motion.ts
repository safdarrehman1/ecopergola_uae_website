import type { Variants, Transition } from "framer-motion";

/**
 * Reusable motion specifications meeting prompt guidelines:
 * - Hero copy: subtle fade and 16–24px upward movement, 500–700ms
 * - Section entry: fade and 16–24px movement, 450–600ms, once on entry
 * - Group stagger: 60–90ms between items
 * - Image hover: gentle scale up to ~1.03, 300–450ms
 * - Link arrow: small horizontal translation
 * - Buttons: clear hover and pressed states, 150–200ms
 * - Menus: opacity and short vertical movement, 180–250ms
 */

export const standardEase: [number, number, number, number] = [0.22, 1, 0.36, 1]; // Smooth architectural cubic-bezier

export const heroCopyTransition: Transition = {
  duration: 0.65,
  ease: standardEase,
};

export const sectionEntryTransition: Transition = {
  duration: 0.55,
  ease: standardEase,
};

export const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: heroCopyTransition,
  },
};

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: sectionEntryTransition,
  },
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: standardEase,
    },
  },
};

export const menuVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: standardEase,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.18,
      ease: "easeIn",
    },
  },
};

export const imageHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.35,
      ease: standardEase,
    },
  },
};

export const buttonMotionProps = {
  whileHover: { scale: 1.015 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.18, ease: standardEase },
};

export const arrowHoverVariants: Variants = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.2, ease: "easeOut" } },
};
