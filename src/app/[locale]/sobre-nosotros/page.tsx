import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroSection, GridSection, QuoteSection, CTASection, RelatedLinks, HistoryTimeline } from '@/components/sections';
import { FeatureCard, TeamCard, ValueCard } from '@/components/cards';
import { MissionIcon, VisionIcon, UsersIcon, ArtIcon, EducationIcon } from '@/components/ui';
import { PageTransition } from '@/components/providers/PageTransition';
import { WaveDivider, GradientTransition, DIVIDER_COLORS } from '@/components/immersive';
import { ColorVariant } from '@/types/ui';
import { CONTACT, INSTITUTIONAL } from '@/config/constants';
import { ROUTES } from '@/config/routes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('about.title'),
    description: t('about.description'),
  };
}

const equipo: Array<{ nombre: string; rol: string | null; color: ColorVariant }> = [
  { nombre: 'Fernando Licona-Romano Rodriguez', rol: 'president', color: 'azul' },
  { nombre: 'Eliana Colzani', rol: null, color: 'terracota' },
  { nombre: 'Omar Franco Trillo (Munay)', rol: 'legal_representative', color: 'lima' },
  { nombre: 'Lucia Ojeda Frissia', rol: null, color: 'naranja' },
];

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
        badge={{ text: t('team.badge'), color: 'lima' }}
        title={t('team.title')}
        description={t('team.description')}
        columns={4}
        background="white"
        className="max-w-4xl mx-auto"
      >
        {equipo.map((miembro) => (
          <TeamCard
            key={miembro.nombre}
            name={miembro.nombre}
            role={miembro.rol ? t(`team.${miembro.rol}`) : undefined}
            color={miembro.color}
          />
        ))}
      </GridSection>

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
            </div>

            <div className="card">
              <dl className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.legalName')}</dt>
                  <dd className="text-negro">{t('institutional.legalNameValue')}</dd>
                </div>
                {INSTITUTIONAL.CIF && (
                  <div className="flex justify-between py-2 border-b border-gris-100">
                    <dt className="font-medium text-gris-600">{t('institutional.cif')}</dt>
                    <dd className="text-negro">{INSTITUTIONAL.CIF}</dd>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.oid')}</dt>
                  <dd className="text-negro">{INSTITUTIONAL.OID}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.type')}</dt>
                  <dd className="text-negro">{t('institutional.typeValue')}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.location')}</dt>
                  <dd className="text-negro">{t('institutional.locationValue')}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="font-medium text-gris-600">{t('institutional.email')}</dt>
                  <dd>
                    <a href={CONTACT.EMAIL_HREF} className="text-naranja">
                      {CONTACT.EMAIL}
                    </a>
                  </dd>
                </div>
              </dl>
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
