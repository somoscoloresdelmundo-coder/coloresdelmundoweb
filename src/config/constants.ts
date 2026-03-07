/**
 * Constantes compartidas de la aplicación
 * Centraliza valores usados en múltiples páginas
 */

import type { ColorVariant } from '@/types/ui';

export const CONTACT = {
  EMAIL: 'somoscoloresdelmundo@gmail.com',
  EMAIL_HREF: 'mailto:somoscoloresdelmundo@gmail.com',
} as const;

export const SOCIAL = {
  FACEBOOK_URL: 'https://www.facebook.com/profile.php?id=61584137712755',
  INSTAGRAM_URL: 'https://www.instagram.com/coloresdelmundo__',
  INSTAGRAM_HANDLE: '@coloresdelmundo__',
} as const;

export const INSTITUTIONAL = {
  OID: 'E10413227',
  LEGAL_NAME: 'Colores del Mundo',
  GOOGLE_MAPS_URL: 'https://maps.google.com/?q=Paseo+Rosa+de+los+Vientos+39,+46730+Gandia',
  YEARS_EXPERIENCE: 5,
} as const;

export const SITE = {
  URL: 'https://coloresdelmundo.org',
} as const;

/** The four institutional colors in standard cycle order */
export const COLOR_CYCLE: ColorVariant[] = ['azul', 'lima', 'naranja', 'terracota'];

/** Lines of action with their associated colors */
export const LINES_OF_ACTION: Array<{ key: string; color: ColorVariant }> = [
  { key: 'mobility', color: 'azul' },
  { key: 'art', color: 'terracota' },
  { key: 'education', color: 'lima' },
  { key: 'digital', color: 'naranja' },
];
