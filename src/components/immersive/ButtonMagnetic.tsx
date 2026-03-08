'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';

// Colores de la paleta
const COLORS = {
  blue: '#3B82F6',
  lime: '#84CC16',
  orange: '#F97316',
  terracotta: '#C2410C',
} as const;

type ColorKey = keyof typeof COLORS;
type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface ButtonMagneticProps {
  children: React.ReactNode;
  /** Variante del boton */
  variant?: ButtonVariant;
  /** Color principal */
  color?: ColorKey;
  /** Fuerza del magnetismo. Default: 0.4 */
  magneticStrength?: number;
  /** Radio de activacion magnetica. Default: 150 */
  magneticRadius?: number;
  /** Mostrar efecto ripple al click. Default: true */
  showRipple?: boolean;
  /** Tipo de boton HTML */
  type?: 'button' | 'submit' | 'reset';
  /** Desactivado */
  disabled?: boolean;
  /** Clase CSS adicional */
  className?: string;
  /** Handler de click */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Handler de hover start */
  onHoverStart?: () => void;
  /** Handler de hover end */
  onHoverEnd?: () => void;
}

// Estilos base segun variante
const getVariantStyles = (variant: ButtonVariant, colorKey: ColorKey) => {
  const color = COLORS[colorKey];

  switch (variant) {
    case 'primary':
      return {
        background: color,
        color: '#FFFFFF',
        border: 'none',
        hoverBackground: color,
      };
    case 'secondary':
      return {
        background: `${color}20`,
        color: color,
        border: 'none',
        hoverBackground: `${color}30`,
      };
    case 'outline':
      return {
        background: 'transparent',
        color: color,
        border: `2px solid ${color}`,
        hoverBackground: `${color}10`,
      };
    default:
      return {
        background: color,
        color: '#FFFFFF',
        border: 'none',
        hoverBackground: color,
      };
  }
};

// Interfaz para ripples
interface Ripple {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const ButtonMagnetic: React.FC<ButtonMagneticProps> = ({
  children,
  variant = 'primary',
  color = 'blue',
  magneticStrength = 0.4,
  magneticRadius = 150,
  showRipple = true,
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  onHoverStart,
  onHoverEnd,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleCount = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const styles = getVariantStyles(variant, color);
  const colorValue = COLORS[color];

  // Motion values para posicion magnetica
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Motion values para posicion del cursor dentro del boton
  const cursorX = useMotionValue(0.5);
  const cursorY = useMotionValue(0.5);

  // Spring animations
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springCursorX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springCursorY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  // Gradiente que sigue al cursor
  const backgroundGradient = useTransform(
    [springCursorX, springCursorY],
    ([cx, cy]) => {
      if (variant === 'primary') {
        return `radial-gradient(circle at ${(cx as number) * 100}% ${(cy as number) * 100}%, ${colorValue}dd, ${colorValue} 50%)`;
      }
      return styles.background;
    }
  );

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

  // Handler del movimiento del mouse global (efecto magnetico)
  const handleGlobalMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || disabled || isMobile || prefersReducedMotion) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < magneticRadius) {
        const factor = 1 - distance / magneticRadius;
        x.set(distanceX * magneticStrength * factor);
        y.set(distanceY * magneticStrength * factor);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [disabled, isMobile, prefersReducedMotion, magneticRadius, magneticStrength, x, y]
  );

  // Handler del movimiento del mouse sobre el boton
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current || disabled || isMobile || prefersReducedMotion) return;

      const rect = ref.current.getBoundingClientRect();
      const xPos = (e.clientX - rect.left) / rect.width;
      const yPos = (e.clientY - rect.top) / rect.height;

      cursorX.set(xPos);
      cursorY.set(yPos);
    },
    [disabled, isMobile, prefersReducedMotion, cursorX, cursorY]
  );

  // Handlers de hover
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHoverStart?.();
  }, [onHoverStart]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    cursorX.set(0.5);
    cursorY.set(0.5);
    onHoverEnd?.();
  }, [x, y, cursorX, cursorY, onHoverEnd]);

  // Handler de click con ripple
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (showRipple && !prefersReducedMotion && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const rippleX = e.clientX - rect.left;
        const rippleY = e.clientY - rect.top;

        // Rotar entre los colores de la paleta
        const colorKeys = Object.keys(COLORS) as ColorKey[];
        const rippleColor = COLORS[colorKeys[rippleCount.current % colorKeys.length]];

        const newRipple: Ripple = {
          id: rippleCount.current,
          x: rippleX,
          y: rippleY,
          color: rippleColor,
        };

        rippleCount.current += 1;
        setRipples((prev) => [...prev, newRipple]);

        // Remover ripple despues de la animacion
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
      }

      onClick?.(e);
    },
    [disabled, showRipple, prefersReducedMotion, onClick]
  );

  // Agregar listener global
  useEffect(() => {
    if (isMobile || disabled || prefersReducedMotion) return;

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [handleGlobalMouseMove, isMobile, disabled, prefersReducedMotion]);

  // Estilos base del boton
  const baseStyles: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    border: styles.border,
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
  };

  // Si es movil o prefiere reducir movimiento, renderizar version simplificada
  if (isMobile || prefersReducedMotion) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={className}
        onClick={handleClick}
        style={{
          ...baseStyles,
          background: styles.background,
          color: styles.color,
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      className={className}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...baseStyles,
        x: springX,
        y: springY,
        background: variant === 'primary' ? backgroundGradient : styles.background,
        color: styles.color,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Capa de hover para secondary y outline */}
      {variant !== 'primary' && (
        <motion.span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: useTransform(
              [springCursorX, springCursorY],
              ([cx, cy]) =>
                `radial-gradient(circle at ${(cx as number) * 100}% ${(cy as number) * 100}%, ${colorValue}30, transparent 50%)`
            ),
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              width: 50,
              height: 50,
              marginLeft: -25,
              marginTop: -25,
              borderRadius: '50%',
              background: ripple.color,
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Contenido */}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.button>
  );
};

export { COLORS as BUTTON_COLORS };
export default ButtonMagnetic;
