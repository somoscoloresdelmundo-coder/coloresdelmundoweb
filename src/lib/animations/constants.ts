/**
 * COLORES DEL MUNDO - Animation Constants
 *
 * Valores centralizados para animaciones.
 * Usar estos valores en lugar de hardcodear en componentes.
 */

// =============================================================================
// DURATIONS - Valores en segundos (para GSAP/Framer Motion)
// =============================================================================

export const DURATIONS = {
  /** Ultra fast - 150ms */
  fastest: 0.15,
  /** Fast - 200ms */
  fast: 0.2,
  /** Normal - 300ms */
  normal: 0.3,
  /** Medium - 400ms */
  medium: 0.4,
  /** Slow - 500ms */
  slow: 0.5,
  /** Slower - 600ms */
  slower: 0.6,
  /** Very slow - 800ms */
  verySlow: 0.8,
  /** Extra slow - 1000ms */
  extraSlow: 1.0,
  /** Hero reveal - 1200ms */
  heroReveal: 1.2,
  /** Hero slow - 1500ms */
  heroSlow: 1.5,
  /** Continuous animation - 4000ms */
  continuous: 4.0,
} as const;

/**
 * Durations en milisegundos (para setTimeout, CSS)
 */
export const DURATIONS_MS = {
  fastest: 150,
  fast: 200,
  normal: 300,
  medium: 400,
  slow: 500,
  slower: 600,
  verySlow: 800,
  extraSlow: 1000,
} as const;

/**
 * Nombres de duración para Tailwind CSS
 */
export const TAILWIND_DURATIONS = {
  fastest: 'duration-150',
  fast: 'duration-200',
  normal: 'duration-300',
  medium: 'duration-400',
  slow: 'duration-500',
  slower: 'duration-600',
  verySlow: 'duration-800',
  extraSlow: 'duration-1000',
} as const;

// =============================================================================
// INTERSECTION OBSERVER THRESHOLDS
// =============================================================================

export const THRESHOLDS = {
  /** Activar apenas visible */
  minimal: 0.1,
  /** Activar al 15% visible */
  low: 0.15,
  /** Activar al 20% visible */
  medium: 0.2,
  /** Activar al 30% visible */
  high: 0.3,
  /** Activar al 50% visible */
  half: 0.5,
  /** Activar cuando está casi completamente visible */
  full: 0.8,
} as const;

// =============================================================================
// STAGGER DELAYS - Delays entre elementos en secuencias
// =============================================================================

export const STAGGER = {
  /** Muy rápido - para letras */
  letters: 0.02,
  /** Rápido - para caracteres */
  fast: 0.03,
  /** Normal - para palabras */
  normal: 0.05,
  /** Medio - estándar */
  medium: 0.08,
  /** Lento - para items destacados */
  slow: 0.1,
  /** Muy lento - para efectos dramáticos */
  slower: 0.15,
  /** Extra lento */
  extraSlow: 0.2,
} as const;

// =============================================================================
// TRANSFORM DISTANCES - Distancias de movimiento en pixels
// =============================================================================

export const DISTANCES = {
  /** Extra pequeño - 8px */
  xs: 8,
  /** Pequeño - 16px */
  sm: 16,
  /** Medio - 24px */
  md: 24,
  /** Normal - 30px */
  normal: 30,
  /** Grande - 40px */
  lg: 40,
  /** Extra grande - 60px */
  xl: 60,
  /** Muy grande - 100px */
  xxl: 100,
} as const;

// =============================================================================
// SCALE VALUES - Valores de escala para animaciones
// =============================================================================

export const SCALES = {
  /** Escala muy pequeña */
  tiny: 0.5,
  /** Escala pequeña */
  small: 0.8,
  /** Escala media-pequeña */
  medium: 0.85,
  /** Escala casi normal */
  slight: 0.9,
  /** Escala mínima */
  minimal: 0.95,
  /** Normal */
  normal: 1,
  /** Ligeramente aumentada */
  slightUp: 1.02,
  /** Aumentada */
  up: 1.05,
  /** Muy aumentada */
  large: 1.1,
  /** Hover típico */
  hover: 1.05,
  /** Hover sutil */
  hoverSubtle: 1.02,
} as const;

// =============================================================================
// SPRING CONFIGS - Configuraciones para Framer Motion springs
// =============================================================================

export const SPRING_CONFIGS = {
  /** Suave - para movimientos lentos */
  soft: {
    stiffness: 100,
    damping: 20,
    mass: 1,
  },
  /** Normal - uso general */
  normal: {
    stiffness: 150,
    damping: 15,
    mass: 0.5,
  },
  /** Bouncy - con rebote */
  bouncy: {
    stiffness: 300,
    damping: 10,
    mass: 0.5,
  },
  /** Snappy - respuesta rápida */
  snappy: {
    stiffness: 300,
    damping: 20,
    mass: 0.1,
  },
  /** Magnetic - para efectos magnéticos */
  magnetic: {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  },
} as const;

// =============================================================================
// BLUR VALUES - Valores de desenfoque
// =============================================================================

export const BLUR = {
  /** Sin blur */
  none: 0,
  /** Blur sutil */
  subtle: 4,
  /** Blur normal */
  normal: 8,
  /** Blur medio */
  medium: 10,
  /** Blur fuerte */
  strong: 16,
  /** Blur muy fuerte */
  heavy: 24,
} as const;

// =============================================================================
// ELEVATION - Valores de elevación/sombra
// =============================================================================

export const ELEVATION = {
  /** Sin elevación */
  none: 0,
  /** Elevación base */
  base: 4,
  /** Elevación pequeña */
  small: 8,
  /** Elevación media */
  medium: 12,
  /** Elevación normal */
  normal: 16,
  /** Elevación alta */
  high: 20,
  /** Elevación máxima */
  max: 32,
} as const;

// =============================================================================
// MAGNETIC EFFECT DEFAULTS
// =============================================================================

export const MAGNETIC = {
  /** Fuerza del efecto */
  strength: 0.3,
  /** Radio de activación */
  radius: 100,
  /** Fuerza para botones */
  buttonStrength: 0.2,
} as const;

// =============================================================================
// PARTICLE ANIMATION DEFAULTS
// =============================================================================

export const PARTICLES = {
  /** Cantidad por defecto */
  count: 30,
  /** Tamaño máximo */
  maxSize: 8,
  /** Multiplicadores de velocidad */
  speed: {
    slow: 0.3,
    normal: 0.6,
    fast: 1.0,
  },
} as const;

// =============================================================================
// TYPES
// =============================================================================

export type DurationKey = keyof typeof DURATIONS;
export type ThresholdKey = keyof typeof THRESHOLDS;
export type StaggerKey = keyof typeof STAGGER;
export type DistanceKey = keyof typeof DISTANCES;
export type ScaleKey = keyof typeof SCALES;
export type SpringConfigKey = keyof typeof SPRING_CONFIGS;
