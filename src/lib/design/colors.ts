/**
 * COLORES DEL MUNDO - Sistema de Colores Centralizado
 *
 * Este archivo es la ÚNICA fuente de verdad para colores en JavaScript/TypeScript.
 * Los valores deben coincidir con tokens.css
 *
 * Uso:
 * - Componentes que necesiten valores hex: import { COLORS } from '@/lib/design/colors'
 * - Componentes que necesiten clases CSS: import { colorClasses } from '@/types/ui'
 */

import type { ColorVariant } from '@/types/ui';

// =============================================================================
// VALORES HEX - Coinciden con tokens.css
// =============================================================================

export const COLORS = {
  azul: {
    primary: '#4B89BF',
    light: '#5E9ED1',
    dark: '#2E5F8A',
    bg: 'rgba(75, 137, 191, 0.18)',
    subtle: 'rgba(75, 137, 191, 0.08)',
  },
  lima: {
    primary: '#9AAD2E',
    light: '#B1C442',
    dark: '#6B7A1F',
    bg: 'rgba(154, 173, 46, 0.18)',
    subtle: 'rgba(154, 173, 46, 0.08)',
  },
  naranja: {
    primary: '#F29A2E',
    light: '#F5AD4D',
    dark: '#D4841F',
    bg: 'rgba(242, 154, 46, 0.18)',
    subtle: 'rgba(242, 154, 46, 0.08)',
  },
  terracota: {
    primary: '#D94423',
    light: '#E55A3C',
    dark: '#A83318',
    bg: 'rgba(217, 68, 35, 0.15)',
    subtle: 'rgba(217, 68, 35, 0.07)',
  },
} as const;

// =============================================================================
// COLORES NEUTROS
// =============================================================================

export const NEUTRALS = {
  negro: '#0D0D0D',
  negroLight: '#1A1A1A',
  gris900: '#171717',
  gris800: '#262626',
  gris700: '#404040',
  gris600: '#525252',
  gris500: '#737373',
  gris400: '#A3A3A3',
  gris300: '#D4D4D4',
  gris200: '#E5E5E5',
  gris100: '#F5F5F5',
  gris50: '#FAFAFA',
  blanco: '#FFFFFF',
} as const;

// =============================================================================
// COLOR MAP COMPLETO - Para componentes que necesitan todas las variantes
// =============================================================================

export const COLOR_MAP = {
  azul: {
    primary: COLORS.azul.primary,
    light: COLORS.azul.light,
    dark: COLORS.azul.dark,
    bg: COLORS.azul.bg,
    bgSolid: '#EBF4FA',
    subtle: COLORS.azul.subtle,
    border: 'rgba(75, 137, 191, 0.2)',
    text: COLORS.azul.dark,
    accent: COLORS.azul.primary,
    // CSS Variables
    cssVar: 'var(--azul)',
    cssBg: 'var(--azul-bg)',
  },
  lima: {
    primary: COLORS.lima.primary,
    light: COLORS.lima.light,
    dark: COLORS.lima.dark,
    bg: COLORS.lima.bg,
    bgSolid: '#F7FEE7',
    subtle: COLORS.lima.subtle,
    border: 'rgba(154, 173, 46, 0.2)',
    text: COLORS.lima.dark,
    accent: COLORS.lima.primary,
    cssVar: 'var(--lima)',
    cssBg: 'var(--lima-bg)',
  },
  naranja: {
    primary: COLORS.naranja.primary,
    light: COLORS.naranja.light,
    dark: COLORS.naranja.dark,
    bg: COLORS.naranja.bg,
    bgSolid: '#FFF7ED',
    subtle: COLORS.naranja.subtle,
    border: 'rgba(242, 154, 46, 0.2)',
    text: COLORS.naranja.dark,
    accent: COLORS.naranja.primary,
    cssVar: 'var(--naranja)',
    cssBg: 'var(--naranja-bg)',
  },
  terracota: {
    primary: COLORS.terracota.primary,
    light: COLORS.terracota.light,
    dark: COLORS.terracota.dark,
    bg: COLORS.terracota.bg,
    bgSolid: '#FEF2F2',
    subtle: COLORS.terracota.subtle,
    border: 'rgba(217, 68, 35, 0.2)',
    text: COLORS.terracota.dark,
    accent: COLORS.terracota.primary,
    cssVar: 'var(--terracota)',
    cssBg: 'var(--terracota-bg)',
  },
} as const;

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Obtiene el color completo por nombre
 */
