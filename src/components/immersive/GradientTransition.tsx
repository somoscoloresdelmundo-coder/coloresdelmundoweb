'use client';

import { useMemo } from 'react';

export interface GradientTransitionProps {
  fromColor?: string;
  toColor?: string;
  height?: number;
  className?: string;
  colors?: string[];
  direction?: 'vertical' | 'horizontal' | 'diagonal' | 'radial';
  variant?: 'smooth' | 'stepped';
}

export function GradientTransition({
  fromColor = '#3B82F6',
  toColor = '#84CC16',
  height = 200,
  className = '',
  colors,
  direction = 'vertical',
  variant = 'smooth',
}: GradientTransitionProps) {
  // Construir el array de colores final
  const colorArray = useMemo(() => {
    if (colors && colors.length >= 2) {
      return colors;
    }
    return [fromColor, toColor];
  }, [fromColor, toColor, colors]);

  // Generar el gradiente CSS
  const gradientStyle = useMemo(() => {
    const gradientDirection = {
      vertical: 'to bottom',
      horizontal: 'to right',
      diagonal: '135deg',
      radial: 'circle at center',
    };

    const gradientType = direction === 'radial' ? 'radial-gradient' : 'linear-gradient';
    const dir = gradientDirection[direction];

    if (variant === 'stepped') {
      const stepSize = 100 / colorArray.length;
      const stops = colorArray.map((color, i) => {
        const start = i * stepSize;
        const end = (i + 1) * stepSize;
        return `${color} ${start}%, ${color} ${end}%`;
      }).join(', ');
      return `${gradientType}(${dir}, ${stops})`;
    }

    const stops = colorArray.map((color, i) => {
      const pos = (i / (colorArray.length - 1)) * 100;
      return `${color} ${pos}%`;
    }).join(', ');
    return `${gradientType}(${dir}, ${stops})`;
  }, [colorArray, direction, variant]);

  return (
    <div
      className={`relative w-full pointer-events-none select-none ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{ background: gradientStyle }}
      />
    </div>
  );
}

export default GradientTransition;
