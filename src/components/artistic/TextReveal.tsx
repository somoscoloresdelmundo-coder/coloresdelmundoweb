'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

type RevealAnimation = 'fade-up' | 'fade-down' | 'wave' | 'typewriter' | 'gradient' | 'split';

interface TextRevealProps {
  children: ReactNode;
  animation?: RevealAnimation;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  triggerOnScroll?: boolean;
}

/**
 * Componente de tipografía cinética
 * Anima texto con diferentes efectos artísticos
 */
export default function TextReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  staggerDelay = 50,
  className = '',
  as: Component = 'div',
  triggerOnScroll = true,
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(!triggerOnScroll);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerOnScroll) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [triggerOnScroll]);

  // Si es texto simple, lo convertimos a string
  const text = typeof children === 'string' ? children : '';

  // Componente para animación por letras/palabras
  const renderAnimatedText = () => {
    if (animation === 'typewriter') {
      return (
        <span
          className="typewriter"
          style={{
            animationDelay: `${delay}ms`,
            animationPlayState: isVisible ? 'running' : 'paused',
          }}
        >
          {children}
        </span>
      );
    }

    if (animation === 'gradient') {
      return (
        <span
          className={`text-gradient-animated ${isVisible ? '' : 'opacity-0'}`}
          style={{
            animationDelay: `${delay}ms`,
            transition: 'opacity 0.5s ease',
          }}
        >
          {children}
        </span>
      );
    }

    if (animation === 'wave' && text) {
      const letters = text.split('');
      return (
        <span className="text-wave">
          {letters.map((letter, i) => (
            <span
              key={i}
              style={{
                animationDelay: `${delay + i * staggerDelay}ms`,
                animationPlayState: isVisible ? 'running' : 'paused',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </span>
      );
    }

    if (animation === 'split' && text) {
      const words = text.split(' ');
      return (
        <span className="inline-flex flex-wrap gap-x-2">
          {words.map((word, i) => (
            <span
              key={i}
              className="overflow-hidden inline-block"
            >
              <span
                className="inline-block transition-transform duration-500"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                  transitionDelay: `${delay + i * staggerDelay}ms`,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </span>
      );
    }

    // Animaciones fade-up y fade-down
    const translateDirection = animation === 'fade-down' ? '-20px' : '20px';
    return (
      <span
        className="inline-block transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : `translateY(${translateDirection})`,
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {children}
      </span>
    );
  };

  return (
    <Component ref={ref as any} className={className}>
      {renderAnimatedText()}
    </Component>
  );
}

/**
 * Texto con efecto de pincelada de fondo
 */
export function BrushText({
  children,
  color = 'naranja',
  className = '',
}: {
  children: ReactNode;
  color?: 'azul' | 'lima' | 'naranja' | 'terracota';
  className?: string;
}) {
  return (
    <span className={`brush-stroke brush-stroke--${color} ${className}`}>
      {children}
    </span>
  );
}

/**
 * Contador animado para estadísticas
 */
export function AnimatedNumber({
  value,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
}: {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: ease-out-expo
      const easedProgress = 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.floor(startValue + (value - startValue) * easedProgress);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return (
    <span ref={ref} className={`stat-artistic ${className}`} data-number={value}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}
