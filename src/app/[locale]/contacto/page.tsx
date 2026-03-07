import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { EmailIcon, HeartIcon, PartnersIcon, LinkIcon, MobilityIcon, LocationIcon, HashIcon, FacebookIcon, InstagramIcon, DocumentIcon, ChevronRightIcon } from '@/components/ui';
import { CONTACT, SOCIAL, INSTITUTIONAL } from '@/config/constants';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('contact.title'),
    description: t('contact.description'),
  };
}

export default async function ContactoPage() {
  const t = await getTranslations('contact');
  const tCommon = await getTranslations('common');

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gris-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-16 w-64 h-64 bg-naranja-muted rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-8 left-8 w-56 h-56 bg-lima-muted rounded-full blur-3xl opacity-50" />
          <div className="absolute top-28 left-1/3 w-44 h-44 bg-azul-muted rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-16 right-1/4 w-48 h-48 bg-terracota-muted rounded-full blur-3xl opacity-30" />
        </div>
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <span className="badge badge-naranja mb-4">{t('hero.badge')}</span>
            <h1 className="mb-6">{t('hero.title')}</h1>
            <p className="text-lg text-gris-600">{t('hero.description')}</p>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* CTA de Email Directo */}
            <div>
              <h2 className="text-xl font-semibold mb-6">{t('form.title')}</h2>

              <div className="bg-gradient-to-br from-naranja/10 to-lima/10 rounded-2xl p-8 mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-naranja/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <EmailIcon className="w-10 h-10 text-naranja" />
                  </div>
                  <h3 className="text-2xl font-bold text-gris-800 mb-2">{CONTACT.EMAIL}</h3>
                  <p className="text-gris-600 mb-6">{t('info.emailResponse')}</p>
                  <a href={CONTACT.EMAIL_HREF} className="btn-primary inline-flex items-center gap-2">
                    <EmailIcon className="w-5 h-5" />
                    {tCommon('sendMessage')}
                  </a>
                </div>
              </div>

              {/* Opciones de contacto rápido */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={`${CONTACT.EMAIL_HREF}?subject=Quiero%20ser%20voluntario/a`}
                  className="card hover:border-azul hover:shadow-md transition-all text-center p-4"
                >
                  <div className="w-10 h-10 bg-azul/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <HeartIcon className="w-5 h-5 text-azul" />
                  </div>
                  <span className="text-sm font-medium text-gris-700">{t('form.subjectOptions.volunteer')}</span>
                </a>
                <a
                  href={`${CONTACT.EMAIL_HREF}?subject=Quiero%20participar%20en%20proyectos`}
                  className="card hover:border-lima hover:shadow-md transition-all text-center p-4"
                >
                  <div className="w-10 h-10 bg-lima/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <PartnersIcon className="w-5 h-5 text-lima-dark" />
                  </div>
                  <span className="text-sm font-medium text-gris-700">{t('form.subjectOptions.participate')}</span>
                </a>
                <a
                  href={`${CONTACT.EMAIL_HREF}?subject=Propuesta%20de%20colaboraci%C3%B3n`}
                  className="card hover:border-naranja hover:shadow-md transition-all text-center p-4"
                >
                  <div className="w-10 h-10 bg-naranja/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <LinkIcon className="w-5 h-5 text-naranja" />
                  </div>
                  <span className="text-sm font-medium text-gris-700">{t('form.subjectOptions.collaboration')}</span>
                </a>
                <a
                  href={`${CONTACT.EMAIL_HREF}?subject=B%C3%BAsqueda%20de%20partners%20Erasmus%2B`}
                  className="card hover:border-terracota hover:shadow-md transition-all text-center p-4"
                >
                  <div className="w-10 h-10 bg-terracota/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <MobilityIcon className="w-5 h-5 text-terracota" />
                  </div>
                  <span className="text-sm font-medium text-gris-700">{t('form.subjectOptions.partner')}</span>
                </a>
              </div>
            </div>

            {/* Información de contacto */}
            <div>
              <h2 className="text-xl font-semibold mb-6">{t('info.title')}</h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-naranja/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <EmailIcon className="w-6 h-6 text-naranja" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('info.email')}</h3>
                      <a href={CONTACT.EMAIL_HREF} className="text-naranja hover:text-naranja-dark">
                        {CONTACT.EMAIL}
                      </a>
                      <p className="text-sm text-gris-500 mt-1">{t('info.emailResponse')}</p>
                    </div>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-lima/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <LocationIcon className="w-6 h-6 text-lima-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('info.location')}</h3>
                      <p className="text-gris-700">
                        {t('info.address')}<br />
                        {t('info.addressLine2')}<br />
                        {t('info.addressLine3')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Redes sociales */}
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-terracota/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <HashIcon className="w-6 h-6 text-terracota" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{t('info.followUs')}</h3>
                      <div className="flex gap-4">
                        <a
                          href={SOCIAL.FACEBOOK_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gris-100 rounded-full flex items-center justify-center text-gris-600 hover:bg-naranja hover:text-white transition-colors"
                          aria-label="Facebook"
                        >
                          <FacebookIcon />
                        </a>
                        <a
                          href={SOCIAL.INSTAGRAM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gris-100 rounded-full flex items-center justify-center text-gris-600 hover:bg-naranja hover:text-white transition-colors"
                          aria-label="Instagram"
                        >
                          <InstagramIcon />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card destacada para Partners - PIF */}
                <div className="card bg-gradient-to-br from-lima-bg to-naranja-bg border-lima/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-lima rounded-xl flex items-center justify-center flex-shrink-0">
                      <PartnersIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 text-lima-dark">{t('partner.title')}</h3>
                      <p className="text-sm text-gris-600 mb-3">{t('partner.description')}</p>
                      <Link
                        href="/pif"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-lima-dark hover:text-lima transition-colors"
                      >
                        <DocumentIcon className="w-4 h-4" />
                        {t('partner.link')}
                        <ChevronRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="bg-gris-100">
        <div className="container py-12">
          <div className="bg-white rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">{t('map.title')}</h2>
            <p className="text-gris-600 mb-6">{t('map.description')}</p>
            <div className="flex justify-center gap-4">
              <a
                href={INSTITUTIONAL.GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {tCommon('viewOnGoogleMaps')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
