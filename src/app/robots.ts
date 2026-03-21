import { MetadataRoute } from 'next';
import { SITE } from '@/config/constants';

/**
 * Generates robots.txt for search engine crawlers
 * Next.js automatically serves this at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.URL;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
