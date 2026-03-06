import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Lista de locales soportados
  locales: ['es', 'en'],

  // Locale por defecto
  defaultLocale: 'es',

  // Siempre mostrar el prefijo de locale en la URL
  localePrefix: 'always',

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
  },
});

// Tipos para las rutas
export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
