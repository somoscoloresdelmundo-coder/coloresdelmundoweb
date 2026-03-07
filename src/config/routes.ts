/**
 * Rutas centralizadas de la aplicación
 * Usa estas constantes en lugar de strings hardcoded
 */

import type { Pathnames } from '@/i18n/routing';

export const ROUTES = {
  HOME: '/' as Pathnames,
  ABOUT: '/sobre-nosotros' as Pathnames,
  WHAT_WE_DO: '/que-hacemos' as Pathnames,
  PROJECTS: '/proyectos' as Pathnames,
  PARTICIPATE: '/participa' as Pathnames,
  CONTACT: '/contacto' as Pathnames,
  PIF: '/pif' as Pathnames,
} as const;
