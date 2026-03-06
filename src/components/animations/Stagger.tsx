'use client';

import { ReactNode, Children, useEffect, useRef, useState, cloneElement, isValidElement } from 'react';

interface StaggerProps {
  children: ReactNode;
  delay?: number; // Delay entre cada elemento
  initialDelay?: number; // Delay antes de empezar
  animation?: 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'fadeIn';
  duration?: 'fast' | 'normal' | 'slow';
  className?: string;
  once?: boolean;
}

const durationValues = {
  fast: 200,
  normal: 400,
  slow: 600,
};

const getInitialStyles = (animation: string) => {
  switch (animation) {
    case 'slideUp':
      return { opacity: 0, transform: 'translateY(24px)' };
    case 'slideLeft':
      return { opacity: 0, transform: 'translateX(24px)' };
    case 'slideRight':
      return { opacity: 0, transform: 'translateX(-24px)' };
    case 'scaleUp':
      return { opacity: 0, transform: 'scale(0.9)' };
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

  const childArray = Children.toArray(children);

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
