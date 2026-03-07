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

// Variantes de fondo para secciones
export type BackgroundVariant = 'white' | 'gray' | 'gradient' | 'shapes' | 'mondrian';

// Variantes de grid
export type GridColumns = 2 | 3 | 4;

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
    bgAlpha10: 'bg-azul/10',
    bgAlpha20: 'bg-azul/20',
    bgMuted: 'bg-azul-muted',
    bgMuted20: 'bg-azul-muted/20',
    bgMuted30: 'bg-azul-muted/30',
    bgMuted40: 'bg-azul-muted/40',
    text: 'text-azul',
    textDark: 'text-azul-dark',
    border: 'border-azul',
    borderMuted: 'border-azul-muted',
    badge: 'badge-azul',
    hoverText: 'hover:text-azul-dark',
    hoverBg: 'hover:bg-azul',
    hoverBorder: 'hover:border-azul',
    hoverShadow: 'hover:shadow-azul/25',
    groupHoverBg: 'group-hover:bg-azul',
  },
  lima: {
    bg: 'bg-lima',
    bgColor: 'bg-lima-bg',
    bgSubtle: 'bg-lima-subtle',
    bgAlpha10: 'bg-lima/10',
    bgAlpha20: 'bg-lima/20',
    bgMuted: 'bg-lima-muted',
    bgMuted20: 'bg-lima-muted/20',
    bgMuted30: 'bg-lima-muted/30',
    bgMuted40: 'bg-lima-muted/40',
    text: 'text-lima',
    textDark: 'text-lima-dark',
    border: 'border-lima',
    borderMuted: 'border-lima-muted',
    badge: 'badge-lima',
    hoverText: 'hover:text-lima-dark',
    hoverBg: 'hover:bg-lima',
    hoverBorder: 'hover:border-lima',
    hoverShadow: 'hover:shadow-lima/25',
    groupHoverBg: 'group-hover:bg-lima',
  },
  naranja: {
    bg: 'bg-naranja',
    bgColor: 'bg-naranja-bg',
    bgSubtle: 'bg-naranja-subtle',
    bgAlpha10: 'bg-naranja/10',
    bgAlpha20: 'bg-naranja/20',
    bgMuted: 'bg-naranja-muted',
    bgMuted20: 'bg-naranja-muted/20',
    bgMuted30: 'bg-naranja-muted/30',
    bgMuted40: 'bg-naranja-muted/40',
    text: 'text-naranja',
    textDark: 'text-naranja-dark',
    border: 'border-naranja',
    borderMuted: 'border-naranja-muted',
    badge: 'badge-naranja',
    hoverText: 'hover:text-naranja-dark',
    hoverBg: 'hover:bg-naranja',
    hoverBorder: 'hover:border-naranja',
    hoverShadow: 'hover:shadow-naranja/25',
    groupHoverBg: 'group-hover:bg-naranja',
  },
  terracota: {
    bg: 'bg-terracota',
    bgColor: 'bg-terracota-bg',
    bgSubtle: 'bg-terracota-subtle',
    bgAlpha10: 'bg-terracota/10',
    bgAlpha20: 'bg-terracota/20',
    bgMuted: 'bg-terracota-muted',
    bgMuted20: 'bg-terracota-muted/20',
    bgMuted30: 'bg-terracota-muted/30',
    bgMuted40: 'bg-terracota-muted/40',
    text: 'text-terracota',
    textDark: 'text-terracota-dark',
    border: 'border-terracota',
    borderMuted: 'border-terracota-muted',
    badge: 'badge-terracota',
    hoverText: 'hover:text-terracota-dark',
    hoverBg: 'hover:bg-terracota',
    hoverBorder: 'hover:border-terracota',
    hoverShadow: 'hover:shadow-terracota/25',
    groupHoverBg: 'group-hover:bg-terracota',
  },
} as const;
