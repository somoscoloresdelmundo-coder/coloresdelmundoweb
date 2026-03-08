'use client';

import React, { useState } from 'react';

// Colores de la paleta
const COLORS = {
  blue: '#3B82F6',
  lime: '#84CC16',
  orange: '#F97316',
  terracotta: '#C2410C',
} as const;

type ColorKey = keyof typeof COLORS;

export interface Card3DProps {
  children: React.ReactNode;
  /** Intensidad maxima de la inclinacion en grados. Default: 15 */
  tiltIntensity?: number;
  /** Intensidad del efecto de brillo. Default: 0.3 */
  shineIntensity?: number;
  /** Color del brillo */
  shineColor?: ColorKey | string;
  /** Elevacion base en pixels. Default: 4 */
  elevation?: number;
  /** Elevacion maxima al hover. Default: 20 */
  maxElevation?: number;
  /** Color de la sombra */
  shadowColor?: string;
  /** Clase CSS adicional */
  className?: string;
  /** Desactivar efecto */
  disabled?: boolean;
  /** Callback al hover */
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

/**
 * Card3D simplificado - Usa CSS para hover effects
 * Evita problemas de hidratación usando solo CSS transitions
 */
export const Card3D: React.FC<Card3DProps> = ({
  children,
  elevation = 4,
  maxElevation = 20,
  shadowColor = 'rgba(0, 0, 0, 0.15)',
  className = '',
  disabled = false,
  onHoverStart,
  onHoverEnd,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    onHoverStart?.();
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setIsHovered(false);
    onHoverEnd?.();
  };

  const currentElevation = isHovered ? maxElevation : elevation;

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: `0 ${currentElevation}px ${currentElevation * 2}px ${shadowColor}`,
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        transform: isHovered && !disabled ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {children}
    </div>
  );
};

export { COLORS as CARD3D_COLORS };
export default Card3D;
