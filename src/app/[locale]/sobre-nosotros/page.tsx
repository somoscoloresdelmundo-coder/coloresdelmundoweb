import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { HeroSection, GridSection, QuoteSection, CTASection, RelatedLinks, HistoryTimeline } from '@/components/sections';
import { FeatureCard, ValueCard } from '@/components/cards';
import { MissionIcon, VisionIcon, UsersIcon, ArtIcon, EducationIcon } from '@/components/ui';
import { PageTransition } from '@/components/providers/PageTransition';
import { WaveDivider, GradientTransition, DIVIDER_COLORS } from '@/components/immersive';
import { CONTACT, INSTITUTIONAL } from '@/config/constants';
import { ROUTES } from '@/config/routes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('about.title'),
    description: t('about.description'),
  };
}

export default async function SobreNosotrosPage() {
  const t = await getTranslations('about');
  const tCommon = await getTranslations('common');

  const habilidades = [
    { key: 'international', titulo: t('skills.international.title'), descripcion: t('skills.international.description') },
    { key: 'facilitation', titulo: t('skills.facilitation.title'), descripcion: t('skills.facilitation.description') },
    { key: 'creative', titulo: t('skills.creative.title'), descripcion: t('skills.creative.description') },
    { key: 'digital', titulo: t('skills.digital.title'), descripcion: t('skills.digital.description') },
  ];

  const timelineItems = [
    {
      year: '2024',
      title: t('history.milestones.2024.title'),
      description: t('history.milestones.2024.description'),
      color: 'azul' as const,
      icon: <UsersIcon className="w-5 h-5" />,
    },
    {
      year: '2025',
      title: t('history.milestones.2025.title'),
      description: t('history.milestones.2025.description'),
      color: 'terracota' as const,
      icon: <ArtIcon className="w-5 h-5" />,
    },
    {
      year: '2026',
      title: t('history.milestones.2026.title'),
      description: t('history.milestones.2026.description'),
      color: 'lima' as const,
      icon: <EducationIcon className="w-5 h-5" />,
    },
  ];

  return (
    <PageTransition>
      <HeroSection
        badge={{ text: t('hero.badge'), color: 'naranja' }}
        title={t('hero.title')}
        description={t('hero.description')}
        background="shapes"
        backgroundVariant="corners"
      />

      <WaveDivider
        fromColor="#ffffff"
        toColor={DIVIDER_COLORS.orange}
        variant="gentle"
        layers={2}
        height={80}
      />

      <GridSection columns={2} background="white" gap="lg">
        <FeatureCard
          icon={<MissionIcon />}
          title={t('mission.title')}
          description={t('mission.description')}
          color="naranja"
          variant="bordered"
        />
        <FeatureCard
          icon={<VisionIcon />}
          title={t('vision.title')}
          description={t('vision.description')}
          color="lima"
          variant="bordered"
        />
      </GridSection>

      <QuoteSection quote={t('quote')} />

      <GradientTransition
        colors={['#ffffff', DIVIDER_COLORS.lime, '#f9fafb']}
        variant="smooth"
        height={100}
      />

      <HistoryTimeline
        badge={t('history.badge')}
        title={t('history.title')}
        items={timelineItems}
      />

      <GridSection
        badge={{ text: t('skills.badge'), color: 'naranja' }}
        title={t('skills.title')}
        columns={4}
        background="gray"
      >
        {habilidades.map((hab, index) => (
          <ValueCard
            key={hab.key}
            number={`0${index + 1}`}
            title={hab.titulo}
            description={hab.descripcion}
            color="naranja"
          />
        ))}
      </GridSection>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="badge badge-lima mb-4">{t('institutional.badge')}</span>
              <h2>{t('institutional.title')}</h2>
              <p className="text-gris-600 mt-3 max-w-xl mx-auto">{t('institutional.subtitle')}</p>
            </div>

            <div className="card">
              <dl className="space-y-4">
                <div className="flex justify-between gap-4 py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.legalName')}</dt>
                  <dd className="text-negro text-right">{INSTITUTIONAL.LEGAL_NAME_FULL}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.cif')}</dt>
                  <dd className="text-negro">{INSTITUTIONAL.CIF}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.registryNumber')}</dt>
                  <dd className="text-negro">{INSTITUTIONAL.REGISTRY_NUMBER}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.oid')}</dt>
                  <dd className="text-negro">{INSTITUTIONAL.OID}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.type')}</dt>
                  <dd className="text-negro text-right">{t('institutional.typeValue')}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.foundingYear')}</dt>
                  <dd className="text-negro">{INSTITUTIONAL.FOUNDING_YEAR}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.location')}</dt>
                  <dd className="text-negro text-right">{INSTITUTIONAL.ADDRESS}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2">
                  <dt className="font-medium text-gris-600">{t('institutional.email')}</dt>
                  <dd>
                    <a href={CONTACT.EMAIL_HREF} className="text-naranja break-all">
                      {CONTACT.EMAIL}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Enlace a página de verificación de dominio */}
            <div className="mt-6 text-center">
              <Link
                href={ROUTES.VERIFY_DOMAIN}
                className="inline-flex items-center gap-2 text-sm font-semibold text-lima-dark hover:text-lima transition-colors"
              >
                {t('institutional.verifyLink')}
                <span aria-hidden="true">→</span>
              </Link>
              <p className="text-xs text-gris-500 mt-1">{t('institutional.verifyDescription')}</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={t('cta.title')}
        description={t('cta.description')}
        primaryButton={{ text: tCommon('contactUs'), href: ROUTES.CONTACT, icon: false }}
        background="gray"
      />

      <RelatedLinks
        title={tCommon('youMightAlsoLike')}
        links={[
          { href: ROUTES.WHAT_WE_DO, title: tCommon('whatWeDo'), description: tCommon('discoverOurPrograms') },
          { href: ROUTES.PROJECTS, title: tCommon('projects'), description: tCommon('seeOurExperience') },
          { href: ROUTES.PARTICIPATE, title: tCommon('participate'), description: tCommon('joinOurTeam') },
        ]}
      />
    </PageTransition>
  );
}
