'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  getSafeAnimationConfig,
  createGSAPContext,
  type AnimationConfig,
  type ScrollTriggerConfig,
  type ParallaxConfig,
  type HorizontalScrollConfig,
  type PinnedSectionConfig,
} from '@/lib/animations';
import type { AnimationPreset, StaggerPreset } from '@/lib/animations';

// ============================================================================
// TYPES
// ============================================================================
export interface UseGSAPAnimationOptions {
  /** Animation preset or custom from/to values */
  preset?: AnimationPreset;
  /** Custom from values (overrides preset) */
  from?: gsap.TweenVars;
  /** Custom to values (overrides preset) */
  to?: gsap.TweenVars;
  /** Animation configuration */
  config?: AnimationConfig;
  /** Whether to trigger on mount */
  autoPlay?: boolean;
  /** Delay before animation starts */
  delay?: number;
  /** Dependencies to re-trigger animation */
  deps?: React.DependencyList;
}

export interface UseScrollTriggerOptions {
  /** Animation preset or custom from/to values */
  preset?: AnimationPreset;
  /** Custom from values */
  from?: gsap.TweenVars;
  /** Custom to values */
  to?: gsap.TweenVars;
  /** Animation configuration */
  config?: AnimationConfig;
  /** ScrollTrigger configuration */
  scrollTrigger?: Partial<ScrollTriggerConfig>;
  /** Trigger once only */
  once?: boolean;
  /** Start position */
  start?: string;
  /** End position */
  end?: string;
  /** Scrub mode */
  scrub?: boolean | number;
}

export interface UseStaggerOptions extends UseScrollTriggerOptions {
  /** Stagger preset */
  staggerPreset?: StaggerPreset;
  /** Stagger value */
  stagger?: number | gsap.StaggerVars;
  /** Selector for child elements */
  childSelector?: string;
}

export interface UseParallaxOptions extends ParallaxConfig {
  /** Dependencies to re-trigger effect */
  deps?: React.DependencyList;
}

export interface UsePinnedSectionOptions extends Partial<PinnedSectionConfig> {
  /** Duration multiplier for pin */
  durationMultiplier?: number;
  /** Dependencies to re-trigger effect */
  deps?: React.DependencyList;
}

export interface UseHorizontalScrollOptions {
  /** Scrub value */
  scrub?: boolean | number;
  /** Enable snapping */
  snap?: boolean | number | number[];
  /** Pin spacing enabled */
  pinSpacing?: boolean;
  /** Dependencies to re-trigger effect */
  deps?: React.DependencyList;
}

export interface AnimationControls {
  /** Play the animation */
  play: () => void;
  /** Pause the animation */
  pause: () => void;
  /** Reverse the animation */
  reverse: () => void;
  /** Restart the animation */
  restart: () => void;
  /** Kill the animation */
  kill: () => void;
  /** Check if animation is active */
  isActive: boolean;
  /** Current progress (0-1) */
  progress: number;
}

// ============================================================================
// useGSAPAnimation - Simple animations hook
// ============================================================================
export function useGSAPAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseGSAPAnimationOptions = {}
): [React.RefObject<T | null>, AnimationControls] {
  const ref = useRef<T>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const contextRef = useRef<gsap.Context | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    preset,
    from: customFrom,
    to: customTo,
    config = {},
    autoPlay = true,
    delay = 0,
    deps = [],
  } = options;

  // Merge preset with custom values
  const fromVars = customFrom || preset?.from || { opacity: 0 };
  const toVars = customTo || preset?.to || { opacity: 1 };
  const animConfig = getSafeAnimationConfig({
    ...preset?.config,
    ...config,
    delay: (preset?.config?.delay || 0) + delay + (config.delay || 0),
  });

  const createAnimation = useCallback(() => {
    if (!ref.current || prefersReducedMotion()) return;

    // Clean up previous context
    if (contextRef.current) {
      contextRef.current.revert();
    }

    contextRef.current = createGSAPContext(ref.current);

    contextRef.current.add(() => {
      tweenRef.current = gsap.fromTo(ref.current, fromVars, {
        ...toVars,
        duration: animConfig.duration,
        delay: animConfig.delay,
        ease: animConfig.ease,
        paused: !autoPlay,
        onStart: () => setIsActive(true),
        onComplete: () => setIsActive(false),
        onUpdate: () => {
          if (tweenRef.current) {
            setProgress(tweenRef.current.progress());
          }
        },
      });
    });
  }, [fromVars, toVars, animConfig, autoPlay]);

  useEffect(() => {
    createAnimation();

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, [createAnimation, ...deps]);

  const controls: AnimationControls = {
    play: () => tweenRef.current?.play(),
    pause: () => tweenRef.current?.pause(),
    reverse: () => tweenRef.current?.reverse(),
    restart: () => tweenRef.current?.restart(),
    kill: () => tweenRef.current?.kill(),
    isActive,
    progress,
  };

  return [ref, controls];
}

