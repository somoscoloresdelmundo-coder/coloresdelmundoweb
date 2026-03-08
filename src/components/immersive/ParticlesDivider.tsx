'use client';

import { useRef, useEffect, useMemo, useCallback } from 'react';
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

export interface ParticlesDividerProps {
  fromColor?: string;
  toColor?: string;
  height?: number;
  className?: string;
  animate?: boolean;
  colors?: string[];
  particleCount?: number;
  particleSize?: 'small' | 'medium' | 'large' | 'mixed';
  shape?: 'circle' | 'square' | 'mixed' | 'organic';
  density?: 'sparse' | 'normal' | 'dense';
  parallaxIntensity?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'organic';
  opacity: number;
  parallaxFactor: number;
  rotation: number;
  blur: number;
}

// Configuración de tamaños
const SIZE_CONFIG = {
  small: { min: 4, max: 8 },
  medium: { min: 8, max: 16 },
  large: { min: 16, max: 32 },
  mixed: { min: 4, max: 32 },
};

// Configuración de densidad
const DENSITY_CONFIG = {
  sparse: 0.5,
  normal: 1,
  dense: 1.8,
};

// Generador de semilla para randomización consistente
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function ParticlesDivider({
  fromColor = DIVIDER_COLORS.blue,
  toColor = DIVIDER_COLORS.lime,
  height = 180,
  className = '',
  animate = true,
  colors,
  particleCount = 30,
  particleSize = 'mixed',
  shape = 'mixed',
  density = 'normal',
  parallaxIntensity = 1,
}: ParticlesDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<Map<number, SVGElement>>(new Map());
  const prefersReducedMotion = useRef(false);

  // Calcular el array de colores final
  const colorPalette = useMemo(() => {
    if (colors && colors.length >= 2) {
      return colors;
    }
    // Usar los 4 colores del proyecto por defecto
    return [
      DIVIDER_COLORS.blue,
      DIVIDER_COLORS.lime,
      DIVIDER_COLORS.orange,
      DIVIDER_COLORS.terracotta,
    ];
  }, [colors]);

  // Generar partículas con posiciones y propiedades aleatorias pero consistentes
  const particles = useMemo((): Particle[] => {
    const sizeConfig = SIZE_CONFIG[particleSize];
    const densityFactor = DENSITY_CONFIG[density];
    const actualCount = Math.round(particleCount * densityFactor);
    const result: Particle[] = [];

    for (let i = 0; i < actualCount; i++) {
      const seed = i * 12345; // Semilla consistente para cada partícula
      const random = () => seededRandom(seed + result.length);

      // Posición distribuida de forma más natural
      const x = random() * 100;
      const y = random() * 100;

      // Tamaño aleatorio dentro del rango configurado
      const size = sizeConfig.min + random() * (sizeConfig.max - sizeConfig.min);

      // Color aleatorio de la paleta
      const colorIndex = Math.floor(random() * colorPalette.length);
      const color = colorPalette[colorIndex];

      // Forma según configuración
      let particleShape: 'circle' | 'square' | 'organic';
      if (shape === 'mixed') {
        const shapeRandom = random();
        particleShape = shapeRandom < 0.5 ? 'circle' : shapeRandom < 0.8 ? 'square' : 'organic';
      } else if (shape === 'organic') {
        particleShape = 'organic';
      } else {
        particleShape = shape;
      }

      // Propiedades visuales
      const opacity = 0.3 + random() * 0.5;
      const parallaxFactor = 0.5 + random() * 1.5;
      const rotation = random() * 360;
      const blur = random() < 0.3 ? random() * 2 : 0;

      result.push({
        id: i,
        x,
        y,
        size,
        color,
        shape: particleShape,
        opacity,
        parallaxFactor,
        rotation,
        blur,
      });
    }

    return result;
  }, [particleCount, particleSize, shape, density, colorPalette]);

  // Registrar referencia de partícula
  const setParticleRef = useCallback((id: number, el: SVGElement | null) => {
    if (el) {
      particleRefs.current.set(id, el);
    } else {
      particleRefs.current.delete(id);
    }
  }, []);

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
      particles.forEach((particle) => {
        const el = particleRefs.current.get(particle.id);
        if (!el) return;

        const baseOffset = particle.parallaxFactor * parallaxIntensity * 50;
        const direction = particle.id % 2 === 0 ? 1 : -1;

        // Movimiento parallax vertical (principal)
        gsap.fromTo(
          el,
          {
            y: -baseOffset,
          },
          {
            y: baseOffset,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1 + particle.parallaxFactor * 0.5,
            },
          }
        );

        // Movimiento horizontal sutil
        gsap.fromTo(
          el,
          {
            x: -baseOffset * 0.3 * direction,
          },
          {
            x: baseOffset * 0.3 * direction,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2 + particle.parallaxFactor * 0.3,
            },
          }
        );

        // Rotación con scroll
        gsap.to(el, {
          rotation: particle.rotation + 180 * direction,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 3,
          },
        });

        // Efecto de escala para profundidad
        gsap.fromTo(
          el,
          {
            scale: 1 - particle.parallaxFactor * 0.1,
          },
          {
            scale: 1 + particle.parallaxFactor * 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          }
        );

        // Opacidad dinámica
        gsap.fromTo(
          el,
          {
            opacity: particle.opacity * 0.5,
          },
          {
            opacity: particle.opacity,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 90%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animate, particles, parallaxIntensity]);

  // Renderizar forma según tipo
  const renderShape = (particle: Particle) => {
    const { size, color, shape: shapeType, rotation, blur } = particle;

    const commonProps = {
      fill: color,
      style: {
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        transformOrigin: 'center',
      },
    };

    switch (shapeType) {
      case 'square':
        return (
          <rect
            x={-size / 2}
            y={-size / 2}
            width={size}
            height={size}
            rx={size * 0.1}
            transform={`rotate(${rotation})`}
            {...commonProps}
          />
        );

      case 'organic':
        // Forma orgánica tipo blob
        const scale = size / 20;
        return (
          <path
            d={`M${-8 * scale},0
                C${-8 * scale},${-5 * scale} ${-5 * scale},${-8 * scale} 0,${-8 * scale}
                C${5 * scale},${-8 * scale} ${8 * scale},${-3 * scale} ${8 * scale},0
                C${8 * scale},${5 * scale} ${4 * scale},${8 * scale} 0,${8 * scale}
                C${-5 * scale},${8 * scale} ${-8 * scale},${4 * scale} ${-8 * scale},0 Z`}
            transform={`rotate(${rotation})`}
            {...commonProps}
          />
        );

      case 'circle':
      default:
        return <circle cx={0} cy={0} r={size / 2} {...commonProps} />;
    }
  };

  const containerStyle: React.CSSProperties = {
    height: `${height}px`,
    background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full pointer-events-none select-none ${className}`}
      style={containerStyle}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Filtro de glow para algunas partículas */}
        <defs>
          <filter id="particle-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {particles.map((particle) => (
          <g
            key={particle.id}
            ref={(el) => setParticleRef(particle.id, el)}
            transform={`translate(${particle.x}, ${particle.y})`}
            opacity={particle.opacity}
            filter={particle.size > 20 ? 'url(#particle-glow)' : undefined}
          >
            {renderShape(particle)}
          </g>
        ))}
      </svg>

      {/* Overlay con gradiente sutil para mejorar la transición */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom,
            transparent 0%,
            ${fromColor}10 30%,
            ${toColor}10 70%,
            transparent 100%
          )`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default ParticlesDivider;
