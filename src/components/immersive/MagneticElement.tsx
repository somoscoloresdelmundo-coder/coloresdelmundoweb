'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useReducedMotion } from 'framer-motion';
import { PRIMARY_HEX } from '@/lib/design/colors';
import { SPRING_CONFIGS, MAGNETIC } from '@/lib/animations';

export interface MagneticElementProps {
  children: React.ReactNode;
  /** Fuerza del magnetismo (0-1). Default: MAGNETIC.strength */
  strength?: number;
  /** Radio de activacion en pixels. Default: MAGNETIC.radius */
  radius?: number;
  /** Configuracion del spring */
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  /** Clase CSS adicional */
  className?: string;
  /** Desactivar efecto */
  disabled?: boolean;
  /** Callback cuando el cursor entra en el radio */
  onMagnetEnter?: () => void;
  /** Callback cuando el cursor sale del radio */
  onMagnetLeave?: () => void;
}

export const MagneticElement: React.FC<MagneticElementProps> = ({
  children,
  strength = MAGNETIC.strength,
  radius = MAGNETIC.radius,
  springConfig = SPRING_CONFIGS.magnetic,
  className = '',
  disabled = false,
  onMagnetEnter,
  onMagnetLeave,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInRadius, setIsInRadius] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Motion values para posicion
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

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
    (e: MouseEvent) => {
      if (!ref.current || disabled || isMobile || prefersReducedMotion) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        if (!isInRadius) {
          setIsInRadius(true);
          onMagnetEnter?.();
        }

        // Calcular el desplazamiento basado en la distancia y fuerza
        const factor = 1 - distance / radius;
        const moveX = distanceX * strength * factor;
        const moveY = distanceY * strength * factor;

        x.set(moveX);
        y.set(moveY);
      } else {
        if (isInRadius) {
          setIsInRadius(false);
          onMagnetLeave?.();
        }
        x.set(0);
        y.set(0);
      }
    },
    [disabled, isMobile, prefersReducedMotion, radius, strength, x, y, isInRadius, onMagnetEnter, onMagnetLeave]
  );

  // Handler cuando el mouse sale del viewport
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    if (isInRadius) {
      setIsInRadius(false);
      onMagnetLeave?.();
    }
  }, [x, y, isInRadius, onMagnetLeave]);

  // Agregar listeners
  useEffect(() => {
    if (isMobile || disabled || prefersReducedMotion) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, isMobile, disabled, prefersReducedMotion]);

  // Si esta desactivado o es movil, renderizar sin animacion
  if (disabled || isMobile || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.div>
  );
};

export { PRIMARY_HEX as MAGNETIC_COLORS };
export default MagneticElement;