// ============================================================================
// useScrollTrigger - Scroll-triggered animations hook
// ============================================================================
export function useScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollTriggerOptions = {}
): [React.RefObject<T | null>, ScrollTrigger | null] {
  const ref = useRef<T>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  const {
    preset,
    from: customFrom,
    to: customTo,
    config = {},
    scrollTrigger = {},
    once = false,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
  } = options;

  // Merge preset with custom values
  const fromVars = customFrom || preset?.from || { opacity: 0, y: 40 };
  const toVars = customTo || preset?.to || { opacity: 1, y: 0 };
  const animConfig = getSafeAnimationConfig({
    ...preset?.config,
    ...config,
  });

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    // Clean up previous context
    if (contextRef.current) {
      contextRef.current.revert();
    }

    contextRef.current = createGSAPContext(ref.current);

    contextRef.current.add(() => {
      const tween = gsap.fromTo(ref.current, fromVars, {
        ...toVars,
        duration: animConfig.duration,
        ease: animConfig.ease,
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub,
          once,
          toggleActions: scrub ? undefined : 'play none none reverse',
          ...scrollTrigger,
        },
      });

      // Get the ScrollTrigger instance
      triggerRef.current = tween.scrollTrigger || null;
    });

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, [fromVars, toVars, animConfig, scrollTrigger, once, start, end, scrub]);

  return [ref, triggerRef.current];
}

// ============================================================================
// useStagger - Staggered animations hook
// ============================================================================
export function useStagger<T extends HTMLElement = HTMLDivElement>(
  options: UseStaggerOptions = {}
): [React.RefObject<T | null>, ScrollTrigger | null] {
  const ref = useRef<T>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  const {
    preset,
    staggerPreset,
    from: customFrom,
    to: customTo,
    config = {},
    stagger: customStagger = 0.1,
    childSelector = '> *',
    scrollTrigger = {},
    once = false,
    start = 'top 80%',
    scrub = false,
  } = options;

  // Determine values from stagger preset or regular preset
  const effectivePreset = staggerPreset || preset;
  const fromVars = customFrom || effectivePreset?.from || { opacity: 0, y: 30 };
  const toVars = customTo || effectivePreset?.to || { opacity: 1, y: 0 };
  const staggerValue = staggerPreset?.stagger || customStagger;
  const animConfig = getSafeAnimationConfig({
    ...effectivePreset?.config,
    ...config,
  });

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const children = ref.current.querySelectorAll(childSelector);
    if (children.length === 0) return;

    // Clean up previous context
    if (contextRef.current) {
      contextRef.current.revert();
    }

    contextRef.current = createGSAPContext(ref.current);

    contextRef.current.add(() => {
      const tween = gsap.fromTo(children, fromVars, {
        ...toVars,
        duration: animConfig.duration,
        ease: animConfig.ease,
        stagger: staggerValue,
        scrollTrigger: {
          trigger: ref.current,
          start,
          scrub,
          once,
          toggleActions: scrub ? undefined : 'play none none reverse',
          ...scrollTrigger,
        },
      });

      triggerRef.current = tween.scrollTrigger || null;
    });

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, [fromVars, toVars, animConfig, staggerValue, childSelector, scrollTrigger, once, start, scrub]);

  return [ref, triggerRef.current];
}

// ============================================================================
// useParallax - Parallax effect hook
// ============================================================================
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {}
): React.RefObject<T | null> {
  const ref = useRef<T>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  const {
    speed = 0.3,
    direction = 'vertical',
    scrub = true,
    deps = [],
  } = options;

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    // Clean up previous context
    if (contextRef.current) {
      contextRef.current.revert();
    }

    contextRef.current = createGSAPContext(ref.current);

    const movement = speed * 100;
    const property = direction === 'vertical' ? 'y' : 'x';

    contextRef.current.add(() => {
      gsap.fromTo(
        ref.current,
        { [property]: -movement },
        {
          [property]: movement,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub,
          },
        }
      );
    });

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, [speed, direction, scrub, ...deps]);

  return ref;
}

