'use client';

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================
export {
  // Durations
  DURATIONS,
  DURATIONS_MS,
  TAILWIND_DURATIONS,
  // Thresholds
  THRESHOLDS,
  // Stagger
  STAGGER,
  // Distances
  DISTANCES,
  // Scales
  SCALES,
  // Spring configs
  SPRING_CONFIGS,
  // Blur
  BLUR,
  // Elevation
  ELEVATION,
  // Magnetic
  MAGNETIC,
  // Particles
  PARTICLES,
  // Types
  type DurationKey,
  type ThresholdKey,
  type StaggerKey,
  type DistanceKey,
  type ScaleKey,
  type SpringConfigKey,
} from './constants';

// ============================================================================
// GSAP CORE EXPORTS
// ============================================================================
export {
  // GSAP instances
  gsap,
  ScrollTrigger,
  // Types
  type ScrollTriggerConfig,
  type AnimationConfig,
  type ParallaxConfig,
  type HorizontalScrollConfig,
  type PinnedSectionConfig,
  // Easings
  easings,
  // Default configs
  defaultScrollTriggerConfig,
  defaultAnimationConfig,
  // Utility functions
  prefersReducedMotion,
  getSafeDuration,
  getSafeAnimationConfig,
  // Animation creators
  createFadeAnimation,
  createSlideAnimation,
  createScaleAnimation,
  createStaggerAnimation,
  createParallaxEffect,
  createHorizontalScroll,
  createPinnedSection,
  // ScrollTrigger utilities
  killAllScrollTriggers,
  refreshScrollTriggers,
  createGSAPContext,
} from './gsap';

// ============================================================================
// PRESET EXPORTS
// ============================================================================
export {
  // Types
  type AnimationPreset,
  type StaggerPreset,
  type ScrollAnimationPreset,
  type PresetName,
  type StaggerPresetName,
  // Fade presets
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  fadeInDown,
  fadeIn,
  // Scale presets
  scaleIn,
  scaleInRotate,
  scaleInBounce,
  scaleInFromLarge,
  // Rotate presets
  rotateIn,
  rotateInRight,
  flipInX,
  flipInY,
  // Slide presets
  slideInLeft,
  slideInRight,
  slideInUp,
  slideInDown,
  // Stagger presets
  staggerChildren,
  staggerFromLeft,
  staggerFromRight,
  staggerScale,
  staggerGrid,
  staggerFromCenter,
  staggerRandom,
  // Parallax presets
  parallaxSubtle,
  parallaxMedium,
  parallaxStrong,
  parallaxHorizontal,
  parallaxSmooth,
  // Horizontal scroll presets
  horizontalScrollConfig,
  horizontalScrollSnap,
  horizontalScrollSmooth,
  // Pinned section presets
  pinnedSectionConfig,
  pinnedSectionLong,
  pinnedSectionNoSpacing,
  pinnedSectionCenter,
  // ScrollTrigger presets
  scrollTriggerFade,
  scrollTriggerOnce,
  scrollTriggerReverse,
  scrollTriggerScrub,
  scrollTriggerScrubSmooth,
  // Text animation presets
  textRevealChars,
  textRevealWords,
  textRevealLines,
  // Preset getters
  getPreset,
  getStaggerPreset,
  mergePreset,
} from './presets';
