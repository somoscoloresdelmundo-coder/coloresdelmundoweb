'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

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
  /** Configuracion del spring */
  springConfig?: {
    stiffness?: number;
    damping?: number;
  };
  /** Clase CSS adicional */
  className?: string;
  /** Desactivar efecto */
  disabled?: boolean;
  /** Callback al hover */
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  tiltIntensity = 15,
  shineIntensity = 0.3,
  shineColor = 'blue',
  elevation = 4,
  maxElevation = 20,
  shadowColor = 'rgba(0, 0, 0, 0.15)',
  springConfig = {
    stiffness: 300,
    damping: 30,
  },
  className = '',
  disabled = false,
  onHoverStart,
  onHoverEnd,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Resolver color del brillo
  const resolvedShineColor = shineColor in COLORS
    ? COLORS[shineColor as ColorKey]
    : shineColor;

  // Motion values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring values para suavidad
  const springMouseX = useSpring(mouseX, springConfig);
  const springMouseY = useSpring(mouseY, springConfig);

  // Transformaciones para rotacion
  const rotateX = useTransform(springMouseY, [0, 1], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(springMouseX, [0, 1], [-tiltIntensity, tiltIntensity]);

  // Transformacion para el brillo
  const shineX = useTransform(springMouseX, [0, 1], [0, 100]);
  const shineY = useTransform(springMouseY, [0, 1], [0, 100]);

  // Elevacion animada
  const currentElevation = useMotionValue(elevation);
  const springElevation = useSpring(currentElevation, springConfig);

  // Detectar dispositivo movil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches ||
                  'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handler del movimiento del mouse
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || disabled || isMobile || prefersReducedMotion) return;

      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      mouseX.set(x);
      mouseY.set(y);
    },
    [disabled, isMobile, prefersReducedMotion, mouseX, mouseY]
  );

  // Handler del hover
  const handleMouseEnter = useCallback(() => {
    if (disabled || isMobile || prefersReducedMotion) return;
    setIsHovered(true);
    currentElevation.set(maxElevation);
    onHoverStart?.();
  }, [disabled, isMobile, prefersReducedMotion, currentElevation, maxElevation, onHoverStart]);

  const handleMouseLeave = useCallback(() => {
    if (disabled || isMobile || prefersReducedMotion) return;
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
    currentElevation.set(elevation);
    onHoverEnd?.();
  }, [disabled, isMobile, prefersReducedMotion, mouseX, mouseY, currentElevation, elevation, onHoverEnd]);

  // Si esta desactivado o es movil, renderizar sin animacion 3D
  if (disabled || isMobile || prefersReducedMotion) {
    return (
      <div
        className={className}
        style={{
          boxShadow: `0 ${elevation}px ${elevation * 2}px ${shadowColor}`,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
        boxShadow: useTransform(
          springElevation,
          (val) => `0 ${val}px ${val * 2}px ${shadowColor}`
        ),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Capa de brillo */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          background: useTransform(
            [shineX, shineY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, ${resolvedShineColor}${Math.round(shineIntensity * 255).toString(16).padStart(2, '0')}, transparent 50%)`
          ),
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 10,
        }}
      />

      {/* Contenido */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </motion.div>
  );
};

export { COLORS as CARD3D_COLORS };
export default Card3D;
