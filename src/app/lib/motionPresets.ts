import type { Transition } from "motion/react";

const EASE_OUT = [0.77, 0, 0.175, 1] as const;

export function scrollRevealTransition(
  reducedMotion: boolean,
  delay = 0,
): Transition {
  if (reducedMotion) {
    return { duration: 0 };
  }
  return { duration: 0.6, delay, ease: EASE_OUT };
}

export function scrollRevealMotion(reducedMotion: boolean, delay = 0) {
  if (reducedMotion) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: scrollRevealTransition(false, delay),
    viewport: { once: true, margin: "-40px" as const },
  };
}

export function blurRevealFilter(reducedMotion: boolean, blurAmount: number): string | undefined {
  if (reducedMotion || blurAmount <= 0) return undefined;
  return `blur(${blurAmount}px)`;
}

export const portfolioEaseCss = "cubic-bezier(0.77, 0, 0.175, 1)";

/** Shared display stack — Geist first, Helvetica fallback where licensed locally */
export const portfolioFontFamily =
  '"Geist Variable", "Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif';

export const portfolioMonoFamily =
  '"Geist Mono Variable", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

const HERO_EASE = [0.25, 0.1, 0.25, 1] as const;

/** Hero load-in (not scroll-triggered). */
export function heroEntranceMotion(reducedMotion: boolean, delay = 0) {
  if (reducedMotion) {
    return {
      initial: { opacity: 1, x: 0 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay, ease: HERO_EASE },
  };
}

export function heroFadeMotion(reducedMotion: boolean, delay = 0) {
  if (reducedMotion) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, delay, ease: HERO_EASE },
  };
}

/** Experience timeline cards — alternate horizontal entrance. */
export function experienceSlideMotion(
  reducedMotion: boolean,
  index: number,
  side: "content" | "meta" | "icon",
) {
  if (reducedMotion) {
    return {
      initial: { opacity: 1, x: 0, scale: 1 },
      whileInView: { opacity: 1, x: 0, scale: 1 },
      transition: { duration: 0 },
      viewport: { once: true },
    };
  }
  const even = index % 2 === 0;
  if (side === "icon") {
    return {
      initial: { opacity: 0, scale: 0 },
      whileInView: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, ease: EASE_OUT },
      viewport: { once: true },
    };
  }
  const x = side === "content" ? (even ? -50 : 50) : even ? 50 : -50;
  return {
    initial: { opacity: 0, x },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: EASE_OUT },
    viewport: { once: true },
  };
}
