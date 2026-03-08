'use client';

import type { AnimationConfig, ScrollTriggerConfig, ParallaxConfig } from './gsap';
import { easings, defaultAnimationConfig, defaultScrollTriggerConfig } from './gsap';

// ============================================================================
// TYPES
// ============================================================================
export interface AnimationPreset {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  config?: AnimationConfig;
}

export interface StaggerPreset extends AnimationPreset {
  stagger: number | gsap.StaggerVars;
}

export interface ScrollAnimationPreset extends AnimationPreset {
  scrollTrigger: Partial<ScrollTriggerConfig>;
}

// ============================================================================
// FADE PRESETS
// ============================================================================

/**
 * Fade in from bottom with upward movement
 */
export const fadeInUp: AnimationPreset = {
  from: {
    opacity: 0,
    y: 40,
  },
  to: {
    opacity: 1,
    y: 0,
  },
  config: {
    duration: 0.8,
    ease: easings.smooth,
  },
};

/**
 * Fade in from left
 */
export const fadeInLeft: AnimationPreset = {
  from: {
    opacity: 0,
    x: -40,
  },
  to: {
    opacity: 1,
    x: 0,
  },
  config: {
    duration: 0.8,
    ease: easings.smooth,
  },
};

/**
 * Fade in from right
 */
export const fadeInRight: AnimationPreset = {
  from: {
    opacity: 0,
    x: 40,
  },
  to: {
    opacity: 1,
    x: 0,
  },
  config: {
    duration: 0.8,
    ease: easings.smooth,
  },
};

/**
 * Fade in from top
 */
export const fadeInDown: AnimationPreset = {
  from: {
    opacity: 0,
    y: -40,
  },
  to: {
    opacity: 1,
    y: 0,
  },
  config: {
    duration: 0.8,
    ease: easings.smooth,
  },
};

/**
 * Simple fade in without movement
 */
export const fadeIn: AnimationPreset = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
  config: {
    duration: 0.6,
    ease: easings.smooth,
  },
};

// ============================================================================
// SCALE PRESETS
// ============================================================================

/**
 * Scale in from smaller size
 */
export const scaleIn: AnimationPreset = {
  from: {
    opacity: 0,
    scale: 0.85,
  },
  to: {
    opacity: 1,
    scale: 1,
  },
  config: {
    duration: 0.7,
    ease: easings.back,
  },
};

/**
 * Scale in from center with slight rotation
 */
export const scaleInRotate: AnimationPreset = {
  from: {
    opacity: 0,
    scale: 0.8,
    rotation: -5,
  },
  to: {
    opacity: 1,
    scale: 1,
    rotation: 0,
  },
  config: {
    duration: 0.8,
    ease: easings.back,
  },
};

/**
 * Scale up with bounce effect
 */
export const scaleInBounce: AnimationPreset = {
  from: {
    opacity: 0,
    scale: 0.5,
  },
  to: {
    opacity: 1,
    scale: 1,
  },
  config: {
    duration: 1,
    ease: easings.elastic,
  },
};

/**
 * Scale in from larger size (zoom out effect)
 */
export const scaleInFromLarge: AnimationPreset = {
  from: {
    opacity: 0,
    scale: 1.2,
  },
  to: {
    opacity: 1,
    scale: 1,
  },
  config: {
    duration: 0.8,
    ease: easings.smooth,
  },
};

// ============================================================================
// ROTATE PRESETS
// ============================================================================

/**
 * Rotate in from the left
 */
export const rotateIn: AnimationPreset = {
  from: {
    opacity: 0,
    rotation: -15,
    transformOrigin: 'left center',
  },
  to: {
    opacity: 1,
    rotation: 0,
  },
  config: {
    duration: 0.8,
    ease: easings.back,
  },
};

/**
 * Rotate in from the right
 */
export const rotateInRight: AnimationPreset = {
  from: {
    opacity: 0,
    rotation: 15,
    transformOrigin: 'right center',
  },
  to: {
    opacity: 1,
    rotation: 0,
  },
  config: {
    duration: 0.8,
    ease: easings.back,
  },
};

/**
 * Flip in on X axis
 */
export const flipInX: AnimationPreset = {
  from: {
    opacity: 0,
    rotationX: -90,
    transformOrigin: 'center top',
  },
  to: {
    opacity: 1,
    rotationX: 0,
  },
  config: {
    duration: 0.8,
    ease: easings.back,
  },
};

/**
 * Flip in on Y axis
 */
export const flipInY: AnimationPreset = {
  from: {
    opacity: 0,
    rotationY: -90,
    transformOrigin: 'left center',
  },
  to: {
    opacity: 1,
    rotationY: 0,
  },
  config: {
    duration: 0.8,
    ease: easings.back,
  },
};

// ============================================================================
// SLIDE PRESETS
// ============================================================================

/**
 * Slide in from left with full element width
 */
export const slideInLeft: AnimationPreset = {
  from: {
    opacity: 0,
    x: '-100%',
  },
  to: {
    opacity: 1,
    x: '0%',
  },
  config: {
    duration: 0.8,
    ease: easings.expo,
  },
};