// ============================================================================
// usePinnedSection - Pinned/sticky section hook
// ============================================================================
export function usePinnedSection<T extends HTMLElement = HTMLDivElement>(
  options: UsePinnedSectionOptions = {}
): [React.RefObject<T | null>, ScrollTrigger | null] {
  const ref = useRef<T>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  const {
    start = 'top top',
    end,
    pinSpacing = true,
    anticipatePin = 1,
    durationMultiplier = 1,
    deps = [],
  } = options;

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    // Clean up previous context
    if (contextRef.current) {
      contextRef.current.revert();
    }

    contextRef.current = createGSAPContext(ref.current);

    contextRef.current.add(() => {
      const endValue = end || `+=${(ref.current?.offsetHeight || 500) * durationMultiplier}`;

      triggerRef.current = ScrollTrigger.create({
        trigger: ref.current,
        start,
        end: endValue,
        pin: true,
        pinSpacing,
        anticipatePin,
      });
    });

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, [start, end, pinSpacing, anticipatePin, durationMultiplier, ...deps]);

  return [ref, triggerRef.current];
}

// ============================================================================
// useHorizontalScroll - Horizontal scroll section hook
// ============================================================================
export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseHorizontalScrollOptions = {}
): [React.RefObject<T | null>, React.RefObject<HTMLDivElement | null>, ScrollTrigger | null] {
  const containerRef = useRef<T>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  const {
    scrub = 1,
    snap = false,
    pinSpacing = true,
    deps = [],
  } = options;

  useEffect(() => {
    if (!containerRef.current || !panelRef.current || prefersReducedMotion()) return;

    // Clean up previous context
    if (contextRef.current) {
      contextRef.current.revert();
    }

    contextRef.current = createGSAPContext(containerRef.current);

    contextRef.current.add(() => {
      const sections = gsap.utils.toArray<HTMLElement>(panelRef.current!.children);
      if (sections.length === 0) return;

      const totalWidth = sections.reduce((acc, el) => acc + el.offsetWidth, 0);
      const scrollDistance = totalWidth - window.innerWidth;

      if (scrollDistance <= 0) return;

      const tween = gsap.to(panelRef.current, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub,
          end: () => `+=${scrollDistance}`,
          pinSpacing,
          ...(snap && {
            snap: {
              snapTo: 1 / (sections.length - 1),
              duration: { min: 0.2, max: 0.5 },
              ease: 'power1.inOut',
            },
          }),
          invalidateOnRefresh: true,
        },
      });

      triggerRef.current = tween.scrollTrigger || null;
    });

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, [scrub, snap, pinSpacing, ...deps]);

  return [containerRef, panelRef, triggerRef.current];
}

// ============================================================================
// useTimeline - Timeline hook for complex sequences
// ============================================================================
export function useTimeline<T extends HTMLElement = HTMLDivElement>(
  createTimeline: (tl: gsap.core.Timeline, element: T) => void,
  deps: React.DependencyList = []
): [React.RefObject<T | null>, gsap.core.Timeline | null, AnimationControls] {
  const ref = useRef<T>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const contextRef = useRef<gsap.Context | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    // Clean up previous context
    if (contextRef.current) {
      contextRef.current.revert();
    }

    contextRef.current = createGSAPContext(ref.current);

    contextRef.current.add(() => {
      timelineRef.current = gsap.timeline({
        paused: true,
        onStart: () => setIsActive(true),
        onComplete: () => setIsActive(false),
        onUpdate: () => {
          if (timelineRef.current) {
            setProgress(timelineRef.current.progress());
          }
        },
      });

      createTimeline(timelineRef.current, ref.current!);
    });

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, [...deps]);

  const controls: AnimationControls = {
    play: () => timelineRef.current?.play(),
    pause: () => timelineRef.current?.pause(),
    reverse: () => timelineRef.current?.reverse(),
    restart: () => timelineRef.current?.restart(),
    kill: () => timelineRef.current?.kill(),
    isActive,
    progress,
  };

  return [ref, timelineRef.current, controls];
}

// ============================================================================
// useReducedMotion - Check for reduced motion preference
// ============================================================================
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}

// ============================================================================
// useScrollProgress - Track scroll progress
// ============================================================================
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  options: {
    start?: string;
    end?: string;
  } = {}
): [React.RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  const contextRef = useRef<gsap.Context | null>(null);

  const { start = 'top bottom', end = 'bottom top' } = options;

  useEffect(() => {
    if (!ref.current) return;

    // Clean up previous context
    if (contextRef.current) {
      contextRef.current.revert();
    }

    contextRef.current = createGSAPContext(ref.current);

    contextRef.current.add(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start,
        end,
        onUpdate: (self) => setProgress(self.progress),
      });
    });

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, [start, end]);

  return [ref, progress];
}
