'use client';

import { ReactNode, CSSProperties } from 'react';
import { ColorVariant, colorClasses } from '@/types/ui';

interface MarqueeProps {
  children: ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  gradient?: boolean;
  gradientColor?: string;
  className?: string;
  repeat?: number;
}

const speedValues = {
  slow: '40s',
  normal: '25s',
  fast: '15s',
};

/**
 * Marquee infinito para texto o elementos
 * Ideal para mostrar logos de partners, testimonios, etc.
 */
export default function Marquee({
  children,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  gradient = true,
  gradientColor = 'white',
  className = '',
  repeat = 2,
}: MarqueeProps) {
  const animationStyle: CSSProperties = {
    animationDuration: speedValues[speed],
    animationDirection: direction === 'right' ? 'reverse' : 'normal',
  };

  return (
    <div className={`marquee relative overflow-hidden ${className}`}>
      {/* Gradientes laterales para fade */}
      {gradient && (
        <>
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${gradientColor}, transparent)`,
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${gradientColor}, transparent)`,
            }}
          />
        </>
      )}

      {/* Contenido del marquee */}
      <div
        className={`marquee-content ${pauseOnHover ? 'hover:pause' : ''}`}
        style={animationStyle}
      >
        {/* Repetimos el contenido para crear el loop infinito */}
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} className="flex items-center shrink-0">
            {children}
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee-content {
          display: flex;
          animation: marquee-scroll linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Marquee con palabras de los colores institucionales
 * Ideal para secciones decorativas
 */
export function ColorWordsMarquee({
  words,
  speed = 'slow',
  separator = '/',
  className = '',
}: {
  words: string[];
  speed?: 'slow' | 'normal' | 'fast';
  separator?: string | ReactNode;
  className?: string;
}) {
  const colors: ColorVariant[] = ['azul', 'lima', 'naranja', 'terracota'];

  return (
    <Marquee speed={speed} gradient={false} className={className}>
      {words.map((word, i) => (
        <span key={i} className="flex items-center gap-6 px-6">
          <span className={`${colorClasses[colors[i % colors.length]].textDark} font-semibold text-lg md:text-xl`}>
            {word}
          </span>
          <span className="text-gris-300">{separator}</span>
        </span>
      ))}
    </Marquee>
  );
}

/**
 * Marquee para logos de partners/colaboradores
 */
export function LogoMarquee({
  logos,
  speed = 'slow',
  className = '',
}: {
  logos: Array<{ src: string; alt: string; href?: string }>;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}) {
  return (
    <Marquee speed={speed} className={className}>
      {logos.map((logo, i) => (
        <div key={i} className="px-8 md:px-12">
          {logo.href ? (
            <a
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block opacity-60 hover:opacity-100 transition-opacity"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </a>
          ) : (
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-12 md:h-16 w-auto object-contain opacity-60 grayscale"
            />
          )}
        </div>
      ))}
    </Marquee>
  );
}
