'use client';

import { ReactNode, Children, useEffect, useRef, useState, cloneElement, isValidElement } from 'react';
import { DURATIONS_MS, DISTANCES, SCALES, THRESHOLDS } from '@/lib/animations';
import { useReducedMotion } from '@/hooks';

interface StaggerProps {
  children: ReactNode;
  delay?: number; // Delay entre cada elemento (ms)
  initialDelay?: number; // Delay antes de empezar
  animation?: 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'fadeIn';
  duration?: 'fast' | 'normal' | 'slow';
  className?: string;
  once?: boolean;
}

const durationValues = {
  fast: DURATIONS_MS.fast,
  normal: DURATIONS_MS.medium,
  slow: DURATIONS_MS.slower,
};

const getInitialStyles = (animation: string) => {
  switch (animation) {
    case 'slideUp':
      return { opacity: 0, transform: `translateY(${DISTANCES.md}px)` };
    case 'slideLeft':
      return { opacity: 0, transform: `translateX(${DISTANCES.md}px)` };
    case 'slideRight':
      return { opacity: 0, transform: `translateX(-${DISTANCES.md}px)` };
    case 'scaleUp':
      return { opacity: 0, transform: `scale(${SCALES.slight})` };
    case 'fadeIn':
    default:
      return { opacity: 0, transform: 'none' };
  }
};

const getVisibleStyles = () => ({
  opacity: 1,
  transform: 'none',
});

export default function Stagger({
  children,
  delay = 80,
  initialDelay = 0,
  animation = 'slideUp',
  duration = 'normal',
  className = '',
  once = true,
}: StaggerProps) {
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

  const childArray = Children.toArray(children);

  // Sin animación si reduced motion está activo
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, index) => {
        if (!isValidElement(child)) return child;

        const childDelay = initialDelay + index * delay;
        const styles = isVisible ? getVisibleStyles() : getInitialStyles(animation);

        return cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
          style: {
            ...styles,
            transition: `opacity ${durationValues[duration]}ms var(--ease-out-expo),
                         transform ${durationValues[duration]}ms var(--ease-out-expo)`,
            transitionDelay: `${childDelay}ms`,
            willChange: 'opacity, transform',
            ...(child.props as { style?: React.CSSProperties }).style,
          },
        });
      })}
    </div>
  );
}
