import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections';
import { UsersIcon, EducationIcon, HeartIcon, HomeIcon } from '@/components/ui';
import { PageTransition } from '@/components/providers/PageTransition';
import { WaveDivider, GradientTransition, DIVIDER_COLORS } from '@/components/immersive';
import { INSTITUTIONAL } from '@/config/constants';
import { ROUTES } from '@/config/routes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('projects.title'),
    description: t('projects.description'),
  };
}

export default async function ProyectosPage() {
  const t = await getTranslations('projects');
  const tCommon = await getTranslations('common');

  const proximosProyectos = [
    {
      key: 'youthExchange',
      titulo: t('upcoming.projects.youthExchange.title'),
      tipo: t('upcoming.projects.youthExchange.type'),
      descripcion: t('upcoming.projects.youthExchange.description'),
      estado: t('upcoming.projects.youthExchange.status'),
    },
    {
      key: 'workshop',
      titulo: t('upcoming.projects.workshop.title'),
      tipo: t('upcoming.projects.workshop.type'),
      descripcion: t('upcoming.projects.workshop.description'),
      estado: t('upcoming.projects.workshop.status'),
    },
    {
      key: 'digitalTraining',
      titulo: t('upcoming.projects.digitalTraining.title'),
      tipo: t('upcoming.projects.digitalTraining.type'),
      descripcion: t('upcoming.projects.digitalTraining.description'),
      estado: t('upcoming.projects.digitalTraining.status'),
    },
  ];

  return (
    <PageTransition>
      <HeroSection
        badge={{ text: t('hero.badge'), color: 'terracota' }}
        title={t('hero.title')}
        description={t('hero.description')}
        background="shapes"
        backgroundVariant="scattered"
      />

      <WaveDivider
        fromColor="#ffffff"
        toColor={DIVIDER_COLORS.terracotta}
        variant="gentle"
        layers={2}
        height={80}
      />

      {/* Estado actual */}
      <section className="section bg-white">
        <div className="container">
          <div className="bg-gradient-to-r from-naranja/10 to-lima/10 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="badge badge-naranja mb-4">{t('current.badge')}</span>
                <h2 className="mb-4">{t('current.title')}</h2>
                <p className="text-gris-600 mb-6">
                  {t('current.description')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gris-700">
                    {t('current.lookingForPartners')}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gris-700">
                    {t('current.developingProposals')}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gris-700">
                    {t('current.buildingNetwork')}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-6xl md:text-7xl font-bold text-naranja mb-2">{INSTITUTIONAL.YEARS_EXPERIENCE}+</p>
                <p className="text-gris-600">
                  {t('current.yearsExperience')}<br />
                  {t('current.inEuropeanProjects')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos proyectos */}
      <section className="section bg-gris-50">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-lima mb-4">{t('upcoming.badge')}</span>
            <h2 className="mb-4">{t('upcoming.title')}</h2>
            <p className="text-gris-600 max-w-2xl mx-auto">
              {t('upcoming.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {proximosProyectos.map((proyecto) => (
              <div key={proyecto.key} className="card">
                <div className="flex items-center justify-between mb-4">
                  <span className="badge badge-naranja">{proyecto.tipo}</span>
                  <span className="text-xs text-gris-500 bg-gris-100 px-2 py-1 rounded">
                    {proyecto.estado}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{proyecto.titulo}</h3>
                <p className="text-sm text-gris-600">{proyecto.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de proyectos */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-terracota mb-4">{t('types.badge')}</span>
            <h2 className="mb-4">{t('types.title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="w-16 h-16 bg-naranja/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-8 h-8 text-naranja" />
              </div>
              <h3 className="font-semibold mb-2">{t('types.youthExchanges.title')}</h3>
              <p className="text-sm text-gris-600">{t('types.youthExchanges.description')}</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-lima/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <EducationIcon className="w-8 h-8 text-lima-dark" />
              </div>
              <h3 className="font-semibold mb-2">{t('types.trainingCourses.title')}</h3>
              <p className="text-sm text-gris-600">{t('types.trainingCourses.description')}</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-terracota/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-8 h-8 text-terracota" />
              </div>
              <h3 className="font-semibold mb-2">{t('types.volunteering.title')}</h3>
              <p className="text-sm text-gris-600">{t('types.volunteering.description')}</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-naranja/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="w-8 h-8 text-naranja" />
              </div>
              <h3 className="font-semibold mb-2">{t('types.localActivities.title')}</h3>
              <p className="text-sm text-gris-600">{t('types.localActivities.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA para partners - Estilo artístico */}
      <section className="section relative overflow-hidden">
        {/* Fondo Mondrian */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-azul-muted opacity-40" />
          <div className="absolute top-0 right-0 w-1/4 h-2/3 bg-lima-muted opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-1/3 h-1/2 bg-naranja-muted opacity-40" />
          <div className="absolute bottom-0 left-1/3 w-1/4 h-1/3 bg-terracota-muted opacity-30" />
        </div>
        <div className="container text-center relative z-10">
          <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
            <div className="divider-4colors w-20 mx-auto mb-6" />
            <h2 className="mb-6">{t('partnerCta.title')}</h2>
            <p className="text-gris-600 mb-8 max-w-xl mx-auto">
              {t('partnerCta.description')}
            </p>
            <Link href={ROUTES.CONTACT} className="btn-primary">
              {tCommon('proposeCollaboration')}
            </Link>
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
          <p className="text-gris-600 mb-8 max-w-xl mx-auto">
            {t('cta.description')}
          </p>
          <Link href={ROUTES.PARTICIPATE} className="btn-primary">
            {tCommon('seeOpportunities')}
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
