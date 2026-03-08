'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

// Colores de la paleta
const COLORS = {
  blue: '#3B82F6',
  lime: '#84CC16',
  orange: '#F97316',
  terracotta: '#C2410C',
} as const;

type ColorKey = keyof typeof COLORS;
type UnderlineVariant = 'grow' | 'follow';

export interface LinkUnderlineProps {
  children: React.ReactNode;
  /** URL del enlace */
  href: string;
  /** Variante del subrayado: grow (crece desde izquierda) o follow (sigue al cursor) */
  variant?: UnderlineVariant;
  /** Color del subrayado */
  color?: ColorKey | string;
  /** Grosor del subrayado en pixels. Default: 2 */
  thickness?: number;
  /** Offset desde el texto en pixels. Default: 2 */
  offset?: number;
  /** Es enlace externo */
  external?: boolean;
  /** Clase CSS adicional */
  className?: string;
  /** Clase para el texto */
  textClassName?: string;
  /** Desactivar efecto */
  disabled?: boolean;
  /** Handler de click */
  onClick?: (e: React.MouseEvent) => void;
}

export const LinkUnderline: React.FC<LinkUnderlineProps> = ({
  children,
  href,
  variant = 'grow',
  color = 'blue',
  thickness = 2,
  offset = 2,
  external = false,
  className = '',
  textClassName = '',
  disabled = false,
  onClick,
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Resolver color
  const resolvedColor = color in COLORS ? COLORS[color as ColorKey] : color;

  // Motion values para variante "follow"
  const cursorX = useMotionValue(0);
  const springCursorX = useSpring(cursorX, { stiffness: 300, damping: 30 });

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
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!ref.current || variant !== 'follow' || isMobile || prefersReducedMotion) return;

      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      cursorX.set(x);
    },
    [variant, isMobile, prefersReducedMotion, cursorX]
  );

  // Handlers de hover
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    cursorX.set(0);
  }, [cursorX]);

  // Props comunes del link
  const linkProps = {
    ref,
    className,
    onClick,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style: {
      position: 'relative' as const,
      display: 'inline-block',
      textDecoration: 'none',
      cursor: disabled ? 'default' : 'pointer',
    },
  };

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  // Renderizar subrayado segun variante
  const renderUnderline = () => {
    // Si prefiere movimiento reducido, mostrar subrayado estatico al hover
    if (prefersReducedMotion || isMobile) {
      return (
        <span
          style={{
            position: 'absolute',
            bottom: -offset,
            left: 0,
            right: 0,
            height: thickness,
            backgroundColor: resolvedColor,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        />
      );
    }

    if (variant === 'grow') {
      return (
        <motion.span
          style={{
            position: 'absolute',
            bottom: -offset,
            left: 0,
            height: thickness,
            backgroundColor: resolvedColor,
            transformOrigin: 'left center',
          }}
          initial={{ width: 0 }}
          animate={{
            width: isHovered ? '100%' : 0,
          }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      );
    }

    if (variant === 'follow') {
      const underlineWidth = 40; // Ancho del subrayado en %

      return (
        <motion.span
          style={{
            position: 'absolute',
            bottom: -offset,
            height: thickness,
            backgroundColor: resolvedColor,
            width: `${underlineWidth}%`,
            left: useTransform(
              springCursorX,
              [0, 1],
              ['0%', `${100 - underlineWidth}%`]
            ),
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        />
      );
    }

    return null;
  };

  // Contenido del link
  const content = (
    <>
      <span className={textClassName}>{children}</span>
      {renderUnderline()}
    </>
  );

  // Si es enlace externo, usar <a> directamente
  if (external) {
    return (
      <a href={href} {...linkProps} {...externalProps}>
        {content}
      </a>
    );
  }

  // Usar Next.js Link para enlaces internos
  return (
    <Link href={href} {...linkProps} {...externalProps}>
      {content}
    </Link>
  );
};

// Variante con hover de color
export interface LinkUnderlineColorProps extends Omit<LinkUnderlineProps, 'color'> {
  /** Color inicial del texto */
  textColor?: string;
  /** Color al hover */
  hoverColor?: ColorKey | string;
  /** Color del subrayado */
  underlineColor?: ColorKey | string;
}

export const LinkUnderlineColor: React.FC<LinkUnderlineColorProps> = ({
  children,
  textColor = 'inherit',
  hoverColor = 'blue',
  underlineColor = 'blue',
  textClassName = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const resolvedHoverColor = hoverColor in COLORS
    ? COLORS[hoverColor as ColorKey]
    : hoverColor;

  return (
    <LinkUnderline
      {...props}
      color={underlineColor}
      textClassName={textClassName}
      onClick={(e) => {
        props.onClick?.(e);
      }}
    >
      <motion.span
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          color: isHovered ? resolvedHoverColor : textColor,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.2,
        }}
        style={{ display: 'inline-block' }}
      >
        {children}
      </motion.span>
    </LinkUnderline>
  );
};

// Grupo de links con subrayado
export interface LinkGroupProps {
  children: React.ReactNode;
  /** Gap entre links. Default: 24 */
  gap?: number;
  /** Direccion: horizontal o vertical */
  direction?: 'horizontal' | 'vertical';
  /** Clase CSS adicional */
  className?: string;
}

export const LinkGroup: React.FC<LinkGroupProps> = ({
  children,
  gap = 24,
  direction = 'horizontal',
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        gap,
        alignItems: direction === 'horizontal' ? 'center' : 'flex-start',
      }}
    >
      {children}
    </div>
  );
};

export { COLORS as LINK_COLORS };
export default LinkUnderline;
