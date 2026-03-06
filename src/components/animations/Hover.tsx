'use client';

import { ReactNode, ElementType } from 'react';

type HoverEffect = 'lift' | 'scale' | 'glow' | 'shine' | 'press';

interface HoverProps {
  children: ReactNode;
  effect?: HoverEffect;
  className?: string;
  as?: ElementType;
}

const effectClasses: Record<HoverEffect, string> = {
  lift: 'hover-lift',
  scale: 'hover-scale',
  glow: 'hover-glow',
  shine: 'hover-shine',
  press: 'press-effect',
};

/**
 * Componente para micro-interacciones de hover
 *
 * Efectos disponibles:
 * - lift: Eleva el elemento con sombra
 * - scale: Escala el elemento
 * - glow: Añade un brillo de color
 * - shine: Efecto de brillo que pasa
 * - press: Efecto de presión al hacer click
 */
export default function Hover({
  children,
  effect = 'lift',
  className = '',
  as: Component = 'div',
}: HoverProps) {
  return (
    <Component className={`${effectClasses[effect]} ${className}`}>
      {children}
    </Component>
  );
}

// También exportamos las clases para uso directo
export const hoverClasses = effectClasses;