/**
 * Slide in from right with full element width
 */
export const slideInRight: AnimationPreset = {
  from: {
    opacity: 0,
    x: '100%',
  },
  to: {
    opacity: 1,
    x: '0%',
  },
  config: {
    duration: 0.8,
    ease: easings.expo,
  },
};

/**
 * Slide in from bottom
 */
export const slideInUp: AnimationPreset = {
  from: {
    opacity: 0,
    y: '100%',
  },
  to: {
    opacity: 1,
    y: '0%',
  },
  config: {
    duration: 0.8,
    ease: easings.expo,
  },
};

/**
 * Slide in from top
 */
export const slideInDown: AnimationPreset = {
  from: {
    opacity: 0,
    y: '-100%',
  },
  to: {
    opacity: 1,
    y: '0%',
  },
  config: {
    duration: 0.8,
    ease: easings.expo,
  },
};

// ============================================================================
// STAGGER PRESETS
// ============================================================================

/**
 * Stagger children with fade in up effect
 */
export const staggerChildren: StaggerPreset = {
  from: {
    opacity: 0,
    y: 30,
  },
  to: {
    opacity: 1,
    y: 0,
  },
  stagger: 0.1,
  config: {
    duration: 0.6,
    ease: easings.smooth,
  },
};

/**
 * Stagger children from left
 */
export const staggerFromLeft: StaggerPreset = {
  from: {
    opacity: 0,
    x: -30,
  },
  to: {
    opacity: 1,
    x: 0,
  },
  stagger: 0.08,
  config: {
    duration: 0.5,
    ease: easings.smooth,
  },
};

/**
 * Stagger children from right
 */
export const staggerFromRight: StaggerPreset = {
  from: {
    opacity: 0,
    x: 30,
  },
  to: {
    opacity: 1,
    x: 0,
  },
  stagger: 0.08,
  config: {
    duration: 0.5,
    ease: easings.smooth,
  },
};

/**
 * Stagger children with scale effect
 */
export const staggerScale: StaggerPreset = {
  from: {
    opacity: 0,
    scale: 0.9,
  },
  to: {
    opacity: 1,
    scale: 1,
  },
  stagger: 0.1,
  config: {
    duration: 0.5,
    ease: easings.back,
  },
};

/**
 * Stagger grid items (2D stagger)
 */
export const staggerGrid: StaggerPreset = {
  from: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  to: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  stagger: {
    amount: 0.6,
    from: 'start',
    grid: 'auto',
    ease: easings.smooth,
  },
  config: {
    duration: 0.6,
    ease: easings.smooth,
  },
};

/**
 * Stagger from center
 */
export const staggerFromCenter: StaggerPreset = {
  from: {
    opacity: 0,
    scale: 0.85,
  },
  to: {
    opacity: 1,
    scale: 1,
  },
  stagger: {
    amount: 0.5,
    from: 'center',
  },
  config: {
    duration: 0.5,
    ease: easings.back,
  },
};

/**
 * Stagger randomly
 */
export const staggerRandom: StaggerPreset = {
  from: {
    opacity: 0,
    y: 20,
  },
  to: {
    opacity: 1,
    y: 0,
  },
  stagger: {
    amount: 0.8,
    from: 'random',
  },
  config: {
    duration: 0.5,
    ease: easings.smooth,
  },
};

// ============================================================================
// PARALLAX PRESETS
// ============================================================================

/**
 * Subtle parallax effect
 */
export const parallaxSubtle: ParallaxConfig = {
  speed: 0.2,
  direction: 'vertical',
  scrub: true,
};

/**
 * Medium parallax effect
 */
export const parallaxMedium: ParallaxConfig = {
  speed: 0.4,
  direction: 'vertical',
  scrub: true,
};

/**
 * Strong parallax effect
 */
export const parallaxStrong: ParallaxConfig = {
  speed: 0.6,
  direction: 'vertical',
  scrub: true,
};

/**
 * Horizontal parallax
 */
export const parallaxHorizontal: ParallaxConfig = {
  speed: 0.3,
  direction: 'horizontal',
  scrub: true,
};

/**
 * Smooth parallax with delayed scrub
 */
export const parallaxSmooth: ParallaxConfig = {
  speed: 0.3,
  direction: 'vertical',
  scrub: 2,
};

// ============================================================================
// HORIZONTAL SCROLL PRESETS
// ============================================================================

/**
 * Standard horizontal scroll configuration
 */
export const horizontalScrollConfig = {
  scrub: 1,
  snap: false,
  pinSpacing: true,
} as const;

/**
 * Horizontal scroll with snapping
 */
export const horizontalScrollSnap = {
  scrub: 1,
  snap: true,
  pinSpacing: true,
} as const;

/**
 * Smooth horizontal scroll
 */
export const horizontalScrollSmooth = {
  scrub: 2,
  snap: false,
  pinSpacing: true,
} as const;

// ============================================================================
// PINNED SECTION PRESETS
// ============================================================================

/**
 * Standard pinned section configuration
 */
export const pinnedSectionConfig = {
  start: 'top top',
  end: 'bottom top',
  pinSpacing: true,
  anticipatePin: 1,
} as const;

