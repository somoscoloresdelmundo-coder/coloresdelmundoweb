'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { OVERLAY_COLORS, type OverlayColorKey } from '@/lib/design/colors';

// Re-export for backward compatibility
export { OVERLAY_COLORS, type OverlayColorKey };
export type TransitionEffect = 'wipe' | 'circle' | 'blocks' | 'curtain';

// Array de colores para efectos multicolor
const colorSequence = [
  OVERLAY_COLORS.blue,
  OVERLAY_COLORS.lime,
  OVERLAY_COLORS.orange,
  OVERLAY_COLORS.terracotta,
];

interface TransitionOverlayContextValue {
  isActive: boolean;
  effect: TransitionEffect;
  triggerTransition: (href: string, effect?: TransitionEffect) => void;
  setEffect: (effect: TransitionEffect) => void;
}

const TransitionOverlayContext = createContext<TransitionOverlayContextValue | null>(null);

export function useTransitionOverlay(): TransitionOverlayContextValue {
  const context = useContext(TransitionOverlayContext);
  if (!context) {
    throw new Error('useTransitionOverlay must be used within a TransitionOverlayProvider');
  }
  return context;
}

// Variantes para efecto Wipe (cortina horizontal)
const wipeVariants: Variants = {
  initial: {
    scaleX: 0,
    originX: 0,
  },
  enter: {
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.5,
      ease: [0.645, 0.045, 0.355, 1], // easeInOutCubic
    },
  },
  exit: {
    scaleX: 0,
    originX: 1,
    transition: {
      duration: 0.5,
      ease: [0.645, 0.045, 0.355, 1],
      delay: 0.1,
    },
  },
};

// Variantes para efecto Circle (expansion circular)
const circleVariants: Variants = {
  initial: {
    clipPath: 'circle(0% at 50% 50%)',
  },
  enter: {
    clipPath: 'circle(150% at 50% 50%)',
    transition: {
      duration: 0.7,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
  exit: {
    clipPath: 'circle(0% at 50% 50%)',
    transition: {
      duration: 0.5,
      ease: [0.645, 0.045, 0.355, 1],
      delay: 0.1,
    },
  },
};

// Variantes para efecto Blocks (bloques que aparecen)
const blockContainerVariants: Variants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
      delay: 0.1,
    },
  },
};

const blockVariants: Variants = {
  initial: {
    scaleY: 0,
    originY: 1,
  },
  enter: {
    scaleY: 1,
    originY: 1,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
  exit: {
    scaleY: 0,
    originY: 0,
    transition: {
      duration: 0.3,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
};

// Variantes para efecto Curtain (cortinas multiples)
const curtainContainerVariants: Variants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: 1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
      delay: 0.15,
    },
  },
};

