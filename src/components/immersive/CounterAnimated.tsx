'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useReducedMotion, animate, useMotionValue, useTransform } from 'framer-motion';

// Colores de la paleta
const COLORS = {
  blue: '#3B82F6',
  lime: '#84CC16',
  orange: '#F97316',
  terracotta: '#C2410C',
} as const;

type ColorKey = keyof typeof COLORS;

type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'spring';

export interface CounterAnimatedProps {
  /** Valor final del contador */
  value: number;
  /** Valor inicial. Default: 0 */
  startValue?: number;
  /** Prefijo antes del numero */
  prefix?: string;
  /** Sufijo despues del numero (ej: +, %, K) */
  suffix?: string;
  /** Duracion de la animacion en segundos. Default: 2 */
  duration?: number;
  /** Delay inicial en segundos. Default: 0 */
  delay?: number;
  /** Tipo de easing. Default: 'easeOut' */
  easing?: EasingType;
  /** Numero de decimales. Default: 0 */
  decimals?: number;
  /** Separador de miles. Default: ',' */
  thousandsSeparator?: string;
  /** Color del numero */
  color?: ColorKey | string;
  /** Umbral de viewport para activar. Default: 0.5 */
  threshold?: number;
  /** Activar una sola vez. Default: true */
  once?: boolean;
  /** Clase CSS adicional */
  className?: string;
  /** Clase para el numero */
  numberClassName?: string;
  /** Clase para prefix/suffix */
  affixClassName?: string;
  /** Callback cuando la animacion termina */
  onComplete?: () => void;
  /** Desactivar animacion */
  disabled?: boolean;
}

// Funciones de easing
const getEasingFunction = (type: EasingType): ((t: number) => number) | undefined => {
  switch (type) {
    case 'linear':
      return (t) => t;
    case 'easeIn':
      return (t) => t * t * t;
    case 'easeOut':
      return (t) => 1 - Math.pow(1 - t, 3);
    case 'easeInOut':
      return (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    case 'spring':
      return undefined; // Framer Motion usara spring
    default:
      return (t) => 1 - Math.pow(1 - t, 3);
  }
};

// Formatear numero con separador de miles
const formatNumber = (
  num: number,
  decimals: number,
  thousandsSeparator: string
): string => {
  const fixed = num.toFixed(decimals);
  const [intPart, decPart] = fixed.split('.');

  const formattedInt = intPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator
  );

  return decPart !== undefined
    ? `${formattedInt}.${decPart}`
    : formattedInt;
};

export const CounterAnimated: React.FC<CounterAnimatedProps> = ({
  value,
  startValue = 0,
  prefix = '',
  suffix = '',
  duration = 2,
  delay = 0,
  easing = 'easeOut',
  decimals = 0,
  thousandsSeparator = ',',
  color,
  threshold = 0.5,
  once = true,
  className = '',
  numberClassName = '',
  affixClassName = '',
  onComplete,
  disabled = false,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: threshold, once });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(startValue);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Motion value para animacion fluida
  const motionValue = useMotionValue(startValue);

  // Resolver color
  const resolvedColor = color
    ? (color in COLORS ? COLORS[color as ColorKey] : color)
    : undefined;

  // Actualizar displayValue cuando cambia motionValue
  useEffect(() => {
    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [motionValue]);

  // Animar cuando entra en viewport
  useEffect(() => {
    if (!isInView || hasAnimated || disabled) return;

    // Si prefiere movimiento reducido, mostrar valor final directamente
    if (prefersReducedMotion) {
      setDisplayValue(value);
      setHasAnimated(true);
      onComplete?.();
      return;
    }

    const controls = animate(motionValue, value, {
      duration,
      delay,
      ease: getEasingFunction(easing),
      type: easing === 'spring' ? 'spring' : 'tween',
      onComplete: () => {
        setHasAnimated(true);
        onComplete?.();
      },
    });

    return () => controls.stop();
  }, [
    isInView,
    hasAnimated,
    disabled,
    prefersReducedMotion,
    value,
    duration,
    delay,
    easing,
    motionValue,
    onComplete,
  ]);

  // Resetear si el valor cambia y no es "once"
  useEffect(() => {
    if (!once && hasAnimated) {
      setHasAnimated(false);
      motionValue.set(startValue);
    }
  }, [value, once, hasAnimated, motionValue, startValue]);

  const formattedValue = formatNumber(displayValue, decimals, thousandsSeparator);

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: delay * 0.5 }}
    >
      {prefix && (
        <span className={affixClassName} style={{ color: resolvedColor }}>
          {prefix}
        </span>
      )}
      <span
        className={numberClassName}
        style={{
          color: resolvedColor,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formattedValue}
      </span>
      {suffix && (
        <span className={affixClassName} style={{ color: resolvedColor }}>
          {suffix}
        </span>
      )}
    </motion.span>
  );
};

// Componente para mostrar multiples contadores en grupo
export interface CounterGroupProps {
  children: React.ReactNode;
  /** Delay entre contadores en segundos. Default: 0.2 */
  stagger?: number;
  /** Clase CSS adicional */
  className?: string;
}

export const CounterGroup: React.FC<CounterGroupProps> = ({
  children,
  stagger = 0.2,
  className = '',
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => {
        if (React.isValidElement<CounterAnimatedProps>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            delay: (child.props.delay || 0) + index * stagger,
          });
        }
        return child;
      })}
    </div>
  );
};

export { COLORS as COUNTER_COLORS };
export default CounterAnimated;