/**
 * Pinned section that stays longer
 */
export const pinnedSectionLong = {
  start: 'top top',
  end: '+=150%',
  pinSpacing: true,
  anticipatePin: 1,
} as const;

/**
 * Pinned section without spacing
 */
export const pinnedSectionNoSpacing = {
  start: 'top top',
  end: 'bottom top',
  pinSpacing: false,
  anticipatePin: 1,
} as const;

/**
 * Center-triggered pinned section
 */
export const pinnedSectionCenter = {
  start: 'center center',
  end: '+=100%',
  pinSpacing: true,
  anticipatePin: 1,
} as const;

// ============================================================================
// SCROLL TRIGGER PRESETS
// ============================================================================

/**
 * Default scroll trigger for fade animations
 */
export const scrollTriggerFade: Partial<ScrollTriggerConfig> = {
  ...defaultScrollTriggerConfig,
  start: 'top 85%',
  toggleActions: 'play none none none',
};

/**
 * Scroll trigger that plays once
 */
export const scrollTriggerOnce: Partial<ScrollTriggerConfig> = {
  ...defaultScrollTriggerConfig,
  start: 'top 80%',
  toggleActions: 'play none none none',
  once: true,
};

/**
 * Scroll trigger with reverse on scroll back
 */
export const scrollTriggerReverse: Partial<ScrollTriggerConfig> = {
  ...defaultScrollTriggerConfig,
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play reverse play reverse',
};

/**
 * Scrub-based scroll trigger
 */
export const scrollTriggerScrub: Partial<ScrollTriggerConfig> = {
  start: 'top bottom',
  end: 'bottom top',
  scrub: 1,
};

/**
 * Smooth scrub scroll trigger
 */
export const scrollTriggerScrubSmooth: Partial<ScrollTriggerConfig> = {
  start: 'top bottom',
  end: 'bottom top',
  scrub: 2,
};

// ============================================================================
// TEXT ANIMATION PRESETS
// ============================================================================

/**
 * Split text reveal (for use with SplitText plugin or manual splitting)
 */
export const textRevealChars: StaggerPreset = {
  from: {
    opacity: 0,
    y: '100%',
  },
  to: {
    opacity: 1,
    y: '0%',
  },
  stagger: 0.02,
  config: {
    duration: 0.5,
    ease: easings.smooth,
  },
};

/**
 * Word by word reveal
 */
export const textRevealWords: StaggerPreset = {
  from: {
    opacity: 0,
    y: 20,
    rotationX: -90,
  },
  to: {
    opacity: 1,
    y: 0,
    rotationX: 0,
  },
  stagger: 0.05,
  config: {
    duration: 0.6,
    ease: easings.back,
  },
};

/**
 * Line by line reveal
 */
export const textRevealLines: StaggerPreset = {
  from: {
    opacity: 0,
    y: '100%',
  },
  to: {
    opacity: 1,
    y: '0%',
  },
  stagger: 0.1,
  config: {
    duration: 0.7,
    ease: easings.expo,
  },
};

// ============================================================================
// COMBINED PRESET GETTER
// ============================================================================

export type PresetName =
  | 'fadeInUp'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'fadeInDown'
  | 'fadeIn'
  | 'scaleIn'
  | 'scaleInRotate'
  | 'scaleInBounce'
  | 'scaleInFromLarge'
  | 'rotateIn'
  | 'rotateInRight'
  | 'flipInX'
  | 'flipInY'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideInUp'
  | 'slideInDown';

export type StaggerPresetName =
  | 'staggerChildren'
  | 'staggerFromLeft'
  | 'staggerFromRight'
  | 'staggerScale'
  | 'staggerGrid'
  | 'staggerFromCenter'
  | 'staggerRandom'
  | 'textRevealChars'
  | 'textRevealWords'
  | 'textRevealLines';

const presets: Record<PresetName, AnimationPreset> = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  fadeInDown,
  fadeIn,
  scaleIn,
  scaleInRotate,
  scaleInBounce,
  scaleInFromLarge,
  rotateIn,
  rotateInRight,
  flipInX,
  flipInY,
  slideInLeft,
  slideInRight,
  slideInUp,
  slideInDown,
};

const staggerPresets: Record<StaggerPresetName, StaggerPreset> = {
  staggerChildren,
  staggerFromLeft,
  staggerFromRight,
  staggerScale,
  staggerGrid,
  staggerFromCenter,
  staggerRandom,
  textRevealChars,
  textRevealWords,
  textRevealLines,
};

/**
 * Get an animation preset by name
 */
export const getPreset = (name: PresetName): AnimationPreset => {
  return presets[name];
};

/**
 * Get a stagger preset by name
 */
export const getStaggerPreset = (name: StaggerPresetName): StaggerPreset => {
  return staggerPresets[name];
};

/**
 * Merge preset with custom config
 */
export const mergePreset = (
  preset: AnimationPreset,
  customConfig?: Partial<AnimationConfig>
): AnimationPreset => {
  return {
    ...preset,
    config: {
      ...defaultAnimationConfig,
      ...preset.config,
      ...customConfig,
    },
  };
};
