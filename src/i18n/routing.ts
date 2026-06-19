import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Lista de locales soportados
  locales: ['en', 'es'],

  // Locale por defecto
  defaultLocale: 'en',

  // Solo mostrar el prefijo de locale en la URL cuando sea necesario (no para el por defecto)
  localePrefix: 'as-needed',

  // Nombres de rutas traducidos
  pathnames: {
    '/': '/',
    '/sobre-nosotros': {
      es: '/sobre-nosotros',
      en: '/about-us',
    },
    '/que-hacemos': {
      es: '/que-hacemos',
      en: '/what-we-do',
    },
    '/proyectos': {
      es: '/proyectos',
      en: '/projects',
    },
    '/participa': {
      es: '/participa',
      en: '/participate',
    },
    '/contacto': {
      es: '/contacto',
      en: '/contact',
    },
    '/pif': '/pif',
    '/aviso-legal': {
      es: '/aviso-legal',
      en: '/legal-notice',
    },
    '/privacidad': {
      es: '/privacidad',
      en: '/privacy-policy',
    },
    '/cookies': {
      es: '/cookies',
      en: '/cookies-policy',
    },
    '/verificar-dominio': {
      es: '/verificar-dominio',
      en: '/verify-domain',
    },
  },
});

// Tipos para las rutas
export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
