'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ============================================================================
// GSAP PLUGIN REGISTRATION
// ============================================================================
// Register plugins only once on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// TYPES
// ============================================================================
export interface ScrollTriggerConfig {
  trigger: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | string | Element;
  pinSpacing?: boolean | string;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  onUpdate?: (self: ScrollTrigger) => void;
  onToggle?: (self: ScrollTrigger) => void;
  onRefresh?: (self: ScrollTrigger) => void;
  once?: boolean;
  anticipatePin?: number;
  invalidateOnRefresh?: boolean;
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number | gsap.StaggerVars;
  scrollTrigger?: ScrollTriggerConfig;
}

export interface ParallaxConfig {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  scrub?: boolean | number;
}

export interface HorizontalScrollConfig {
  sections: string | Element | Element[];
  container: string | Element;
  scrub?: boolean | number;
  snap?: boolean | number | number[];
  pinSpacing?: boolean;
}

export interface PinnedSectionConfig {
  trigger: string | Element;
  start?: string;
  end?: string;
  pinSpacing?: boolean | string;
  anticipatePin?: number;
}

// ============================================================================
// CUSTOM EASING CURVES
// ============================================================================
export const easings = {
  // Smooth eases for elegant animations
  smooth: 'power2.out',
  smoothIn: 'power2.in',
  smoothInOut: 'power2.inOut',

  // Snappy eases for UI interactions
  snappy: 'power3.out',
  snappyIn: 'power3.in',
  snappyInOut: 'power3.inOut',

  // Bouncy eases for playful animations
  bounce: 'bounce.out',
  bounceIn: 'bounce.in',
  bounceInOut: 'bounce.inOut',

  // Elastic eases for springy effects
  elastic: 'elastic.out(1, 0.3)',
  elasticIn: 'elastic.in(1, 0.3)',
  elasticInOut: 'elastic.inOut(1, 0.3)',

  // Back eases for overshoot effects
  back: 'back.out(1.7)',
  backIn: 'back.in(1.7)',
  backInOut: 'back.inOut(1.7)',

  // Expo eases for dramatic entrances
  expo: 'expo.out',
  expoIn: 'expo.in',
  expoInOut: 'expo.inOut',

  // Custom bezier curves
  custom: {
    subtle: 'M0,0 C0.25,0.1 0.25,1 1,1',
    dramatic: 'M0,0 C0.7,0 0.3,1 1,1',
    gentle: 'M0,0 C0.4,0 0.2,1 1,1',
  },
} as const;

// ============================================================================
// DEFAULT CONFIGURATIONS
// ============================================================================
export const defaultScrollTriggerConfig: Partial<ScrollTriggerConfig> = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
  markers: false,
};

export const defaultAnimationConfig: AnimationConfig = {
  duration: 0.8,
  delay: 0,
  ease: easings.smooth,
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get safe animation duration based on user preferences
 */
export const getSafeDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0 : duration;
};

/**
 * Get safe animation config respecting reduced motion
 */
export const getSafeAnimationConfig = (config: AnimationConfig): AnimationConfig => {
  if (prefersReducedMotion()) {
    return {
      ...config,
      duration: 0,
      delay: 0,
    };
  }
  return config;
};

/**
 * Create a fade animation
 */
export const createFadeAnimation = (
  element: gsap.TweenTarget,
  config: AnimationConfig = {}
): gsap.core.Tween => {
  const safeConfig = getSafeAnimationConfig({
    ...defaultAnimationConfig,
    ...config,
  });

  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: safeConfig.duration,
      delay: safeConfig.delay,
      ease: safeConfig.ease,
      scrollTrigger: safeConfig.scrollTrigger,
    }
  );
};

/**
 * Create a slide animation
 */
export const createSlideAnimation = (
  element: gsap.TweenTarget,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 50,
  config: AnimationConfig = {}
): gsap.core.Tween => {
  const safeConfig = getSafeAnimationConfig({
    ...defaultAnimationConfig,
    ...config,
  });

  const fromVars: gsap.TweenVars = { opacity: 0 };
  const toVars: gsap.TweenVars = {
    opacity: 1,
    duration: safeConfig.duration,
    delay: safeConfig.delay,
    ease: safeConfig.ease,
    scrollTrigger: safeConfig.scrollTrigger,
  };

  switch (direction) {
    case 'up':
      fromVars.y = distance;
      toVars.y = 0;
      break;
    case 'down':
      fromVars.y = -distance;
      toVars.y = 0;
      break;
    case 'left':
      fromVars.x = distance;
      toVars.x = 0;
      break;
    case 'right':
      fromVars.x = -distance;
      toVars.x = 0;
      break;
  }

  return gsap.fromTo(element, fromVars, toVars);
};

