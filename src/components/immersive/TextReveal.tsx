'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useInView, useReducedMotion, Variants, Transition } from 'framer-motion';

// Colores de la paleta
const COLORS = {
  blue: '#3B82F6',
  lime: '#84CC16',
  orange: '#F97316',
  terracotta: '#C2410C',
} as const;

type ColorKey = keyof typeof COLORS;

type RevealVariant = 'letter' | 'word' | 'line';
type TriggerType = 'scroll' | 'mount';
type SupportedTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface TextRevealProps {
  /** Texto a revelar */
  text: string;
  /** Variante de animacion */
  variant?: RevealVariant;
  /** Como se activa la animacion */
  trigger?: TriggerType;
  /** Duracion de cada elemento en segundos. Default: 0.5 */
  duration?: number;
  /** Delay inicial en segundos. Default: 0 */
  delay?: number;
  /** Delay entre elementos en segundos. Default: 0.03 */
  stagger?: number;
  /** Direccion de la revelacion */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Color del texto (opcional) */
  color?: ColorKey | string;
  /** Tag HTML a usar. Default: 'p' */
  as?: SupportedTag;
  /** Clase CSS adicional */
  className?: string;
  /** Umbral de viewport para activar. Default: 0.3 */
  threshold?: number;
  /** Activar una sola vez. Default: true */
  once?: boolean;
  /** Callback cuando la animacion empieza */
  onAnimationStart?: () => void;
  /** Callback cuando la animacion termina */
  onAnimationComplete?: () => void;
}

// Variantes de animacion segun direccion
const getInitialPosition = (direction: string): { x?: number; y?: number } => {
  switch (direction) {
    case 'up':
      return { y: 40 };
    case 'down':
      return { y: -40 };
    case 'left':
      return { x: 40 };
    case 'right':
      return { x: -40 };
    default:
      return { y: 40 };
  }
};

// Componente para letra individual
const AnimatedLetter: React.FC<{
  char: string;
  variants: Variants;
  transition: Transition;
}> = ({ char, variants, transition }) => (
  <motion.span
    variants={variants}
    transition={transition}
    style={{
      display: 'inline-block',
      whiteSpace: char === ' ' ? 'pre' : 'normal',
    }}
  >
    {char === ' ' ? '\u00A0' : char}
  </motion.span>
);

// Componente para palabra individual
const AnimatedWord: React.FC<{
  word: string;
  variants: Variants;
  transition: Transition;
}> = ({ word, variants, transition }) => (
  <motion.span
    variants={variants}
    transition={transition}
    style={{
      display: 'inline-block',
      marginRight: '0.25em',
    }}
  >
    {word}
  </motion.span>
);

