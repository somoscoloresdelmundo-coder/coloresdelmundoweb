'use client';

import { ReactNode, useEffect, useRef, useState, ElementType } from 'react';

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
  fast: 300,
  normal: 500,
  slow: 700,
};

const getInitialStyles = (animation: Animation): React.CSSProperties => {
  const base: React.CSSProperties = { opacity: 0 };

  switch (animation) {
    case 'up':
      return { ...base, transform: 'translateY(30px)' };
    case 'left':
      return { ...base, transform: 'translateX(30px)' };
    case 'right':
      return { ...base, transform: 'translateX(-30px)' };
    case 'scale':
      return { ...base, transform: 'scale(0.9)' };
    case 'blur':
      return { ...base, filter: 'blur(10px)' };
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
  threshold = 0.15,
  className = '',
  once = true,
  as: Component = 'div',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, [once, threshold]);

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