/**
 * Create a scale animation
 */
export const createScaleAnimation = (
  element: gsap.TweenTarget,
  fromScale: number = 0.8,
  config: AnimationConfig = {}
): gsap.core.Tween => {
  const safeConfig = getSafeAnimationConfig({
    ...defaultAnimationConfig,
    ...config,
  });

  return gsap.fromTo(
    element,
    { opacity: 0, scale: fromScale },
    {
      opacity: 1,
      scale: 1,
      duration: safeConfig.duration,
      delay: safeConfig.delay,
      ease: safeConfig.ease,
      scrollTrigger: safeConfig.scrollTrigger,
    }
  );
};

/**
 * Create a stagger animation for multiple elements
 */
export const createStaggerAnimation = (
  elements: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  stagger: number | gsap.StaggerVars = 0.1,
  config: AnimationConfig = {}
): gsap.core.Tween => {
  const safeConfig = getSafeAnimationConfig({
    ...defaultAnimationConfig,
    ...config,
  });

  return gsap.fromTo(elements, fromVars, {
    ...toVars,
    duration: safeConfig.duration,
    delay: safeConfig.delay,
    ease: safeConfig.ease,
    stagger: prefersReducedMotion() ? 0 : stagger,
    scrollTrigger: safeConfig.scrollTrigger,
  });
};

/**
 * Create a parallax effect
 */
export const createParallaxEffect = (
  element: gsap.TweenTarget,
  config: ParallaxConfig = {}
): gsap.core.Tween => {
  const { speed = 0.5, direction = 'vertical', scrub = true } = config;

  if (prefersReducedMotion()) {
    return gsap.set(element, {}) as unknown as gsap.core.Tween;
  }

  const movement = speed * 100;
  const property = direction === 'vertical' ? 'y' : 'x';

  return gsap.fromTo(
    element,
    { [property]: -movement },
    {
      [property]: movement,
      ease: 'none',
      scrollTrigger: {
        trigger: element as Element,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
      },
    }
  );
};

/**
 * Create horizontal scroll section
 */
export const createHorizontalScroll = (
  config: HorizontalScrollConfig
): ScrollTrigger => {
  const { sections, container, scrub = 1, snap = false, pinSpacing = true } = config;

  if (prefersReducedMotion()) {
    return ScrollTrigger.create({
      trigger: container as Element,
    });
  }

  const sectionsEl = typeof sections === 'string'
    ? gsap.utils.toArray<Element>(sections)
    : Array.isArray(sections) ? sections : [sections];

  const totalWidth = sectionsEl.reduce((acc, el) => acc + (el as HTMLElement).offsetWidth, 0);

  gsap.to(sections, {
    x: () => -(totalWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: container as Element,
      pin: true,
      scrub,
      ...(snap && {
        snap: {
          snapTo: typeof snap === 'number'
            ? 1 / (sectionsEl.length - 1)
            : Array.isArray(snap) ? snap : 1 / (sectionsEl.length - 1),
          duration: { min: 0.2, max: 0.5 },
          ease: 'power1.inOut',
        },
      }),
      end: () => `+=${totalWidth}`,
      pinSpacing,
      invalidateOnRefresh: true,
    },
  });

  return ScrollTrigger.getAll()[ScrollTrigger.getAll().length - 1];
};

/**
 * Create pinned section
 */
export const createPinnedSection = (
  config: PinnedSectionConfig
): ScrollTrigger => {
  const {
    trigger,
    start = 'top top',
    end = 'bottom top',
    pinSpacing = true,
    anticipatePin = 1,
  } = config;

  return ScrollTrigger.create({
    trigger: trigger as Element,
    start,
    end,
    pin: true,
    pinSpacing,
    anticipatePin,
  });
};

/**
 * Kill all ScrollTrigger instances
 */
export const killAllScrollTriggers = (): void => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

/**
 * Refresh all ScrollTrigger instances
 */
export const refreshScrollTriggers = (): void => {
  ScrollTrigger.refresh();
};

/**
 * Create a GSAP context for cleanup
 */
export const createGSAPContext = (
  scope: Element | string | null
): gsap.Context => {
  return gsap.context(() => {}, scope || undefined);
};

// ============================================================================
// EXPORTS
// ============================================================================
export { gsap, ScrollTrigger };
