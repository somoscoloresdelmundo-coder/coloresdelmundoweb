'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
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

export interface GradientTransitionProps {
  fromColor?: string;
  toColor?: string;
  height?: number;
  className?: string;
  animate?: boolean;
  colors?: string[];  // Array de colores para gradiente multi-color
  direction?: 'vertical' | 'horizontal' | 'diagonal' | 'radial';
  variant?: 'smooth' | 'stepped' | 'mesh' | 'aurora';
  intensity?: 'subtle' | 'medium' | 'vibrant';
}

// Configuración de intensidad para colores
const INTENSITY_CONFIG = {
  subtle: { saturation: 0.8, opacity: 0.9 },
  medium: { saturation: 1, opacity: 1 },
  vibrant: { saturation: 1.2, opacity: 1 },
};

export function GradientTransition({
  fromColor = DIVIDER_COLORS.blue,
  toColor = DIVIDER_COLORS.lime,
  height = 200,
  className = '',
  animate = true,
  colors,
  direction = 'vertical',
  variant = 'smooth',
  intensity = 'medium',
}: GradientTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useRef(false);
  const [progress, setProgress] = useState(0);

  // Construir el array de colores final
  const colorArray = useMemo(() => {
    if (colors && colors.length >= 2) {
      return colors;
    }
    return [fromColor, toColor];
  }, [fromColor, toColor, colors]);

  // Generar el gradiente CSS basado en la dirección y variante
  const getGradientStyle = useMemo(() => {
    const gradientDirection = {
      vertical: 'to bottom',
      horizontal: 'to right',
      diagonal: '135deg',
      radial: 'circle at center',
    };

    const gradientType = direction === 'radial' ? 'radial-gradient' : 'linear-gradient';
    const dir = gradientDirection[direction];

    switch (variant) {
      case 'stepped': {
        // Gradiente con pasos definidos
        const stepSize = 100 / colorArray.length;
        const stops = colorArray.map((color, i) => {
          const start = i * stepSize;
          const end = (i + 1) * stepSize;
          return `${color} ${start}%, ${color} ${end}%`;
        }).join(', ');
        return `${gradientType}(${dir}, ${stops})`;
      }

      case 'aurora': {
        // Gradiente estilo aurora con múltiples capas
        const stops = colorArray.map((color, i) => {
          const pos = (i / (colorArray.length - 1)) * 100;
          return `${color} ${pos}%`;
        }).join(', ');
        return `${gradientType}(${dir}, ${stops})`;
      }

      case 'mesh':
        // Para mesh usamos SVG, devolvemos un color base
        return fromColor;

      case 'smooth':
      default: {
        const stops = colorArray.map((color, i) => {
          const pos = (i / (colorArray.length - 1)) * 100;
          return `${color} ${pos}%`;
        }).join(', ');
        return `${gradientType}(${dir}, ${stops})`;
      }
    }
  }, [colorArray, direction, variant, fromColor]);

  // Generar puntos de mesh para la variante mesh
  const meshPoints = useMemo(() => {
    if (variant !== 'mesh') return [];

    const points: { x: number; y: number; color: string; radius: number }[] = [];
    const cols = 4;
    const rows = 3;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = (col / (cols - 1)) * 100;
        const y = (row / (rows - 1)) * 100;
        const colorIndex = (row * cols + col) % colorArray.length;

        points.push({
          x,
          y,
          color: colorArray[colorIndex],
          radius: 40 + Math.random() * 30,
        });
      }
    }

    return points;
  }, [colorArray, variant]);

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
      // Animación principal del progreso de scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });

      // Animaciones específicas por variante
      if (variant === 'aurora' && gradientRef.current) {
        // Efecto de aurora - movimiento ondulante
        gsap.to(gradientRef.current, {
          backgroundPosition: '100% 50%',
          backgroundSize: '200% 200%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }

      if (variant === 'mesh' && meshRef.current) {
        // Animar los círculos del mesh
        const circles = meshRef.current.querySelectorAll('circle');
        circles.forEach((circle, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          const delay = index * 0.1;

          gsap.to(circle, {
            attr: {
              cx: `+=${15 * direction}%`,
              cy: `+=${10 * direction}%`,
              r: `+=${10}%`,
            },
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2 + delay,
            },
          });
        });
      }

      // Efecto de opacidad para transición suave
      if (gradientRef.current) {
        gsap.fromTo(
          gradientRef.current,
          { opacity: 0.8 },
          {
            opacity: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [animate, variant]);

  const containerStyle: React.CSSProperties = {
    height: `${height}px`,
    position: 'relative',
    overflow: 'hidden',
  };

  const gradientStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: variant === 'mesh' ? 'transparent' : getGradientStyle,
    backgroundSize: variant === 'aurora' ? '200% 200%' : '100% 100%',
    backgroundPosition: '0% 50%',
    transition: prefersReducedMotion.current ? 'none' : undefined,
  };

  // Ajustar saturación según intensidad
  const intensityConfig = INTENSITY_CONFIG[intensity];
  const filterStyle = intensity !== 'medium'
    ? `saturate(${intensityConfig.saturation})`
    : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative w-full pointer-events-none select-none ${className}`}
      style={containerStyle}
      aria-hidden="true"
    >
      {/* Capa de gradiente principal */}
      <div
        ref={gradientRef}
        style={{
          ...gradientStyle,
          filter: filterStyle,
          opacity: intensityConfig.opacity,
        }}
      />

      {/* Mesh gradient usando SVG */}
      {variant === 'mesh' && (
        <svg
          ref={meshRef}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ filter: `blur(30px) ${filterStyle || ''}`.trim() }}
        >
          <defs>
            {meshPoints.map((point, index) => (
              <radialGradient
                key={`gradient-${index}`}
                id={`mesh-gradient-${index}`}
                cx="50%"
                cy="50%"
                r="50%"
              >
                <stop offset="0%" stopColor={point.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={point.color} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {meshPoints.map((point, index) => (
            <circle
              key={`circle-${index}`}
              cx={`${point.x}%`}
              cy={`${point.y}%`}
              r={`${point.radius}%`}
              fill={`url(#mesh-gradient-${index})`}
            />
          ))}
        </svg>
      )}

      {/* Overlay con noise para textura sutil */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Indicador visual del progreso (oculto pero disponible para depuración) */}
      {process.env.NODE_ENV === 'development' && (
        <div
          className="absolute bottom-2 right-2 text-xs opacity-50 font-mono"
          style={{ color: toColor }}
        >
          {(progress * 100).toFixed(0)}%
        </div>
      )}
    </div>
  );
}

export default GradientTransition;
