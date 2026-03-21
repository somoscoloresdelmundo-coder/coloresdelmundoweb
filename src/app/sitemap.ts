import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE } from '@/config/constants';

/**
 * Generates sitemap.xml for all pages in all locales
 * Next.js automatically serves this at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.URL;

  // Define pages with their Spanish paths (canonical)
  const pages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/sobre-nosotros', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/que-hacemos', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/proyectos', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/participa', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/contacto', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/pif', priority: 0.6, changeFrequency: 'yearly' as const },
  ];

  // English path mappings
  const enPaths: Record<string, string> = {
    '/': '/',
    '/sobre-nosotros': '/about-us',
    '/que-hacemos': '/what-we-do',
    '/proyectos': '/projects',
    '/participa': '/participate',
    '/contacto': '/contact',
    '/pif': '/pif',
  };

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each page in each locale
  for (const page of pages) {
    for (const locale of routing.locales) {
      const localePath = locale === 'en' ? enPaths[page.path] : page.path;
      const url = `${baseUrl}/${locale}${localePath === '/' ? '' : localePath}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return sitemapEntries;
}
