'use client';

import { ReactNode, useEffect, useRef, useState, ElementType } from 'react';
import { DURATIONS_MS, DISTANCES, SCALES, BLUR, THRESHOLDS } from '@/lib/animations';
import { useReducedMotion } from '@/hooks';

type Animation = 'up' | 'left' | 'right' | 'scale' | 'blur' | 'fade';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: 'fast' | 'normal' | 'slow';
  threshold?: number; // 0-1, cuánto del elemento debe ser visible
  className?: string;
  once?: boolean;
  as?: ElementType; // Permite cambiar el elemento wrapper
}

const durationValues = {
  fast: DURATIONS_MS.normal,
  normal: DURATIONS_MS.slow,
  slow: DURATIONS_MS.verySlow,
};

const getInitialStyles = (animation: Animation): React.CSSProperties => {
  const base: React.CSSProperties = { opacity: 0 };

  switch (animation) {
    case 'up':
      return { ...base, transform: `translateY(${DISTANCES.normal}px)` };
    case 'left':
      return { ...base, transform: `translateX(${DISTANCES.normal}px)` };
    case 'right':
      return { ...base, transform: `translateX(-${DISTANCES.normal}px)` };
    case 'scale':
      return { ...base, transform: `scale(${SCALES.slight})` };
    case 'blur':
      return { ...base, filter: `blur(${BLUR.medium}px)` };
    case 'fade':
    default:
      return base;
  }
};

const getVisibleStyles = (): React.CSSProperties => ({
  opacity: 1,
  transform: 'none',
  filter: 'none',
});

export default function ScrollReveal({
  children,
  animation = 'up',
  delay = 0,
  duration = 'normal',
  threshold = THRESHOLDS.low,
  className = '',
  once = true,
  as: Component = 'div',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Si reduced motion está activo, mostrar inmediatamente
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    // Verificar soporte de CSS scroll-driven animations
    const supportsScrollTimeline = CSS.supports('animation-timeline', 'view()');

    if (supportsScrollTimeline) {
      // Si el navegador soporta scroll-driven animations nativas,
      // las usamos desde CSS (clase scroll-reveal)
      setIsVisible(true);
      return;
    }

    // Fallback con IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [once, threshold, reducedMotion]);

  // Sin animación si reduced motion está activo
  if (reducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const styles: React.CSSProperties = {
    ...(isVisible ? getVisibleStyles() : getInitialStyles(animation)),
    transition: `
      opacity ${durationValues[duration]}ms var(--ease-out-expo),
      transform ${durationValues[duration]}ms var(--ease-out-expo),
      filter ${durationValues[duration]}ms var(--ease-out)
    `,
    transitionDelay: `${delay}ms`,
    willChange: 'opacity, transform, filter',
  };

  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      style={styles}
    >
      {children}
    </Component>
  );
}
