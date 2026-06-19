/**
 * Constantes compartidas de la aplicación
 * Centraliza valores usados en múltiples páginas
 */

import type { ColorVariant } from '@/types/ui';

export const CONTACT = {
  EMAIL: 'info@coloresdelmundo.org',
  EMAIL_HREF: 'mailto:info@coloresdelmundo.org',
} as const;

export const SOCIAL = {
  FACEBOOK_URL: 'https://www.facebook.com/profile.php?id=61584137712755',
  INSTAGRAM_URL: 'https://www.instagram.com/coloresdelmundo__',
  INSTAGRAM_HANDLE: '@coloresdelmundo__',
} as const;

/**
 * Datos institucionales de Colores del Mundo.
 * Fuente única de verdad — todos los valores verificados contra documentos
 * oficiales (Acta Fundacional 01/07/2024, Resolución Registral CV-01-066362-V,
 * CIF G75377481, OID SALTO E10413227). Cualquier cambio aquí se propaga a
 * footer, contacto, PIF, JSON-LD y páginas legales.
 */

// Partes de la dirección postal (fuente: Resolución Registral CV-01-066362-V)
const ADDRESS_PARTS = {
  street: 'Pº Rosa de los Vientos, nº 39 - Esc. 2, 3º, Pta. 5',
  postalCode: '46730',
  city: 'Gandía',
  province: 'Valencia',
  country: 'España',
  countryCode: 'ES',
} as const;

export const INSTITUTIONAL = {
  /** OID del registro SALTO/Erasmus+ Youth Pass */
  OID: 'E10413227',
  /** CIF definitivo (antiguamente NIF provisional del presentador) */
  CIF: 'G75377481',
  /** Nombre comercial usado en el branding público de la web */
  LEGAL_NAME: 'Colores del Mundo',
  /** Razón social legal completa, tal como figura en el registro */
  LEGAL_NAME_FULL: 'Asociación Cultural Colores del Mundo',
  /** Número de inscripción en el Registro de Asociaciones de la Comunitat Valenciana */
  REGISTRY_NUMBER: 'CV-01-066362-V',
  /** Año de constitución legal (Acta Fundacional, 01/07/2024) */
  FOUNDING_YEAR: 2024,

  // Dirección postal estructurada
  ADDRESS_STREET: ADDRESS_PARTS.street,
  ADDRESS_POSTAL_CODE: ADDRESS_PARTS.postalCode,
  ADDRESS_CITY: ADDRESS_PARTS.city,
  ADDRESS_PROVINCE: ADDRESS_PARTS.province,
  ADDRESS_COUNTRY: ADDRESS_PARTS.country,
  ADDRESS_COUNTRY_CODE: ADDRESS_PARTS.countryCode,

  /** Dirección completa en una línea (derivada) */
  ADDRESS: `${ADDRESS_PARTS.street}, ${ADDRESS_PARTS.postalCode} ${ADDRESS_PARTS.city}, ${ADDRESS_PARTS.province}`,
  /** URL de Google Maps centrada en el domicilio social */
  GOOGLE_MAPS_URL:
    'https://maps.google.com/?q=Paseo+Rosa+de+los+Vientos+39,+46730+Gandía',
  /** Contacto para ejercicio de derechos RGPD (LOPDGDD) */
  PRIVACY_EMAIL: 'somoscoloresdelmundo@gmail.com',
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
