'use client';

import { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DIVIDER_COLORS, type DividerColorKey } from '@/lib/design/colors';

// Registrar plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Re-export for backward compatibility
export { DIVIDER_COLORS, type DividerColorKey };

export interface BlobDividerProps {
  fromColor?: string;
  toColor?: string;
  height?: number;
  className?: string;
  animate?: boolean;
  direction?: 'top' | 'bottom';
  variant?: 'organic' | 'bubbly' | 'flowing' | 'minimal';
  intensity?: 'subtle' | 'medium' | 'intense';
}

// Paths de blobs para diferentes estados de morphing
const BLOB_PATHS = {
  organic: {
    blob1: {
      start: 'M100,50 C130,20 170,30 200,50 C230,70 270,60 300,50 C330,40 370,50 400,50 C430,50 470,70 500,50 C530,30 570,40 600,50 C630,60 670,30 700,50 C730,70 770,50 800,50 C830,50 870,20 900,50 L900,100 L100,100 Z',
      end: 'M100,50 C130,70 170,50 200,50 C230,50 270,30 300,50 C330,70 370,60 400,50 C430,40 470,30 500,50 C530,70 570,60 600,50 C630,40 670,70 700,50 C730,30 770,50 800,50 C830,50 870,70 900,50 L900,100 L100,100 Z',
    },
    blob2: {
      start: 'M50,60 Q150,40 250,60 T450,55 Q550,70 650,55 T850,60 Q950,45 1000,60 L1000,100 L50,100 Z',
      end: 'M50,55 Q150,70 250,55 T450,60 Q550,45 650,60 T850,55 Q950,70 1000,55 L1000,100 L50,100 Z',
    },
    blob3: {
      start: 'M0,65 C100,55 200,70 300,65 S500,55 600,65 S800,70 900,60 L1000,65 L1000,100 L0,100 Z',
      end: 'M0,60 C100,70 200,55 300,60 S500,70 600,60 S800,55 900,65 L1000,60 L1000,100 L0,100 Z',
    },
  },
  bubbly: {
    blob1: {
      start: 'M0,50 Q50,30 100,50 Q150,70 200,50 Q250,30 300,50 Q350,70 400,50 Q450,30 500,50 Q550,70 600,50 Q650,30 700,50 Q750,70 800,50 Q850,30 900,50 Q950,70 1000,50 L1000,100 L0,100 Z',
      end: 'M0,50 Q50,70 100,50 Q150,30 200,50 Q250,70 300,50 Q350,30 400,50 Q450,70 500,50 Q550,30 600,50 Q650,70 700,50 Q750,30 800,50 Q850,70 900,50 Q950,30 1000,50 L1000,100 L0,100 Z',
    },
    blob2: {
      start: 'M0,55 Q75,40 150,55 Q225,70 300,55 Q375,40 450,55 Q525,70 600,55 Q675,40 750,55 Q825,70 900,55 Q975,40 1000,55 L1000,100 L0,100 Z',
      end: 'M0,55 Q75,65 150,55 Q225,45 300,55 Q375,65 450,55 Q525,45 600,55 Q675,65 750,55 Q825,45 900,55 Q975,65 1000,55 L1000,100 L0,100 Z',
    },
    blob3: {
      start: 'M0,60 Q100,50 200,60 Q300,70 400,60 Q500,50 600,60 Q700,70 800,60 Q900,50 1000,60 L1000,100 L0,100 Z',
      end: 'M0,60 Q100,70 200,60 Q300,50 400,60 Q500,70 600,60 Q700,50 800,60 Q900,70 1000,60 L1000,100 L0,100 Z',
    },
  },
  flowing: {
    blob1: {
      start: 'M0,45 C150,60 300,35 450,50 C600,65 750,40 900,55 L1000,50 L1000,100 L0,100 Z',
      end: 'M0,55 C150,40 300,65 450,50 C600,35 750,60 900,45 L1000,50 L1000,100 L0,100 Z',
    },
    blob2: {
      start: 'M0,52 C200,65 400,42 600,55 C800,42 950,60 1000,52 L1000,100 L0,100 Z',
      end: 'M0,55 C200,42 400,65 600,52 C800,65 950,45 1000,55 L1000,100 L0,100 Z',
    },
    blob3: {
      start: 'M0,58 C250,48 500,68 750,55 C900,48 1000,58 1000,58 L1000,100 L0,100 Z',
      end: 'M0,55 C250,68 500,48 750,58 C900,65 1000,52 1000,55 L1000,100 L0,100 Z',
    },
  },
  minimal: {
    blob1: {
      start: 'M0,55 Q250,45 500,55 Q750,65 1000,55 L1000,100 L0,100 Z',
      end: 'M0,55 Q250,65 500,55 Q750,45 1000,55 L1000,100 L0,100 Z',
    },
    blob2: {
      start: 'M0,60 Q500,50 1000,60 L1000,100 L0,100 Z',
      end: 'M0,60 Q500,70 1000,60 L1000,100 L0,100 Z',
    },
    blob3: {
      start: 'M0,65 Q500,58 1000,65 L1000,100 L0,100 Z',
      end: 'M0,65 Q500,72 1000,65 L1000,100 L0,100 Z',
    },
  },
};

