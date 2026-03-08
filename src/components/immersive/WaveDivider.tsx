'use client';

import { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Paleta de colores del proyecto
export const DIVIDER_COLORS = {
  blue: '#3B82F6',
  lime: '#84CC16',
  orange: '#F97316',
  terracotta: '#C2410C',
} as const;

export type DividerColorKey = keyof typeof DIVIDER_COLORS;

export interface WaveDividerProps {
  fromColor?: string;
  toColor?: string;
  height?: number;
  className?: string;
  animate?: boolean;
  direction?: 'top' | 'bottom';
  variant?: 'gentle' | 'dynamic' | 'choppy' | 'smooth';
  layers?: 1 | 2 | 3;
}

// Paths para diferentes variantes de olas
const WAVE_PATHS = {
  gentle: {
    start: 'M0,50 Q250,30 500,50 T1000,50 L1000,100 L0,100 Z',
    end: 'M0,50 Q250,70 500,50 T1000,50 L1000,100 L0,100 Z',
  },
  dynamic: {
    start: 'M0,40 C150,80 350,20 500,50 C650,80 850,20 1000,40 L1000,100 L0,100 Z',
    end: 'M0,60 C150,20 350,80 500,50 C650,20 850,80 1000,60 L1000,100 L0,100 Z',
  },
  choppy: {
    start: 'M0,50 L100,30 L200,60 L300,35 L400,55 L500,40 L600,65 L700,30 L800,55 L900,40 L1000,50 L1000,100 L0,100 Z',
    end: 'M0,50 L100,60 L200,35 L300,55 L400,40 L500,65 L600,30 L700,55 L800,40 L900,60 L1000,50 L1000,100 L0,100 Z',
  },
  smooth: {
    start: 'M0,60 Q500,20 1000,60 L1000,100 L0,100 Z',
    end: 'M0,40 Q500,80 1000,40 L1000,100 L0,100 Z',
  },
};

// Paths secundarios para capas adicionales
const SECONDARY_PATHS = {
  gentle: {
    start: 'M0,55 Q250,40 500,55 T1000,55 L1000,100 L0,100 Z',
    end: 'M0,55 Q250,70 500,55 T1000,55 L1000,100 L0,100 Z',
  },
  dynamic: {
    start: 'M0,45 C200,70 400,30 500,55 C600,70 800,30 1000,45 L1000,100 L0,100 Z',
    end: 'M0,55 C200,30 400,70 500,45 C600,30 800,70 1000,55 L1000,100 L0,100 Z',
  },
  choppy: {
    start: 'M0,55 L150,40 L300,60 L450,45 L600,55 L750,40 L900,55 L1000,50 L1000,100 L0,100 Z',
    end: 'M0,45 L150,60 L300,40 L450,55 L600,45 L750,60 L900,45 L1000,50 L1000,100 L0,100 Z',
  },
  smooth: {
    start: 'M0,65 Q500,35 1000,65 L1000,100 L0,100 Z',
    end: 'M0,45 Q500,75 1000,45 L1000,100 L0,100 Z',
  },
};

// Paths terciarios para la tercera capa
const TERTIARY_PATHS = {
  gentle: {
    start: 'M0,60 Q250,50 500,60 T1000,60 L1000,100 L0,100 Z',
    end: 'M0,60 Q250,70 500,60 T1000,60 L1000,100 L0,100 Z',
  },
  dynamic: {
    start: 'M0,50 C250,65 450,45 500,55 C550,65 750,45 1000,50 L1000,100 L0,100 Z',
    end: 'M0,55 C250,45 450,65 500,55 C550,45 750,65 1000,55 L1000,100 L0,100 Z',
  },
  choppy: {
    start: 'M0,58 L200,48 L400,62 L600,52 L800,58 L1000,55 L1000,100 L0,100 Z',
    end: 'M0,52 L200,62 L400,48 L600,58 L800,52 L1000,55 L1000,100 L0,100 Z',
  },
  smooth: {
    start: 'M0,68 Q500,50 1000,68 L1000,100 L0,100 Z',
    end: 'M0,52 Q500,70 1000,52 L1000,100 L0,100 Z',
  },
};

export function WaveDivider({
  fromColor = DIVIDER_COLORS.blue,
  toColor = DIVIDER_COLORS.lime,
  height = 120,
  className = '',
  animate = true,
  direction = 'bottom',
  variant = 'gentle',
  layers = 2,
}: WaveDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const prefersReducedMotion = useRef(false);

  // Memoizar los colores de las capas
  const layerColors = useMemo(() => {
    // Interpolación simple de colores para las capas
    const colors = [toColor];
    if (layers >= 2) {
      colors.unshift(mixColors(fromColor, toColor, 0.5));
    }
    if (layers >= 3) {
      colors.unshift(mixColors(fromColor, toColor, 0.25));
    }
    return colors;
  }, [fromColor, toColor, layers]);

  useEffect(() => {
    // Detectar preferencia de movimiento reducido
    if (typeof window !== 'undefined') {
      prefersReducedMotion.current = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
    }

    if (!animate || prefersReducedMotion.current || !containerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];

      paths.forEach((path, index) => {
        const pathSets = [WAVE_PATHS, SECONDARY_PATHS, TERTIARY_PATHS];
        const pathSet = pathSets[index]?.[variant] || WAVE_PATHS[variant];

        // Animación de morphing con scroll
        gsap.fromTo(
          path,
          { attr: { d: pathSet.start } },
          {
            attr: { d: pathSet.end },
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5 + index * 0.5,
            },
          }
        );

        // Movimiento horizontal sutil para efecto de flujo
        gsap.to(path, {
          x: 20 - index * 10,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2 + index * 0.3,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animate, variant, layers]);

  // Función para mezclar dos colores hex
  function mixColors(color1: string, color2: string, ratio: number): string {
    const hex = (c: string) => parseInt(c.slice(1), 16);
    const r = (n: number) => (n >> 16) & 255;
    const g = (n: number) => (n >> 8) & 255;
    const b = (n: number) => n & 255;

    const c1 = hex(color1);
    const c2 = hex(color2);

    const mixedR = Math.round(r(c1) * (1 - ratio) + r(c2) * ratio);
    const mixedG = Math.round(g(c1) * (1 - ratio) + g(c2) * ratio);
    const mixedB = Math.round(b(c1) * (1 - ratio) + b(c2) * ratio);

    return `#${((1 << 24) + (mixedR << 16) + (mixedG << 8) + mixedB)
      .toString(16)
      .slice(1)}`;
  }

  const containerStyle: React.CSSProperties = {
    height: `${height}px`,
    marginTop: direction === 'top' ? `-${height}px` : 0,
    marginBottom: direction === 'bottom' ? `-${height}px` : 0,
    transform: direction === 'top' ? 'rotate(180deg)' : 'none',
    background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={containerStyle}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Capa base - color de destino */}
        {layers >= 3 && (
          <path
            ref={(el) => { pathRefs.current[2] = el; }}
            d={TERTIARY_PATHS[variant].start}
            fill={layerColors[0]}
            opacity={0.4}
          />
        )}

        {/* Capa intermedia */}
        {layers >= 2 && (
          <path
            ref={(el) => { pathRefs.current[1] = el; }}
            d={SECONDARY_PATHS[variant].start}
            fill={layerColors[layers >= 3 ? 1 : 0]}
            opacity={0.6}
          />
        )}

        {/* Capa principal */}
        <path
          ref={(el) => { pathRefs.current[0] = el; }}
          d={WAVE_PATHS[variant].start}
          fill={toColor}
        />
      </svg>
    </div>
  );
}

export default WaveDivider;
