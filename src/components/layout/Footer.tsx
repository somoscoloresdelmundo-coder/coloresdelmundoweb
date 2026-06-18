import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LocationIcon, EmailIcon, FacebookIcon, InstagramIcon } from '@/components/ui';
import { CONTACT, SOCIAL, INSTITUTIONAL } from '@/config/constants';
import { ROUTES } from '@/config/routes';

export default async function Footer() {
  const t = await getTranslations('footer');
  const tNav = await getTranslations('nav');
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explora: [
      { name: tNav('about'), href: ROUTES.ABOUT },
      { name: tNav('whatWeDo'), href: ROUTES.WHAT_WE_DO },
      { name: tNav('projects'), href: ROUTES.PROJECTS },
      { name: tNav('participate'), href: ROUTES.PARTICIPATE },
      { name: t('partnerInfo'), href: ROUTES.PIF },
    ],
    lineasAccion: [
      { name: t('actionLine.mobility'), href: ROUTES.WHAT_WE_DO },
      { name: t('actionLine.art'), href: ROUTES.WHAT_WE_DO },
      { name: t('actionLine.education'), href: ROUTES.WHAT_WE_DO },
      { name: t('actionLine.digital'), href: ROUTES.WHAT_WE_DO },
    ],
  };

  return (
    <footer className="bg-gris-900 text-gris-300 relative overflow-hidden" role="contentinfo">
      {/* Top Border */}
      <div className="h-1 bg-azul w-full" />

      <div className="container py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* Columna 1: Logo y descripción (Transparencia) */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block transition-transform hover:opacity-80 mb-6">
              <Image
                src="/images/sellocoloredelmundo.png"
                alt="Colores del Mundo"
                width={160}
                height={80}
                sizes="160px"
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gris-400 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            <div className="space-y-2 text-sm text-gris-400">
              <p className="font-semibold text-white">Transparencia Institucional</p>
              <p>Entidad Registrada: <strong className="text-white">{INSTITUTIONAL.LEGAL_NAME}</strong></p>
              <p>CIF: <strong className="text-white">{INSTITUTIONAL.CIF}</strong></p>
              <p>OID: <strong className="text-white">{INSTITUTIONAL.OID}</strong></p>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">{t('explore')}</h4>
            <ul className="space-y-3">
              {footerLinks.explora.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gris-400 hover:text-white transition-colors inline-flex items-center"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Líneas de Acción */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">{t('actionLines')}</h4>
            <ul className="space-y-3">
              {footerLinks.lineasAccion.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gris-400 hover:text-white transition-colors inline-flex items-center"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">{t('contactTitle')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <LocationIcon className="w-5 h-5 text-azul flex-shrink-0 mt-0.5" />
                <address className="text-gris-400 leading-relaxed not-italic">
                  {INSTITUTIONAL.ADDRESS}
                </address>
              </li>
              <li className="flex items-center gap-3">
                <EmailIcon className="w-5 h-5 text-azul flex-shrink-0" />
                <a
                  href={CONTACT.EMAIL_HREF}
                  className="text-gris-400 hover:text-white transition-colors break-all"
                >
                  {CONTACT.EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-4 pt-4 border-t border-gris-800">
                <a
                  href={SOCIAL.FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gris-400 hover:text-azul transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-6 h-6" />
                </a>
                <a
                  href={SOCIAL.INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gris-400 hover:text-terracota transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gris-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gris-500 text-sm text-center md:text-left">
              &copy; {currentYear} {INSTITUTIONAL.LEGAL_NAME}. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 text-sm text-gris-500">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
