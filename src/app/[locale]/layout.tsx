import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Inter, Poppins } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import { ImmersiveProvider } from '@/components/providers/ImmersiveProvider';
import { ToastProvider } from '@/components/ui';
import { routing } from '@/i18n/routing';
import { CONTACT, SOCIAL, SITE, INSTITUTIONAL } from '@/config/constants';

// Fuentes optimizadas con subset reducido
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
});

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
      ? 'Colores del Mundo - Jóvenes motivados por mejorar la calidad de vida de otros jóvenes a través del arte y la educación no formal. Programas Erasmus+ en Gandía, Valencia.'
      : 'Colores del Mundo - Young people motivated to improve the quality of life of other young people through art and non-formal education. Erasmus+ programs in Gandía, Valencia.',
    keywords: isSpanish
      ? ['ONG', 'asociación cultural', 'jóvenes', 'inclusión social', 'arte', 'educación no formal', 'Erasmus+', 'Gandía', 'Valencia', 'España', 'voluntariado', 'interculturalidad']
      : ['NGO', 'cultural association', 'youth', 'social inclusion', 'art', 'non-formal education', 'Erasmus+', 'Gandía', 'Valencia', 'Spain', 'volunteering', 'interculturality'],
    authors: [{ name: 'Colores del Mundo' }],
    creator: 'Colores del Mundo',
    publisher: 'Colores del Mundo',
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
          url: `${SITE.URL}/images/opengraph-image.png`,
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
      images: [`${SITE.URL}/images/opengraph-image.png`],
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
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/images/logo.png', type: 'image/png', sizes: '32x32' },
      ],
      shortcut: '/favicon.ico',
      apple: '/images/logo.png',
    },
    manifest: '/manifest.json',
    alternates: {
      canonical: locale === 'en' ? SITE.URL : `${SITE.URL}/${locale}`,
      languages: {
        'es': `${SITE.URL}/es`,
        'en': SITE.URL,
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

  // Schema.org JSON-LD — datos canónicos desde constants.ts
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: INSTITUTIONAL.LEGAL_NAME,
    alternateName: INSTITUTIONAL.LEGAL_NAME_FULL,
    url: SITE.URL,
    logo: `${SITE.URL}/images/logo.png`,
    description: locale === 'es'
      ? 'Asociación juvenil fundada en Gandía (Valencia) en 2024, dedicada a la inclusión social de jóvenes a través del arte, la educación no formal y los programas europeos Erasmus+. Inscrita en el Registro de Asociaciones de la Comunitat Valenciana (CV-01-066362-V).'
      : 'Youth association founded in Gandía (Valencia) in 2024, dedicated to the social inclusion of young people through art, non-formal education and the European Erasmus+ programmes. Registered in the Register of Associations of the Valencian Community (CV-01-066362-V).',
    slogan: locale === 'es' ? 'Inclusión, Diversidad, Creación' : 'Inclusion, Diversity, Creation',
    foundingDate: String(INSTITUTIONAL.FOUNDING_YEAR),
    taxID: INSTITUTIONAL.CIF,
    address: {
      '@type': 'PostalAddress',
      streetAddress: INSTITUTIONAL.ADDRESS_STREET,
      addressLocality: INSTITUTIONAL.ADDRESS_CITY,
      addressRegion: INSTITUTIONAL.ADDRESS_PROVINCE,
      postalCode: INSTITUTIONAL.ADDRESS_POSTAL_CODE,
      addressCountry: INSTITUTIONAL.ADDRESS_COUNTRY_CODE,
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
    <html lang={locale} className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          {/* JSON-LD Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <ToastProvider>
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
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
