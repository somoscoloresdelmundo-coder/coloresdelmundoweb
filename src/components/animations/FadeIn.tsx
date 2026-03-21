'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { THRESHOLDS } from '@/lib/animations';
import { useReducedMotion } from '@/hooks';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: 'fast' | 'normal' | 'slow';
  className?: string;
  once?: boolean; // Solo animar una vez
}

const durationClasses = {
  fast: 'var(--anim-fast)',
  normal: 'var(--anim-normal)',
  slow: 'var(--anim-slow)',
};

export default function FadeIn({
  children,
  delay = 0,
  duration = 'normal',
  className = '',
  once = true,
}: FadeInProps) {
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
        transition: `opacity ${durationClasses[duration]} var(--ease-out)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