// Componente para linea individual
const AnimatedLine: React.FC<{
  line: string;
  variants: Variants;
  transition: Transition;
}> = ({ line, variants, transition }) => (
  <motion.span
    variants={variants}
    transition={transition}
    style={{
      display: 'block',
      overflow: 'hidden',
    }}
  >
    <motion.span
      style={{ display: 'block' }}
      variants={{
        hidden: { y: '100%' },
        visible: { y: 0 },
      }}
    >
      {line}
    </motion.span>
  </motion.span>
);

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  variant = 'word',
  trigger = 'scroll',
  duration = 0.5,
  delay = 0,
  stagger = 0.03,
  direction = 'up',
  color,
  as = 'p',
  className = '',
  threshold = 0.3,
  once = true,
  onAnimationStart,
  onAnimationComplete,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: threshold, once });
  const prefersReducedMotion = useReducedMotion();

  // Resolver color
  const resolvedColor = color
    ? (color in COLORS ? COLORS[color as ColorKey] : color)
    : undefined;

  // Determinar si animar
  const shouldAnimate = trigger === 'mount' || isInView;

  // Variantes de animacion
  const itemVariants: Variants = useMemo(() => ({
    hidden: {
      opacity: 0,
      ...getInitialPosition(direction),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  }), [direction]);

  // Transicion
  const itemTransition: Transition = useMemo(() => ({
    duration,
    ease: [0.25, 0.46, 0.45, 0.94],
  }), [duration]);

  // Container variants
  const containerVariants: Variants = useMemo(() => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }), [stagger, delay]);

  // Dividir texto segun variante
  const elements = useMemo(() => {
    switch (variant) {
      case 'letter':
        return text.split('');
      case 'word':
        return text.split(' ');
      case 'line':
        return text.split('\n');
      default:
        return text.split(' ');
    }
  }, [text, variant]);

  // Renderizar contenido interno
  const renderContent = () => (
    <>
      {elements.map((element, index) => {
        switch (variant) {
          case 'letter':
            return (
              <AnimatedLetter
                key={`letter-${index}`}
                char={element}
                variants={itemVariants}
                transition={itemTransition}
              />
            );
          case 'word':
            return (
              <AnimatedWord
                key={`word-${index}`}
                word={element}
                variants={itemVariants}
                transition={itemTransition}
              />
            );
          case 'line':
            return (
              <AnimatedLine
                key={`line-${index}`}
                line={element}
                variants={itemVariants}
                transition={itemTransition}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );

  // Estilos base
  const baseStyle: React.CSSProperties = {
    color: resolvedColor,
    overflow: 'hidden',
  };

  // Si prefiere movimiento reducido, renderizar estatico con fade
  if (prefersReducedMotion) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ color: resolvedColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.div>
    );
  }

  // Renderizar con el tag apropiado
  switch (as) {
    case 'h1':
      return (
        <motion.h1
          ref={ref as React.RefObject<HTMLHeadingElement>}
          className={className}
          style={baseStyle}
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          onAnimationStart={() => shouldAnimate && onAnimationStart?.()}
          onAnimationComplete={() => shouldAnimate && onAnimationComplete?.()}
        >
          {renderContent()}
        </motion.h1>
      );
    case 'h2':
      return (
        <motion.h2
          ref={ref as React.RefObject<HTMLHeadingElement>}
          className={className}
          style={baseStyle}
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          onAnimationStart={() => shouldAnimate && onAnimationStart?.()}
          onAnimationComplete={() => shouldAnimate && onAnimationComplete?.()}
        >
          {renderContent()}
        </motion.h2>
      );
    case 'h3':
      return (
        <motion.h3
          ref={ref as React.RefObject<HTMLHeadingElement>}
          className={className}
          style={baseStyle}
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          onAnimationStart={() => shouldAnimate && onAnimationStart?.()}
          onAnimationComplete={() => shouldAnimate && onAnimationComplete?.()}
        >
          {renderContent()}
        </motion.h3>
      );
    case 'h4':
      return (
        <motion.h4
          ref={ref as React.RefObject<HTMLHeadingElement>}
          className={className}
          style={baseStyle}
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          onAnimationStart={() => shouldAnimate && onAnimationStart?.()}
          onAnimationComplete={() => shouldAnimate && onAnimationComplete?.()}
        >
          {renderContent()}
        </motion.h4>
      );
    case 'h5':
      return (
        <motion.h5
          ref={ref as React.RefObject<HTMLHeadingElement>}
          className={className}
          style={baseStyle}
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          onAnimationStart={() => shouldAnimate && onAnimationStart?.()}
          onAnimationComplete={() => shouldAnimate && onAnimationComplete?.()}
        >
          {renderContent()}
        </motion.h5>
      );
    case 'h6':
      return (
        <motion.h6
          ref={ref as React.RefObject<HTMLHeadingElement>}
          className={className}
          style={baseStyle}
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          onAnimationStart={() => shouldAnimate && onAnimationStart?.()}
          onAnimationComplete={() => shouldAnimate && onAnimationComplete?.()}
        >
          {renderContent()}
        </motion.h6>
      );
    case 'span':
      return (
        <motion.span
          ref={ref as React.RefObject<HTMLSpanElement>}
          className={className}
          style={baseStyle}
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          onAnimationStart={() => shouldAnimate && onAnimationStart?.()}
          onAnimationComplete={() => shouldAnimate && onAnimationComplete?.()}
        >
          {renderContent()}
        </motion.span>
      );
    case 'div':
      return (
        <motion.div
          ref={ref}
          className={className}
          style={baseStyle}
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          onAnimationStart={() => shouldAnimate && onAnimationStart?.()}
          onAnimationComplete={() => shouldAnimate && onAnimationComplete?.()}
        >
          {renderContent()}
        </motion.div>
      );
    default:
      return (
        <motion.p
          ref={ref as React.RefObject<HTMLParagraphElement>}
          className={className}
          style={baseStyle}
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          onAnimationStart={() => shouldAnimate && onAnimationStart?.()}
          onAnimationComplete={() => shouldAnimate && onAnimationComplete?.()}
        >
          {renderContent()}
        </motion.p>
      );
  }
};

export { COLORS as TEXT_REVEAL_COLORS };
export default TextReveal;
