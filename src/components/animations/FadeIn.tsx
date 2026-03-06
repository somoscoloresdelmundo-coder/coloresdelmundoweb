'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
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
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [once]);

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