export function getColor(color: ColorVariant) {
  return COLOR_MAP[color];
}

/**
 * Obtiene solo el valor primario hex
 */
export function getPrimaryColor(color: ColorVariant): string {
  return COLORS[color].primary;
}

/**
 * Mapeo simple para fondos (compatible con WaveDivider, etc.)
 */
export const BACKGROUND_COLORS: Record<ColorVariant | 'white' | 'gray', string> = {
  azul: 'var(--azul-bg)',
  lima: 'var(--lima-bg)',
  naranja: 'var(--naranja-bg)',
  terracota: 'var(--terracota-bg)',
  white: '#ffffff',
  gray: 'var(--gris-50)',
};

/**
 * Array de todos los colores para iteraciones
 */
export const ALL_COLORS: ColorVariant[] = ['azul', 'lima', 'naranja', 'terracota'];

/**
 * Colores muy sutiles para fondos animados/blur
 * Usados en InteractiveBackground y efectos similares
 */
export const SUBTLE_BACKGROUND_COLORS: Record<ColorVariant, string> = {
  azul: 'rgba(212, 229, 247, 0.4)',
  lima: 'rgba(232, 239, 197, 0.4)',
  naranja: 'rgba(255, 228, 199, 0.4)',
  terracota: 'rgba(248, 212, 204, 0.4)',
};

// =============================================================================
// TYPES
// =============================================================================

export type ColorMapEntry = typeof COLOR_MAP[ColorVariant];
export type ColorKey = keyof typeof COLORS;

// =============================================================================
// HEX VALUES - Para uso en SVG, inline styles, canvas
// =============================================================================

/**
 * Valores hex primarios directos para SVG fills y inline styles
 */
export const PRIMARY_HEX = {
  azul: COLORS.azul.primary,
  lima: COLORS.lima.primary,
  naranja: COLORS.naranja.primary,
  terracota: COLORS.terracota.primary,
} as const;

/**
 * Colores para canvas/partículas con transparencia
 */
export const PARTICLE_COLORS = [
  'rgba(75, 137, 191, 0.6)',   // azul
  'rgba(154, 173, 46, 0.5)',   // lima
  'rgba(242, 154, 46, 0.5)',   // naranja
  'rgba(217, 68, 35, 0.4)',    // terracota
] as const;

// =============================================================================
// COLORES PARA DIVISORES Y TRANSICIONES
// Usar en WaveDivider, BlobDivider, ParticlesDivider, TransitionOverlay
// =============================================================================

/**
 * Colores para divisores animados (inmersivos)
 * Usa los colores de marca en lugar de colores genéricos
 */
export const DIVIDER_COLORS = {
  blue: COLORS.azul.primary,      // #4B89BF
  lime: COLORS.lima.primary,       // #9AAD2E
  orange: COLORS.naranja.primary,  // #F29A2E
  terracotta: COLORS.terracota.primary, // #D94423
} as const;

export type DividerColorKey = keyof typeof DIVIDER_COLORS;

/**
 * Colores para overlays de transición
 */
export const OVERLAY_COLORS = {
  blue: COLORS.azul.primary,
  lime: COLORS.lima.primary,
  orange: COLORS.naranja.primary,
  terracotta: COLORS.terracota.primary,
} as const;

export type OverlayColorKey = keyof typeof OVERLAY_COLORS;
