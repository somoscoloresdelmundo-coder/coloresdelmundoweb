'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { DURATIONS_MS, DISTANCES, THRESHOLDS } from '@/lib/animations';
import { useReducedMotion } from '@/hooks';

type Direction = 'up' | 'down' | 'left' | 'right';

interface SlideInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: 'fast' | 'normal' | 'slow';
  distance?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  once?: boolean;
}

const durationValues = {
  fast: DURATIONS_MS.fast,
  normal: DURATIONS_MS.medium,
  slow: DURATIONS_MS.slower,
};

const distanceValues = {
  sm: DISTANCES.xs,
  md: DISTANCES.sm,
  lg: DISTANCES.md,
  xl: DISTANCES.lg,
};

const getTransform = (direction: Direction, distance: number, isVisible: boolean) => {
  if (isVisible) return 'translate3d(0, 0, 0)';

  switch (direction) {
    case 'up':
      return `translate3d(0, ${distance}px, 0)`;
    case 'down':
      return `translate3d(0, -${distance}px, 0)`;
    case 'left':
      return `translate3d(${distance}px, 0, 0)`;
    case 'right':
      return `translate3d(-${distance}px, 0, 0)`;
  }
};

export default function SlideIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 'normal',
  distance = 'lg',
  className = '',
  once = true,
}: SlideInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Si reduced motion está activo, mostrar inmediatamente
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

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
      { threshold: THRESHOLDS.minimal }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [once, reducedMotion]);

  // Sin animación si reduced motion está activo
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(direction, distanceValues[distance], isVisible),
        transition: `opacity ${durationValues[duration]}ms var(--ease-out-expo),
                     transform ${durationValues[duration]}ms var(--ease-out-expo)`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
