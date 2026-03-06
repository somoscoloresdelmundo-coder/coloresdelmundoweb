import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

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
    <>
      {/* Hero - Con los 4 colores */}
      <section className="bg-gradient-to-br from-gris-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-20 w-64 h-64 bg-terracota-muted rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-8 left-12 w-56 h-56 bg-azul-muted rounded-full blur-3xl opacity-50" />
          <div className="absolute top-24 left-1/4 w-48 h-48 bg-lima-muted rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-12 right-1/3 w-44 h-44 bg-naranja-muted rounded-full blur-3xl opacity-30" />
        </div>
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <span className="badge badge-terracota mb-4">{t('hero.badge')}</span>
            <h1 className="mb-6">{t('hero.title')}</h1>
            <p className="text-lg text-gris-600">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

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
                <p className="text-6xl md:text-7xl font-bold text-naranja mb-2">5+</p>
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
                <svg className="w-8 h-8 text-naranja" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">{t('types.youthExchanges.title')}</h3>
              <p className="text-sm text-gris-600">
                {t('types.youthExchanges.description')}
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-lima/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-lima-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">{t('types.trainingCourses.title')}</h3>
              <p className="text-sm text-gris-600">
                {t('types.trainingCourses.description')}
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-terracota/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-terracota" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">{t('types.volunteering.title')}</h3>
              <p className="text-sm text-gris-600">
                {t('types.volunteering.description')}
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-naranja/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-naranja" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">{t('types.localActivities.title')}</h3>
              <p className="text-sm text-gris-600">
                {t('types.localActivities.description')}
              </p>
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
            <Link href="/contacto" className="btn-primary">
              {tCommon('proposeCollaboration')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-white">
        <div className="container text-center">
          <h2 className="mb-6">{t('cta.title')}</h2>
          <p className="text-gris-600 mb-8 max-w-xl mx-auto">
            {t('cta.description')}
          </p>
          <Link href="/participa" className="btn-primary">
            {tCommon('seeOpportunities')}
          </Link>
        </div>
      </section>
    </>
  );
}
