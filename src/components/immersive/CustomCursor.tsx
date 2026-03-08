'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useCursor, CURSOR_COLORS, type CursorColorKey } from './CursorProvider';

// Configuración de springs para animaciones fluidas
const SPRING_CONFIG = {
  damping: 25,
  stiffness: 300,
  mass: 0.5,
};

const SPRING_CONFIG_FAST = {
  damping: 50,
  stiffness: 500,
  mass: 0.2,
};

// Tamaños del cursor según estado
const CURSOR_SIZES = {
  default: 32,
  hover: 48,
  click: 24,
  link: 40,
  drag: 56,
} as const;

// Máximo de partículas para el rastro
const MAX_TRAIL_PARTICLES = 8;
const TRAIL_SPAWN_THRESHOLD = 15; // Distancia mínima para crear partícula

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  createdAt: number;
}

export function CustomCursor(): React.JSX.Element | null {
  const { type, color, text, isVisible } = useCursor();

  // Detectar dispositivos táctiles
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMouseInWindow, setIsMouseInWindow] = useState(false);

  // Posición del mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Posición del cursor principal (con delay)
  const cursorX = useSpring(mouseX, SPRING_CONFIG);
  const cursorY = useSpring(mouseY, SPRING_CONFIG);

  // Posición del cursor secundario (sigue exactamente)
  const dotX = useSpring(mouseX, SPRING_CONFIG_FAST);
  const dotY = useSpring(mouseY, SPRING_CONFIG_FAST);

  // Rastro de colores
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const lastTrailPosition = useRef({ x: 0, y: 0 });
  const particleIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Color actual del cursor
  const [currentColor, setCurrentColor] = useState(color);

  // Detectar touch device y reduced motion al montar
  useEffect(() => {
    const checkTouchDevice = (): boolean => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    const checkReducedMotion = (): boolean => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    setIsTouchDevice(checkTouchDevice());
    setIsReducedMotion(checkReducedMotion());

    // Listener para cambios en reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent): void => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Ocultar cursor nativo del sistema
  useEffect(() => {
    if (isTouchDevice) return;

    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('custom-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [isTouchDevice]);

  // Detectar color de sección basado en data-cursor-color
  const detectSectionColor = useCallback((x: number, y: number): string | null => {
    const element = document.elementFromPoint(x, y);
    if (!element) return null;

    // Buscar el elemento más cercano con data-cursor-color
    const sectionElement = element.closest('[data-cursor-color]');
    if (sectionElement) {
      const colorKey = sectionElement.getAttribute('data-cursor-color') as CursorColorKey;
      if (colorKey && colorKey in CURSOR_COLORS) {
        return CURSOR_COLORS[colorKey];
      }
      // Si es un color hex directo
      if (colorKey?.startsWith('#')) {
        return colorKey;
      }
    }

    return null;
  }, []);

  // Añadir partícula al rastro
  const addTrailParticle = useCallback((x: number, y: number, particleColor: string) => {
    if (isReducedMotion) return;

    const distance = Math.sqrt(
      Math.pow(x - lastTrailPosition.current.x, 2) +
      Math.pow(y - lastTrailPosition.current.y, 2)
    );

    if (distance > TRAIL_SPAWN_THRESHOLD) {
      lastTrailPosition.current = { x, y };
      particleIdRef.current += 1;

      const newParticle: TrailParticle = {
        id: particleIdRef.current,
        x,
        y,
        color: particleColor,
        createdAt: Date.now(),
      };

      setTrail((prev) => {
        const updated = [...prev, newParticle];
        // Mantener solo las últimas partículas
        return updated.slice(-MAX_TRAIL_PARTICLES);
      });
    }
  }, [isReducedMotion]);

  // Limpiar partículas antiguas
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setTrail((prev) => prev.filter((p) => now - p.createdAt < 500));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  // Manejar movimiento del mouse
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent): void => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        // Detectar color de sección
        const sectionColor = detectSectionColor(e.clientX, e.clientY);
        if (sectionColor) {
          setCurrentColor(sectionColor);
        } else {
          setCurrentColor(color);
        }

        // Añadir partícula al rastro si se mueve rápido
        addTrailParticle(e.clientX, e.clientY, sectionColor || color);
      });
    };

    const handleMouseEnter = (): void => {
      setIsMouseInWindow(true);
    };

    const handleMouseLeave = (): void => {
      setIsMouseInWindow(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isTouchDevice, mouseX, mouseY, color, detectSectionColor, addTrailParticle]);

  // Actualizar color cuando cambia desde el context
  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  // No renderizar en dispositivos táctiles
  if (isTouchDevice) {
    return null;
  }

  // Calcular tamaño según el tipo
  const size = CURSOR_SIZES[type];
  const isClickState = type === 'click';
  const isLinkState = type === 'link';
  const isDragState = type === 'drag';

  // Variantes de animación para el cursor principal
  const cursorVariants = {
    default: {
      scale: 1,
      opacity: 0.8,
    },
    hover: {
      scale: 1.2,
      opacity: 1,
    },
    click: {
      scale: 0.8,
      opacity: 1,
    },
    link: {
      scale: 1.1,
      opacity: 0.9,
    },
    drag: {
      scale: 1.3,
      opacity: 0.7,
    },
  };

  return (
    <>
      {/* Rastro de colores */}
      <AnimatePresence>
        {trail.map((particle) => (
          <motion.div
            key={particle.id}
            className="pointer-events-none fixed z-[9997] rounded-full"
            initial={{ opacity: 0.6, scale: 0.5 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              left: particle.x,
              top: particle.y,
              width: 12,
              height: 12,
              backgroundColor: particle.color,
              transform: 'translate(-50%, -50%)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Cursor principal - círculo grande con delay */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full mix-blend-difference"
        variants={cursorVariants}
        animate={type}
        transition={isReducedMotion ? { duration: 0 } : { duration: 0.15 }}
        style={{
          x: cursorX,
          y: cursorY,
          width: size,
          height: size,
          backgroundColor: 'transparent',
          border: `2px solid ${currentColor}`,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible && isMouseInWindow ? 1 : 0,
          willChange: 'transform, width, height, opacity',
        }}
      >
        {/* Icono de mano para links */}
        {isLinkState && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={currentColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </motion.div>
        )}

        {/* Icono de drag */}
        {isDragState && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={currentColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="5 9 2 12 5 15" />
              <polyline points="9 5 12 2 15 5" />
              <polyline points="15 19 12 22 9 19" />
              <polyline points="19 9 22 12 19 15" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="12" y1="2" x2="12" y2="22" />
            </svg>
          </motion.div>
        )}

        {/* Texto personalizado */}
        {text && (
          <motion.span
            className="absolute left-full ml-3 whitespace-nowrap text-sm font-medium"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ color: currentColor }}
          >
            {text}
          </motion.span>
        )}

        {/* Efecto de pulso en click */}
        <AnimatePresence>
          {isClickState && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                border: `2px solid ${currentColor}`,
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cursor secundario - punto pequeño que sigue exactamente */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          backgroundColor: currentColor,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible && isMouseInWindow ? 1 : 0,
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
}

// Componente wrapper para añadir interactividad a elementos
interface CursorHoverProps {
  children: React.ReactNode;
  type?: 'hover' | 'link' | 'drag';
  color?: string | keyof typeof CURSOR_COLORS;
  text?: string;
  className?: string;
}

export function CursorHover({
  children,
  type = 'hover',
  color,
  text,
  className = '',
}: CursorHoverProps): React.JSX.Element {
  const { setCursorType, setCursorColor, setCursorText, resetCursor } = useCursor();

  const handleMouseEnter = (): void => {
    setCursorType(type);
    if (color) setCursorColor(color);
    if (text) setCursorText(text);
  };

  const handleMouseLeave = (): void => {
    resetCursor();
  };

  const handleMouseDown = (): void => {
    setCursorType('click');
  };

  const handleMouseUp = (): void => {
    setCursorType(type);
  };

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
}
