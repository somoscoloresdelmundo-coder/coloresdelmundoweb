'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

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
      { name: t('actionLines') === 'Líneas de Acción' ? 'Acompañamiento de Movilidad' : 'Mobility Support', href: '/que-hacemos' as const, color: 'azul' },
      { name: t('actionLines') === 'Líneas de Acción' ? 'Transformación Artística' : 'Artistic Transformation', href: '/que-hacemos' as const, color: 'terracota' },
      { name: t('actionLines') === 'Líneas de Acción' ? 'Educación Alternativa' : 'Alternative Education', href: '/que-hacemos' as const, color: 'lima' },
      { name: t('actionLines') === 'Líneas de Acción' ? 'Ciudadanía Digital' : 'Digital Citizenship', href: '/que-hacemos' as const, color: 'naranja' },
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
              {footerLinks.lineasAccion.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-gris-600 transition-colors inline-flex items-center group
                      ${link.color === 'azul' ? 'hover:text-azul-dark' : ''}
                      ${link.color === 'terracota' ? 'hover:text-terracota-dark' : ''}
                      ${link.color === 'lima' ? 'hover:text-lima-dark' : ''}
                      ${link.color === 'naranja' ? 'hover:text-naranja-dark' : ''}
                    `}
                  >
                    <span className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 group-hover:scale-125
                      ${link.color === 'azul' ? 'bg-azul-soft group-hover:bg-azul' : ''}
                      ${link.color === 'terracota' ? 'bg-terracota-soft group-hover:bg-terracota' : ''}
                      ${link.color === 'lima' ? 'bg-lima-soft group-hover:bg-lima' : ''}
                      ${link.color === 'naranja' ? 'bg-naranja-soft group-hover:bg-naranja' : ''}
                    `} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-gris-800 font-semibold mb-5 text-lg">{t('contactTitle')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-azul-pastel flex items-center justify-center flex-shrink-0 group-hover:bg-azul-soft transition-colors">
                  <svg className="w-5 h-5 text-azul-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-gris-600 leading-relaxed">
                  {t('address')}<br />
                  {t('city')}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-naranja-pastel flex items-center justify-center flex-shrink-0 group-hover:bg-naranja-soft transition-colors">
                  <svg className="w-5 h-5 text-naranja-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/coloresdelmundo__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-terracota-pastel flex items-center justify-center text-terracota-dark hover:bg-terracota-soft hover:scale-110 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
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
