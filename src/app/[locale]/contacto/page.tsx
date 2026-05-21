import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { HeroSection } from '@/components/sections';
import { IconContainer, EmailIcon, LocationIcon, HashIcon, FacebookIcon, InstagramIcon, DocumentIcon, ChevronRightIcon, PartnersIcon } from '@/components/ui';
import { ContactForm } from '@/components/forms';
import { PageTransition } from '@/components/providers/PageTransition';
import { WaveDivider, DIVIDER_COLORS, MagneticElement } from '@/components/immersive';
import { MotionReveal, MotionStagger } from '@/components/animations';
import { CONTACT, SOCIAL, INSTITUTIONAL } from '@/config/constants';
import { ROUTES } from '@/config/routes';

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
    <PageTransition>
      <HeroSection
        badge={{ text: t('hero.badge'), color: 'naranja' }}
        title={t('hero.title')}
        description={t('hero.description')}
        background="shapes"
        backgroundVariant="scattered"
      />

      <WaveDivider
        fromColor="#ffffff"
        toColor={DIVIDER_COLORS.orange}
        variant="gentle"
        layers={2}
        height={80}
      />

      {/* Contenido principal */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulario de Contacto */}
            <MotionReveal animation="fadeLeft">
              <h2 className="text-xl font-semibold mb-6">{t('form.title')}</h2>
              <div className="bg-gradient-to-br from-gris-50 to-naranja/5 rounded-2xl p-6 md:p-8 shadow-sm">
                <ContactForm />
              </div>
            </MotionReveal>

            {/* Información de contacto */}
            <div>
              <MotionReveal animation="fadeRight">
                <h2 className="text-xl font-semibold mb-6">{t('info.title')}</h2>
              </MotionReveal>

              <MotionStagger className="space-y-6" animation="fadeUp">
                {/* Email */}
                <div className="card hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <IconContainer color="naranja" size="lg" rounded="xl" className="flex-shrink-0">
                      <EmailIcon className="w-6 h-6 text-naranja" />
                    </IconContainer>
                    <div>
                      <h3 className="font-semibold mb-1">{t('info.email')}</h3>
                      <a href={CONTACT.EMAIL_HREF} className="text-naranja hover:text-naranja-dark font-medium underline decoration-2 underline-offset-4">
                        {CONTACT.EMAIL}
                      </a>
                      <p className="text-sm text-gris-500 mt-1">{t('info.emailResponse')}</p>
                    </div>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="card hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <IconContainer color="lima" size="lg" rounded="xl" className="flex-shrink-0">
                      <LocationIcon className="w-6 h-6 text-lima-dark" />
                    </IconContainer>
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
                <div className="card hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <IconContainer color="terracota" size="lg" rounded="xl" className="flex-shrink-0">
                      <HashIcon className="w-6 h-6 text-terracota" />
                    </IconContainer>
                    <div>
                      <h3 className="font-semibold mb-2">{t('info.followUs')}</h3>
                      <div className="flex gap-4">
                        <MagneticElement>
                          <a
                            href={SOCIAL.FACEBOOK_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-gris-100 rounded-full flex items-center justify-center text-gris-600 hover:bg-naranja hover:text-white transition-all duration-300 shadow-sm"
                            aria-label="Facebook"
                          >
                            <FacebookIcon />
                          </a>
                        </MagneticElement>
                        <MagneticElement>
                          <a
                            href={SOCIAL.INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-gris-100 rounded-full flex items-center justify-center text-gris-600 hover:bg-naranja hover:text-white transition-all duration-300 shadow-sm"
                            aria-label="Instagram"
                          >
                            <InstagramIcon />
                          </a>
                        </MagneticElement>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card destacada para Partners - PIF */}
                <div className="card bg-gradient-to-br from-lima-bg to-naranja-bg border-lima/30 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-lima rounded-xl flex items-center justify-center flex-shrink-0">
                      <PartnersIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 text-lima-dark">{t('partner.title')}</h3>
                      <p className="text-sm text-gris-600 mb-3">{t('partner.description')}</p>
                      <MagneticElement className="inline-block">
                        <Link
                          href={ROUTES.PIF}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-lima-dark hover:text-lima transition-colors"
                        >
                          <DocumentIcon className="w-4 h-4" />
                          {t('partner.link')}
                          <ChevronRightIcon className="w-4 h-4" />
                        </Link>
                      </MagneticElement>
                    </div>
                  </div>
                </div>
              </MotionStagger>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="bg-gris-100">
        <div className="container py-12">
          <MotionReveal className="bg-white rounded-2xl p-8 text-center shadow-sm" animation="scale">
            <h2 className="text-xl font-semibold mb-4">{t('map.title')}</h2>
            <p className="text-gris-600 mb-6">{t('map.description')}</p>
            <div className="flex justify-center gap-4">
              <MagneticElement>
                <a
                  href={INSTITUTIONAL.GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  {tCommon('viewOnGoogleMaps')}
                </a>
              </MagneticElement>
            </div>
          </MotionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