const curtainVariants: Variants = {
  initial: {
    scaleX: 0,
    originX: 0,
  },
  enter: {
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.5,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
  exit: {
    scaleX: 0,
    originX: 1,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
};

interface TransitionOverlayProviderProps {
  children: ReactNode;
  defaultEffect?: TransitionEffect;
}

/**
 * Provider para el sistema de transiciones con overlay
 */
export function TransitionOverlayProvider({
  children,
  defaultEffect = 'curtain',
}: TransitionOverlayProviderProps): React.JSX.Element {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [effect, setEffect] = useState<TransitionEffect>(defaultEffect);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const triggerTransition = useCallback(
    (href: string, transitionEffect?: TransitionEffect) => {
      if (transitionEffect) {
        setEffect(transitionEffect);
      }
      setPendingHref(href);
      setIsActive(true);

      // Navegar despues de que la animacion de entrada complete
      const navigationDelay = transitionEffect === 'circle' ? 700 : 500;
      setTimeout(() => {
        router.push(href);
        // Desactivar overlay despues de navegar
        setTimeout(() => {
          setIsActive(false);
          setPendingHref(null);
        }, 100);
      }, navigationDelay);
    },
    [router]
  );

  const value = useMemo<TransitionOverlayContextValue>(
    () => ({
      isActive,
      effect,
      triggerTransition,
      setEffect,
    }),
    [isActive, effect, triggerTransition]
  );

  return (
    <TransitionOverlayContext.Provider value={value}>
      {children}
      <TransitionOverlay isActive={isActive} effect={effect} />
    </TransitionOverlayContext.Provider>
  );
}

interface TransitionOverlayProps {
  isActive: boolean;
  effect: TransitionEffect;
}

/**
 * Componente visual del overlay de transicion
 */
function TransitionOverlay({ isActive, effect }: TransitionOverlayProps): React.JSX.Element {
  // Respetar preferencias de movimiento reducido
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (prefersReducedMotion) {
    return <></>;
  }

  return (
    <AnimatePresence>
      {isActive && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none"
          aria-hidden="true"
        >
          {effect === 'wipe' && <WipeEffect />}
          {effect === 'circle' && <CircleEffect />}
          {effect === 'blocks' && <BlocksEffect />}
          {effect === 'curtain' && <CurtainEffect />}
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * Efecto Wipe - Cortina horizontal con los 4 colores
 */
function WipeEffect(): React.JSX.Element {
  return (
    <>
      {colorSequence.map((color, index) => (
        <motion.div
          key={color}
          className="absolute inset-0"
          style={{
            backgroundColor: color,
            zIndex: colorSequence.length - index,
          }}
          variants={wipeVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{
            delay: index * 0.05,
          }}
        />
      ))}
    </>
  );
}

/**
 * Efecto Circle - Expansion circular con degradado
 */
function CircleEffect(): React.JSX.Element {
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, ${colorSequence[0]} 0%, ${colorSequence[1]} 33%, ${colorSequence[2]} 66%, ${colorSequence[3]} 100%)`,
      }}
      variants={circleVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    />
  );
}

/**
 * Efecto Blocks - Bloques verticales que aparecen escalonadamente
 */
function BlocksEffect(): React.JSX.Element {
  const blockCount = 8;

  return (
    <motion.div
      className="absolute inset-0 flex"
      variants={blockContainerVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {Array.from({ length: blockCount }).map((_, index) => (
        <motion.div
          key={index}
          className="flex-1 h-full"
          style={{
            backgroundColor: colorSequence[index % colorSequence.length],
          }}
          variants={blockVariants}
        />
      ))}
    </motion.div>
  );
}

/**
 * Efecto Curtain - Cortinas horizontales con los 4 colores
 */
function CurtainEffect(): React.JSX.Element {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      variants={curtainContainerVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {colorSequence.map((color, index) => (
        <motion.div
          key={color}
          className="flex-1 w-full"
          style={{ backgroundColor: color }}
          variants={curtainVariants}
        />
      ))}
    </motion.div>
  );
}

// =============================================================================
// COMPONENTES DE ENLACE CON TRANSICION
// =============================================================================

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  effect?: TransitionEffect;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Link que activa la transicion de overlay antes de navegar
 */
export function TransitionLink({
  href,
  children,
  effect,
  className = '',
  onClick,
  ...props
}: TransitionLinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>): React.JSX.Element {
  const { triggerTransition } = useTransitionOverlay();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Solo interceptar links internos
      const isInternal = href.startsWith('/') || href.startsWith('#');
      const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

      if (isInternal && !isModified) {
        e.preventDefault();
        onClick?.(e);
        triggerTransition(href, effect);
      }
    },
    [href, effect, onClick, triggerTransition]
  );

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}

interface TransitionButtonProps {
  href: string;
  children: ReactNode;
  effect?: TransitionEffect;
  className?: string;
  disabled?: boolean;
}

/**
 * Boton que activa la transicion de overlay antes de navegar
 */
export function TransitionButton({
  href,
  children,
  effect,
  className = '',
  disabled = false,
  ...props
}: TransitionButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>): React.JSX.Element {
  const { triggerTransition } = useTransitionOverlay();

  const handleClick = useCallback(() => {
    if (!disabled) {
      triggerTransition(href, effect);
    }
  }, [href, effect, disabled, triggerTransition]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// Hook para usar transiciones programaticamente
export function useNavigateWithTransition() {
  const { triggerTransition, setEffect } = useTransitionOverlay();

  const navigate = useCallback(
    (href: string, effect?: TransitionEffect) => {
      triggerTransition(href, effect);
    },
    [triggerTransition]
  );

  return { navigate, setEffect };
}