// Configuración de intensidad
const INTENSITY_CONFIG = {
  subtle: { scrub: 3, xOffset: 10 },
  medium: { scrub: 2, xOffset: 20 },
  intense: { scrub: 1, xOffset: 35 },
};

export function BlobDivider({
  fromColor = DIVIDER_COLORS.blue,
  toColor = DIVIDER_COLORS.lime,
  height = 150,
  className = '',
  animate = true,
  direction = 'bottom',
  variant = 'organic',
  intensity = 'medium',
}: BlobDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(SVGPathElement | null)[]>([]);
  const prefersReducedMotion = useRef(false);

  // Calcular colores para las capas
  const layerColors = useMemo(() => {
    const mix = (c1: string, c2: string, ratio: number): string => {
      const hex = (c: string) => parseInt(c.slice(1), 16);
      const r = (n: number) => (n >> 16) & 255;
      const g = (n: number) => (n >> 8) & 255;
      const b = (n: number) => n & 255;

      const h1 = hex(c1);
      const h2 = hex(c2);

      const mixedR = Math.round(r(h1) * (1 - ratio) + r(h2) * ratio);
      const mixedG = Math.round(g(h1) * (1 - ratio) + g(h2) * ratio);
      const mixedB = Math.round(b(h1) * (1 - ratio) + b(h2) * ratio);

      return `#${((1 << 24) + (mixedR << 16) + (mixedG << 8) + mixedB)
        .toString(16)
        .slice(1)}`;
    };

    return [
      mix(fromColor, toColor, 0.2),  // Blob más atrás
      mix(fromColor, toColor, 0.5),  // Blob medio
      toColor,                        // Blob frontal
    ];
  }, [fromColor, toColor]);

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

    const config = INTENSITY_CONFIG[intensity];
    const paths = BLOB_PATHS[variant];

    const ctx = gsap.context(() => {
      const blobs = blobRefs.current.filter(Boolean) as SVGPathElement[];
      const blobKeys: ('blob1' | 'blob2' | 'blob3')[] = ['blob1', 'blob2', 'blob3'];

      blobs.forEach((blob, index) => {
        const pathData = paths[blobKeys[index]];
        if (!pathData) return;

        // Morphing del path con scroll
        gsap.fromTo(
          blob,
          { attr: { d: pathData.start } },
          {
            attr: { d: pathData.end },
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: config.scrub + index * 0.5,
            },
          }
        );

        // Efecto de "fluido" - movimiento horizontal ondulante
        gsap.to(blob, {
          x: config.xOffset * (index % 2 === 0 ? 1 : -1),
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: config.scrub * 1.5 + index * 0.3,
          },
        });

        // Escala sutil para efecto de profundidad
        gsap.fromTo(
          blob,
          { scaleY: 1 },
          {
            scaleY: 1 + (0.05 * (3 - index)),
            transformOrigin: 'center bottom',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: config.scrub * 2,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animate, variant, intensity]);

  const containerStyle: React.CSSProperties = {
    height: `${height}px`,
    marginTop: direction === 'top' ? `-${height}px` : 0,
    marginBottom: direction === 'bottom' ? `-${height}px` : 0,
    transform: direction === 'top' ? 'rotate(180deg)' : 'none',
    background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
  };

  const paths = BLOB_PATHS[variant];

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
        {/* Definir filtro de blur para efecto de líquido */}
        <defs>
          <filter id="blob-goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>

        <g filter="url(#blob-goo)">
          {/* Blob trasero - más transparente */}
          <path
            ref={(el) => { blobRefs.current[0] = el; }}
            d={paths.blob1.start}
            fill={layerColors[0]}
            opacity={0.4}
          />

          {/* Blob medio */}
          <path
            ref={(el) => { blobRefs.current[1] = el; }}
            d={paths.blob2.start}
            fill={layerColors[1]}
            opacity={0.6}
          />

          {/* Blob frontal - opaco */}
          <path
            ref={(el) => { blobRefs.current[2] = el; }}
            d={paths.blob3.start}
            fill={layerColors[2]}
            opacity={1}
          />
        </g>
      </svg>
    </div>
  );
}

export default BlobDivider;
