'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Curvas de easing personalizadas (tipo BezierDefinition)
const easeOutQuad: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const easeInQuad: [number, number, number, number] = [0.55, 0.085, 0.68, 0.53];
const easeInOutCubic: [number, number, number, number] = [0.645, 0.045, 0.355, 1];

// Colores de la marca para transiciones
export const TRANSITION_COLORS = {
  blue: '#3B82F6',
  lime: '#84CC16',
  orange: '#F97316',
  terracotta: '#C2410C',
} as const;

export type TransitionColorKey = keyof typeof TRANSITION_COLORS;

// Tipos de animación disponibles
export type TransitionVariant = 'fade' | 'slideUp' | 'slideDown' | 'scale';

interface PageTransitionContextValue {
  isTransitioning: boolean;
  currentPath: string;
  setTransitioning: (value: boolean) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function usePageTransition(): PageTransitionContextValue {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider');
  }
  return context;
}

// Variantes de animacion para el contenido de la pagina
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOutQuad,
      when: 'beforeChildren' as const,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: easeInQuad,
    },
  },
};

// Variantes alternativas tipadas correctamente
export const transitionVariants: Record<TransitionVariant, Variants> = {
  fade: {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeIn' },
    },
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOutQuad },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: easeInQuad },
    },
  },
  slideDown: {
    initial: { opacity: 0, y: -30 },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOutQuad },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3, ease: easeInQuad },
    },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    enter: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: easeOutQuad },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      transition: { duration: 0.25, ease: easeInQuad },
    },
  },
};

interface PageTransitionProviderProps {
  children: ReactNode;
}

/**
 * Provider que gestiona el estado de las transiciones de pagina
 */
export function PageTransitionProvider({
  children,
}: PageTransitionProviderProps): React.JSX.Element {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  // Detectar cambios de ruta
  useEffect(() => {
    if (pathname !== currentPath) {
      setIsTransitioning(true);
      // Actualizar path despues de un pequeno delay para permitir la animacion de salida
      const timer = setTimeout(() => {
        setCurrentPath(pathname);
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [pathname, currentPath]);

  const setTransitioning = useCallback((value: boolean) => {
    setIsTransitioning(value);
  }, []);

  const value = useMemo<PageTransitionContextValue>(
    () => ({
      isTransitioning,
      currentPath,
      setTransitioning,
    }),
    [isTransitioning, currentPath, setTransitioning]
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
    </PageTransitionContext.Provider>
  );
}

interface PageTransitionProps {
  children: ReactNode;
  variant?: TransitionVariant;
  className?: string;
  /** Desactivar animaciones (para accesibilidad) */
  disabled?: boolean;
}

/**
 * Componente que envuelve el contenido de cada pagina con animaciones
 * de entrada y salida fluidas
 */
export function PageTransition({
  children,
  variant = 'slideUp',
  className = '',
  disabled = false,
}: PageTransitionProps): React.JSX.Element {
  const pathname = usePathname();

  // Respetar preferencias de movimiento reducido
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const shouldAnimate = !disabled && !prefersReducedMotion;
  const selectedVariants = transitionVariants[variant];

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={selectedVariants}
        className={className}
        style={{ willChange: 'opacity, transform' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Componente simplificado para transiciones basicas
 * Usa la animacion por defecto (fade + slideUp)
 */
export function PageWrapper({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}): React.JSX.Element {
  const pathname = usePathname();

  // Respetar preferencias de movimiento reducido
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className={className}
        style={{ willChange: 'opacity, transform' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
