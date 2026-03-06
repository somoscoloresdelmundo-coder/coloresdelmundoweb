import { ReactNode } from 'react';
import { Pathnames } from '@/i18n/routing';

// Colores institucionales de Colores del Mundo
export type ColorVariant = 'azul' | 'lima' | 'naranja' | 'terracota';

// Configuración de badge
export interface BadgeConfig {
  text: string;
  color: ColorVariant;
}

// Configuración de CTA (Call to Action)
export interface CTAConfig {
  text: string;
  href: Pathnames;
  icon?: boolean;
}

// Props comunes para cards
export interface BaseCardProps {
  className?: string;
}

// Props para cards con contenido
export interface ContentCardProps extends BaseCardProps {
  title: string;
  description?: string;
}

// Props para secciones
export interface BaseSectionProps {
  className?: string;
  children?: ReactNode;
}

// Variantes de fondo para secciones
export type BackgroundVariant = 'white' | 'gray' | 'gradient' | 'shapes' | 'mondrian';

// Variantes de grid
export type GridColumns = 2 | 3 | 4;

// Props para iconos
export interface IconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Mapeo de tamaños de iconos
export const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
} as const;

/**
 * Sistema de Colores Centralizado
 *
 * Todas las clases CSS están definidas en globals.css
 * Este mapeo solo proporciona los nombres de las clases
 *
 * Escala por color:
 * - bg      : Color principal (bg-azul)
 * - bgColor : Fondo con color visible (bg-azul-bg)
 * - bgSubtle: Fondo muy sutil (bg-azul-subtle)
 * - text    : Texto con color principal
 * - textDark: Texto oscuro para contraste
 * - border  : Borde con color
 * - badge   : Clase de badge específica
 */
export const colorClasses = {
  azul: {
    bg: 'bg-azul',
    bgColor: 'bg-azul-bg',
    bgSubtle: 'bg-azul-subtle',
    text: 'text-azul',
    textDark: 'text-azul-dark',
    border: 'border-azul',
    badge: 'badge-azul',
  },
  lima: {
    bg: 'bg-lima',
    bgColor: 'bg-lima-bg',
    bgSubtle: 'bg-lima-subtle',
    text: 'text-lima',
    textDark: 'text-lima-dark',
    border: 'border-lima',
    badge: 'badge-lima',
  },
  naranja: {
    bg: 'bg-naranja',
    bgColor: 'bg-naranja-bg',
    bgSubtle: 'bg-naranja-subtle',
    text: 'text-naranja',
    textDark: 'text-naranja-dark',
    border: 'border-naranja',
    badge: 'badge-naranja',
  },
  terracota: {
    bg: 'bg-terracota',
    bgColor: 'bg-terracota-bg',
    bgSubtle: 'bg-terracota-subtle',
    text: 'text-terracota',
    textDark: 'text-terracota-dark',
    border: 'border-terracota',
    badge: 'badge-terracota',
  },
} as const;
