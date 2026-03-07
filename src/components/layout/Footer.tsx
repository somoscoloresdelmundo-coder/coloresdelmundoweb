'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LocationIcon, EmailIcon, FacebookIcon, InstagramIcon } from '@/components/ui';
import { ColorVariant, colorClasses } from '@/types/ui';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explora: [
      { name: tNav('about'), href: '/sobre-nosotros' as const },
      { name: tNav('whatWeDo'), href: '/que-hacemos' as const },
      { name: tNav('projects'), href: '/proyectos' as const },
      { name: tNav('participate'), href: '/participa' as const },
      { name: t('partnerInfo'), href: '/pif' as const },
    ],
    lineasAccion: [
      { name: t('actionLines') === 'Líneas de Acción' ? 'Acompañamiento de Movilidad' : 'Mobility Support', href: '/que-hacemos' as const, color: 'azul' as ColorVariant },
      { name: t('actionLines') === 'Líneas de Acción' ? 'Transformación Artística' : 'Artistic Transformation', href: '/que-hacemos' as const, color: 'terracota' as ColorVariant },
      { name: t('actionLines') === 'Líneas de Acción' ? 'Educación Alternativa' : 'Alternative Education', href: '/que-hacemos' as const, color: 'lima' as ColorVariant },
      { name: t('actionLines') === 'Líneas de Acción' ? 'Ciudadanía Digital' : 'Digital Citizenship', href: '/que-hacemos' as const, color: 'naranja' as ColorVariant },
    ],
  };

  return (
    <footer className="bg-gris-50 relative overflow-hidden">
      {/* Decoración artística Mondrian en la parte superior */}
      <div className="h-2 flex">
        <div className="flex-1 bg-azul-pastel" />
        <div className="flex-1 bg-lima-pastel" />
        <div className="flex-1 bg-naranja-pastel" />
        <div className="flex-1 bg-terracota-pastel" />
      </div>

      {/* Decoración de fondo estilo Mondrian */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-azul-muted rounded-full opacity-30" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-lima-muted rounded-full opacity-30" />
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-naranja-muted rounded-2xl opacity-20" />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-terracota-muted rounded-xl opacity-20" />
      </div>

      <div className="container py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Columna 1: Logo y descripción */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/images/sellocoloredelmundo.png"
                alt="Colores del Mundo - Inclusión, Diversidad, Creación"
                width={160}
                height={80}
                className="h-20 w-auto mb-4"
              />
            </Link>
            <p className="text-gris-600 text-sm mt-4 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-gris-800 font-semibold mb-5 text-lg">{t('explore')}</h4>
            <ul className="space-y-3">
              {footerLinks.explora.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gris-600 hover:text-azul-dark transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-azul mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Líneas de Acción con colores */}
          <div>
            <h4 className="text-gris-800 font-semibold mb-5 text-lg">{t('actionLines')}</h4>
            <ul className="space-y-3">
              {footerLinks.lineasAccion.map((link) => {
                const colors = colorClasses[link.color];
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-gris-600 transition-colors inline-flex items-center group ${colors.hoverText}`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 group-hover:scale-125 ${colors.bgColor} ${colors.groupHoverBg}`} />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-gris-800 font-semibold mb-5 text-lg">{t('contactTitle')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-azul-pastel flex items-center justify-center flex-shrink-0 group-hover:bg-azul-soft transition-colors">
                  <LocationIcon className="w-5 h-5 text-azul-dark" />
                </div>
                <span className="text-gris-600 leading-relaxed">
                  {t('address')}<br />
                  {t('city')}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-naranja-pastel flex items-center justify-center flex-shrink-0 group-hover:bg-naranja-soft transition-colors">
                  <EmailIcon className="w-5 h-5 text-naranja-dark" />
                </div>
                <a
                  href="mailto:somoscoloresdelmundo@gmail.com"
                  className="text-gris-600 hover:text-naranja-dark transition-colors break-all"
                >
                  somoscoloresdelmundo@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <a
                  href="https://www.facebook.com/profile.php?id=61584137712755"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-lima-pastel flex items-center justify-center text-lima-dark hover:bg-lima-soft hover:scale-110 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://www.instagram.com/coloresdelmundo__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-terracota-pastel flex items-center justify-center text-terracota-dark hover:bg-terracota-soft hover:scale-110 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright con barra de colores */}
        <div className="mt-12 pt-8">
          <div className="h-1 flex rounded-full overflow-hidden mb-8">
            <div className="flex-1 bg-azul-soft" />
            <div className="flex-1 bg-lima-soft" />
            <div className="flex-1 bg-naranja-soft" />
            <div className="flex-1 bg-terracota-soft" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gris-500 text-sm">
              &copy; {currentYear} {t('copyright')}
            </p>
            <div className="flex items-center gap-4 text-gris-500 text-sm">
              <span className="px-3 py-1 bg-azul-pastel/50 text-azul-dark rounded-full font-medium">OID: E10413227</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
