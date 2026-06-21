/* ═══════════════════════════════════════════════════════════════════════════
   Motion Utilities — NorthStar Real Estate
   All animation variants live here for consistency.
   Every animated component MUST wrap usage in `shouldAnimate` check.
═══════════════════════════════════════════════════════════════════════════ */

import type { Variants } from "framer-motion";

/* ─── Reduced-motion SSR-safe helper ────────────────────────────────────────
   Use this in Server Components by checking the CSS media query directly.
   In Client Components, use the `useReducedMotion` hook from framer-motion.
─────────────────────────────────────────────────────────────────────────── */
export const MOTION_SAFE_TRANSITION = {
  type: "spring",
  stiffness: 260,
  damping: 28,
} as const;

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT   = [0.4, 0, 0.2, 1] as const;

/* ─── Scroll-triggered fade-up (used for listing cards, sections) ────────── */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

/** Reduced-motion variant — still respects visibility, just no movement */
export const fadeOnly: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_IN_OUT } },
};

/* ─── Stagger container — parent for card grids ──────────────────────────── */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

/* ─── Stagger item — child of staggerContainer ───────────────────────────── */
export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

/* ─── Header collapse on scroll ──────────────────────────────────────────── */
export const headerVariants: Variants = {
  expanded: { height: "var(--header-height)" },
  compact:  { height: "var(--header-height-scrolled)", transition: { duration: 0.3, ease: EASE_IN_OUT } },
};

/* ─── Parallax layers (hero background) ─────────────────────────────────── */
export const parallaxSlow: Variants = {
  initial: { y: 0 },
  scroll:  (scrollY: number) => ({ y: scrollY * 0.15 }),
};
export const parallaxMedium: Variants = {
  initial: { y: 0 },
  scroll:  (scrollY: number) => ({ y: scrollY * 0.30 }),
};

/* ─── Card quick-action overlay ─────────────────────────────────────────── */
export const overlayReveal: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE_IN_OUT } },
};

/* ─── Map pin pulse ──────────────────────────────────────────────────────── */
export const pinPulse: Variants = {
  idle:   { scale: 1 },
  active: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.4, ease: EASE_IN_OUT },
  },
};

/* ─── Sheet / drawer slide-in ────────────────────────────────────────────── */
export const slideFromRight: Variants = {
  hidden:  { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.35, ease: EASE_OUT_EXPO } },
  exit:    { x: "100%", opacity: 0, transition: { duration: 0.25, ease: EASE_IN_OUT } },
};

/* ─── Viewport config for useInView ─────────────────────────────────────── */
export const VIEWPORT_ONCE    = { once: true, margin: "-80px" } as const;
export const VIEWPORT_PERSIST = { once: false, margin: "-80px" } as const;
