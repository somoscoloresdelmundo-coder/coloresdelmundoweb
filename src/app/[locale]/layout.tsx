import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { ImmersiveProvider } from '@/components/providers/ImmersiveProvider';
import { routing } from '@/i18n/routing';
import { CONTACT, SOCIAL, SITE } from '@/config/constants';

// Generar rutas estáticas para cada locale
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Metadata dinámica según el idioma
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isSpanish = locale === 'es';

  return {
    metadataBase: new URL(SITE.URL),
    title: {
      default: isSpanish
        ? 'Colores del Mundo | Inclusión, Diversidad, Creación'
        : 'Colores del Mundo | Inclusion, Diversity, Creation',
      template: '%s | Colores del Mundo',
    },
    description: isSpanish
      ? 'Asociación Cultural Colores del Mundo - Jóvenes motivados por mejorar la calidad de vida de otros jóvenes a través del arte y la educación no formal. Programas Erasmus+ en Gandía, Valencia.'
      : 'Asociación Cultural Colores del Mundo - Young people motivated to improve the quality of life of other young people through art and non-formal education. Erasmus+ programs in Gandía, Valencia.',
    keywords: isSpanish
      ? ['ONG', 'asociación cultural', 'jóvenes', 'inclusión social', 'arte', 'educación no formal', 'Erasmus+', 'Gandía', 'Valencia', 'España', 'voluntariado', 'interculturalidad']
      : ['NGO', 'cultural association', 'youth', 'social inclusion', 'art', 'non-formal education', 'Erasmus+', 'Gandía', 'Valencia', 'Spain', 'volunteering', 'interculturality'],
    authors: [{ name: 'Colores del Mundo' }],
    creator: 'Asociación Cultural Colores del Mundo',
    publisher: 'Asociación Cultural Colores del Mundo',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: isSpanish ? 'es_ES' : 'en_US',
      url: SITE.URL,
      siteName: 'Colores del Mundo',
      title: isSpanish
        ? 'Colores del Mundo | Inclusión, Diversidad, Creación'
        : 'Colores del Mundo | Inclusion, Diversity, Creation',
      description: isSpanish
        ? 'Asociación Cultural fundada por jóvenes motivados por mejorar la calidad de vida de otros jóvenes a través del arte y la educación no formal.'
        : 'Cultural association founded by young people motivated to improve the quality of life of other young people through art and non-formal education.',
      images: [
        {
          url: '/images/logo.png',
          width: 1200,
          height: 630,
          alt: isSpanish
            ? 'Colores del Mundo - Inclusión, Diversidad, Creación'
            : 'Colores del Mundo - Inclusion, Diversity, Creation',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isSpanish
        ? 'Colores del Mundo | Inclusión, Diversidad, Creación'
        : 'Colores del Mundo | Inclusion, Diversity, Creation',
      description: isSpanish
        ? 'Asociación Cultural fundada por jóvenes motivados por mejorar la calidad de vida de otros jóvenes.'
        : 'Cultural association founded by young people motivated to improve the quality of life of other young people.',
      images: ['/images/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/images/logo.png',
      shortcut: '/images/logo.png',
      apple: '/images/logo.png',
    },
    manifest: '/manifest.json',
    alternates: {
      canonical: `${SITE.URL}/${locale}`,
      languages: {
        'es': `${SITE.URL}/es`,
        'en': `${SITE.URL}/en`,
      },
    },
  };
}

// Viewport para PWA
export const viewport: Viewport = {
  themeColor: '#F29A2E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validar que el locale sea soportado
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Habilitar renderizado estático
  setRequestLocale(locale);

  // Obtener mensajes de traducción
  const messages = await getMessages();

  // Schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Asociación Cultural Colores del Mundo',
    alternateName: 'Colores del Mundo',
    url: SITE.URL,
    logo: `${SITE.URL}/images/logo.png`,
    description: locale === 'es'
      ? 'Asociación cultural fundada por jóvenes motivados por mejorar la calidad de vida de otros jóvenes a través del arte y la educación no formal.'
      : 'Cultural association founded by young people motivated to improve the quality of life of other young people through art and non-formal education.',
    slogan: locale === 'es' ? 'Inclusión, Diversidad, Creación' : 'Inclusion, Diversity, Creation',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Paseo Rosa de los Vientos 39',
      addressLocality: 'Gandía',
      addressRegion: 'Valencia',
      postalCode: '46730',
      addressCountry: 'ES',
    },
    email: CONTACT.EMAIL,
    sameAs: [
      SOCIAL.FACEBOOK_URL,
      SOCIAL.INSTAGRAM_URL,
    ],
    areaServed: 'Europe',
    knowsLanguage: ['es', 'en'],
  };

  return (
    <NextIntlClientProvider messages={messages}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ImmersiveProvider>
        {/* Skip Link para Accesibilidad */}
        <a href="#main-content" className="skip-link">
          {locale === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}
        </a>

        <Header />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
      </ImmersiveProvider>
    </NextIntlClientProvider>
  );
}
