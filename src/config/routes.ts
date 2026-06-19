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
  LEGAL_NOTICE: '/aviso-legal' as Pathnames,
  PRIVACY: '/privacidad' as Pathnames,
  COOKIES: '/cookies' as Pathnames,
  VERIFY_DOMAIN: '/verificar-dominio' as Pathnames,
} as const;
