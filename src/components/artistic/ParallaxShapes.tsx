'use client';

import { useEffect, useRef, useState } from 'react';

interface Shape {
  id: number;
  x: string;
  y: string;
  size: number;
  color: string;
  speed: number;
  type: 'circle' | 'square' | 'blob';
  rotation?: number;
}

interface ParallaxShapesProps {
  intensity?: 'subtle' | 'medium' | 'strong';
  density?: 'sparse' | 'normal' | 'dense';
  interactive?: boolean;
  className?: string;
}

const colors = [
  'var(--azul-bg)',
  'var(--lima-bg)',
  'var(--naranja-bg)',
  'var(--terracota-bg)',
];

/**
 * Formas flotantes con efecto parallax
 * Se mueven con el scroll y opcionalmente con el mouse
 */
export default function ParallaxShapes({
  intensity = 'medium',
  density = 'normal',
  interactive = true,
  className = '',
}: ParallaxShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const shapesRef = useRef<Shape[]>([]);

  // Generar formas al montar
  useEffect(() => {
    const shapeCount = density === 'sparse' ? 4 : density === 'normal' ? 7 : 12;
    const shapes: Shape[] = [];

    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        id: i,
        x: `${10 + Math.random() * 80}%`,
        y: `${10 + Math.random() * 80}%`,
        size: 80 + Math.random() * 200,
        color: colors[i % colors.length],
        speed: 0.5 + Math.random() * 1.5,
        type: ['circle', 'square', 'blob'][Math.floor(Math.random() * 3)] as Shape['type'],
        rotation: Math.random() * 360,
      });
    }

    shapesRef.current = shapes;
  }, [density]);

  // Efecto de mouse interactivo
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);

    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  const intensityMultiplier = intensity === 'subtle' ? 0.5 : intensity === 'medium' ? 1 : 1.5;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {shapesRef.current.map((shape) => {
        const moveX = interactive ? (mousePosition.x - 0.5) * 30 * shape.speed * intensityMultiplier : 0;
        const moveY = interactive ? (mousePosition.y - 0.5) * 30 * shape.speed * intensityMultiplier : 0;

        return (
          <div
            key={shape.id}
            className={`
              absolute transition-transform duration-300 ease-out
              ${shape.type === 'blob' ? 'blob' : ''}
              ${shape.type === 'circle' ? 'rounded-full' : ''}
              ${shape.type === 'square' ? 'rounded-xl' : ''}
              parallax-element
            `}
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              filter: 'blur(40px)',
              opacity: 0.6,
              transform: `
                translate(${moveX}px, ${moveY}px)
                rotate(${shape.rotation}deg)
              `,
              animationDelay: `${shape.id * 0.5}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Versión más simple con solo CSS parallax
 */
export function SimpleParallaxBackground({
  variant = 'default',
  className = '',
}: {
  variant?: 'default' | 'hero' | 'minimal';
  className?: string;
}) {
  const configs = {
    default: [
      { color: 'var(--azul-bg)', size: 300, x: '10%', y: '20%', blur: 60 },
      { color: 'var(--lima-bg)', size: 250, x: '80%', y: '30%', blur: 50 },
      { color: 'var(--naranja-bg)', size: 200, x: '20%', y: '70%', blur: 55 },
      { color: 'var(--terracota-bg)', size: 180, x: '70%', y: '80%', blur: 45 },
    ],
    hero: [
      { color: 'var(--naranja-bg)', size: 400, x: '5%', y: '10%', blur: 80 },
      { color: 'var(--lima-bg)', size: 350, x: '75%', y: '5%', blur: 70 },
      { color: 'var(--azul-bg)', size: 300, x: '85%', y: '60%', blur: 65 },
      { color: 'var(--terracota-bg)', size: 250, x: '10%', y: '75%', blur: 60 },
    ],
    minimal: [
      { color: 'var(--naranja-bg)', size: 200, x: '80%', y: '20%', blur: 50 },
      { color: 'var(--lima-bg)', size: 150, x: '15%', y: '70%', blur: 40 },
    ],
  };

  const shapes = configs[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className="absolute rounded-full parallax-slow"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            backgroundColor: shape.color,
            filter: `blur(${shape.blur}px)`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}
