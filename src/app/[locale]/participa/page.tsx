import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections';
import { HeartIcon, YouthWorkersIcon, LinkIcon, CheckIcon, DocumentIcon, PartnersIcon } from '@/components/ui';
import { PageTransition } from '@/components/providers/PageTransition';
import { WaveDivider, GradientTransition, DIVIDER_COLORS } from '@/components/immersive';
import { ColorVariant, colorClasses } from '@/types/ui';
import { ROUTES } from '@/config/routes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('participate.title'),
    description: t('participate.description'),
  };
}

export default async function ParticipaPage() {
  const t = await getTranslations('participate');
  const tCommon = await getTranslations('common');

  const formasParticipar: Array<{
    key: string;
    titulo: string;
    descripcion: string;
    beneficios: string[];
    color: ColorVariant;
    icono: React.ReactNode;
  }> = [
    {
      key: 'volunteer',
      titulo: t('ways.volunteer.title'),
      descripcion: t('ways.volunteer.description'),
      beneficios: [
        t('ways.volunteer.benefits.0'),
        t('ways.volunteer.benefits.1'),
        t('ways.volunteer.benefits.2'),
        t('ways.volunteer.benefits.3'),
      ],
      color: 'azul',
      icono: <HeartIcon className="w-12 h-12" />,
    },
    {
      key: 'participant',
      titulo: t('ways.participant.title'),
      descripcion: t('ways.participant.description'),
      beneficios: [
        t('ways.participant.benefits.0'),
        t('ways.participant.benefits.1'),
        t('ways.participant.benefits.2'),
        t('ways.participant.benefits.3'),
      ],
      color: 'lima',
      icono: <YouthWorkersIcon className="w-12 h-12" />,
    },
    {
      key: 'partner',
      titulo: t('ways.partner.title'),
      descripcion: t('ways.partner.description'),
      beneficios: [
        t('ways.partner.benefits.0'),
        t('ways.partner.benefits.1'),
        t('ways.partner.benefits.2'),
        t('ways.partner.benefits.3'),
      ],
      color: 'naranja',
      icono: <LinkIcon className="w-12 h-12" />,
    },
  ];

  const perfilIdeal = [
    {
      key: 'art',
      titulo: t('targetProfile.profiles.art.title'),
      descripcion: t('targetProfile.profiles.art.description'),
    },
    {
      key: 'development',
      titulo: t('targetProfile.profiles.development.title'),
      descripcion: t('targetProfile.profiles.development.description'),
    },
    {
      key: 'environment',
      titulo: t('targetProfile.profiles.environment.title'),
      descripcion: t('targetProfile.profiles.environment.description'),
    },
    {
      key: 'erasmus',
      titulo: t('targetProfile.profiles.erasmus.title'),
      descripcion: t('targetProfile.profiles.erasmus.description'),
    },
  ];

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

      {/* Formas de participar */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {formasParticipar.map((forma) => {
              const colors = colorClasses[forma.color];
              return (
                <div key={forma.key} className="card">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${colors.bgAlpha10} ${colors.textDark}`}>
                    {forma.icono}
                  </div>
                  <h2 className="text-xl font-semibold mb-3">{forma.titulo}</h2>
                  <p className="text-gris-600 mb-6">{forma.descripcion}</p>
                  <ul className="space-y-2 mb-6">
                    {forma.beneficios.map((beneficio, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckIcon className={`w-5 h-5 flex-shrink-0 ${colors.text}`} />
                        <span className="text-gris-700">{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={forma.key === 'partner' ? ROUTES.PIF : ROUTES.CONTACT}
                    className={`btn-outline w-full flex items-center justify-center gap-2 ${colors.border} ${colors.textDark} ${colors.hoverBg}`}
                  >
                    {forma.key === 'partner' && <DocumentIcon className="w-4 h-4" />}
                    {forma.key === 'partner' ? t('ways.partner.pifButton') : tCommon('interested')}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Perfil ideal */}
      <section className="section bg-gris-50">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-lima mb-4">{t('targetProfile.badge')}</span>
            <h2 className="mb-4">{t('targetProfile.title')}</h2>
            <p className="text-gris-600 max-w-2xl mx-auto">{t('targetProfile.description')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perfilIdeal.map((perfil, index) => (
              <div key={perfil.key} className="card text-center">
                <span className="text-4xl font-bold text-naranja/20 mb-2">
                  0{index + 1}
                </span>
                <h3 className="font-semibold mb-2">{perfil.titulo}</h3>
                <p className="text-sm text-gris-600">{perfil.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Erasmus+ oportunidades */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-2/5 h-2/3 bg-azul-muted opacity-50" />
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-lima-muted opacity-40" />
          <div className="absolute bottom-0 left-1/4 w-1/3 h-1/2 bg-naranja-muted opacity-50" />
          <div className="absolute bottom-0 right-0 w-1/4 h-2/5 bg-terracota-muted opacity-40" />
        </div>
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-8">
              <span className="badge badge-azul mb-4">{t('erasmus.badge')}</span>
              <h2 className="mb-6">{t('erasmus.title')}</h2>
              <p className="text-gris-600 mb-6">{t('erasmus.description')}</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-azul-bg rounded-full flex items-center justify-center">
                    <CheckIcon className="w-5 h-5 text-azul-dark" />
                  </div>
                  <span className="text-gris-700">{t('erasmus.fundedTravel')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-lima-bg rounded-full flex items-center justify-center">
                    <CheckIcon className="w-5 h-5 text-lima-dark" />
                  </div>
                  <span className="text-gris-700">{t('erasmus.accommodationIncluded')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-terracota-bg rounded-full flex items-center justify-center">
                    <CheckIcon className="w-5 h-5 text-terracota-dark" />
                  </div>
                  <span className="text-gris-700">{t('erasmus.youthpassCertificate')}</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-8 inline-block">
                <p className="text-6xl md:text-7xl font-bold text-gradient-4colors mb-2">{t('erasmus.percentage')}</p>
                <p className="text-gris-600">
                  {t('erasmus.percentageDescription')}<br />
                  {t('erasmus.inErasmusProjects')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección destacada para Partners - PIF */}
      <section className="section bg-gradient-to-br from-lima-bg via-white to-naranja-bg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-lima-subtle rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-naranja-subtle rounded-tr-full" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-lima/20">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 bg-lima-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                  <PartnersIcon className="w-12 h-12 text-lima-dark" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="badge badge-lima mb-3">{t('partnerCTA.badge')}</span>
                  <h2 className="mb-4">{t('partnerCTA.title')}</h2>
                  <p className="text-gris-600 mb-6 text-lg">{t('partnerCTA.description')}</p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Link
                      href={ROUTES.PIF}
                      className="btn-primary bg-lima hover:bg-lima-dark flex items-center gap-2"
                    >
                      <DocumentIcon className="w-5 h-5" />
                      {t('partnerCTA.button')}
                    </Link>
                    <Link href={ROUTES.CONTACT} className="btn-secondary">
                      {tCommon('contactUs')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GradientTransition
        fromColor="#f9fafb"
        toColor="#ffffff"
        variant="smooth"
        height={60}
      />

      {/* CTA */}
      <section className="section bg-white">
        <div className="container text-center">
          <h2 className="mb-6">{t('cta.title')}</h2>
          <p className="text-gris-600 mb-8 max-w-xl mx-auto">{t('cta.description')}</p>
          <Link href={ROUTES.CONTACT} className="btn-primary">
            {tCommon('contactNow')}
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
