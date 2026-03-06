import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import DownloadPIFButton from '@/components/ui/DownloadPIFButton';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('pif.title'),
    description: t('pif.description'),
  };
}

export default async function PIFPage() {
  const t = await getTranslations('pif');
  const tCommon = await getTranslations('common');

  const linesOfAction = [
    { key: 'mobility', color: 'azul' },
    { key: 'art', color: 'terracota' },
    { key: 'education', color: 'lima' },
    { key: 'digital', color: 'naranja' },
  ];

  // Iconos SVG para las líneas de acción
  const LineIcons: Record<string, React.ReactNode> = {
    mobility: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    art: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    ),
    education: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    digital: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  };

  return (
    <>
      {/* Hero with OID prominently displayed */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gris-50 via-white to-azul-muted/20">
        {/* Fondo artístico */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-azul-muted/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-lima-muted/40 rounded-full blur-3xl translate-x-1/2" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-naranja-muted/30 rounded-full blur-3xl translate-y-1/2" />
        </div>

        <div className="container py-12 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Contenido izquierdo */}
            <div className="scroll-reveal">
              <span className="badge badge-azul mb-4">{t('hero.badge')}</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-gris-600 mb-6 max-w-lg">
                {t('hero.description')}
              </p>
              <div className="flex flex-wrap gap-3">
                <DownloadPIFButton />
                <Link href="/contacto" className="btn-secondary">
                  {tCommon('contact')}
                </Link>
              </div>
            </div>

            {/* Card OID destacada */}
            <div className="scroll-reveal" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 relative overflow-hidden">
                {/* Decoración */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-naranja/20 to-transparent rounded-bl-full" />

                {/* OID Grande */}
                <div className="text-center mb-6 pb-6 border-b border-gris-100">
                  <p className="text-sm text-gris-400 uppercase tracking-wider mb-2">{t('quickInfo.oid')}</p>
                  <p className="text-5xl md:text-6xl font-black text-naranja tracking-wide">E10413227</p>
                  <div className="flex justify-center gap-2 mt-4">
                    <span className="w-3 h-3 rounded-full bg-azul" />
                    <span className="w-3 h-3 rounded-full bg-lima" />
                    <span className="w-3 h-3 rounded-full bg-naranja" />
                    <span className="w-3 h-3 rounded-full bg-terracota" />
                  </div>
                </div>

                {/* Info rápida en grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gris-50 rounded-xl p-4">
                    <p className="text-xs text-gris-400 uppercase tracking-wider">{t('quickInfo.type')}</p>
                    <p className="font-semibold text-gris-800">{t('quickInfo.typeValue')}</p>
                  </div>
                  <div className="bg-gris-50 rounded-xl p-4">
                    <p className="text-xs text-gris-400 uppercase tracking-wider">{t('quickInfo.year')}</p>
                    <p className="font-semibold text-gris-800">{t('quickInfo.yearValue')}</p>
                  </div>
                  <div className="col-span-2 bg-azul-muted/30 rounded-xl p-4">
                    <p className="text-xs text-gris-400 uppercase tracking-wider">{t('quickInfo.location')}</p>
                    <p className="font-semibold text-gris-800">{t('quickInfo.locationValue')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Profile & Mission/Vision */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Organization Profile */}
            <div className="mb-16 scroll-reveal">
              <span className="badge badge-lima mb-4">{t('organization.badge')}</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('organization.title')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <p className="text-gris-600 leading-relaxed">{t('organization.description')}</p>
                <p className="text-gris-600 leading-relaxed">{t('organization.fullDescription')}</p>
              </div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div className="bg-azul-muted/30 rounded-2xl p-8 scroll-reveal">
                <div className="w-12 h-12 bg-azul/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-azul" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('missionVision.mission.title')}</h3>
                <p className="text-gris-600">{t('missionVision.mission.description')}</p>
              </div>
              <div className="bg-lima-muted/30 rounded-2xl p-8 scroll-reveal" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 bg-lima/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-lima-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('missionVision.vision.title')}</h3>
                <p className="text-gris-600">{t('missionVision.vision.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lines of Action - Full Detail */}
      <section className="section bg-gris-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-reveal">
              <span className="badge badge-naranja mb-4">{t('linesOfAction.badge')}</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('linesOfAction.title')}</h2>
              <p className="text-gris-600 max-w-2xl mx-auto">{t('linesOfAction.description')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {linesOfAction.map((line, index) => (
                <div
                  key={line.key}
                  className={`bg-white rounded-2xl p-6 border-l-4 border-${line.color} shadow-sm hover:shadow-md transition-shadow scroll-reveal`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-${line.color}-muted/40 text-${line.color}-dark`}>
                      {LineIcons[line.key]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{t(`linesOfAction.${line.key}.title`)}</h3>
                      <p className="text-sm text-gris-600 mb-4">{t(`linesOfAction.${line.key}.description`)}</p>
                      <div className="flex flex-wrap gap-2">
                        {(t.raw(`linesOfAction.${line.key}.activities`) as string[]).map((activity: string, i: number) => (
                          <span
                            key={i}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-${line.color}-muted/40 text-gris-700`}
                          >
                            <svg className={`w-3 h-3 text-${line.color}`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Project Types */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8 items-start">
              {/* Experience */}
              <div className="lg:col-span-3 scroll-reveal">
                <span className="badge badge-terracota mb-4">{t('experience.badge')}</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('experience.title')}</h2>
                <p className="text-gris-600 mb-8">{t('experience.description')}</p>

                {/* Project Types */}
                <h3 className="font-semibold text-gris-800 mb-4">{t('experience.projectTypes.title')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-azul-muted/20 rounded-xl">
                    <div className="w-10 h-10 bg-azul/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-azul" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">{t('experience.projectTypes.youthExchanges')}</p>
                      <p className="text-sm text-gris-500">{t('experience.projectTypes.youthExchangesDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-lima-muted/20 rounded-xl">
                    <div className="w-10 h-10 bg-lima/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-lima-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">{t('experience.projectTypes.trainingCourses')}</p>
                      <p className="text-sm text-gris-500">{t('experience.projectTypes.trainingCoursesDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-naranja-muted/20 rounded-xl">
                    <div className="w-10 h-10 bg-naranja/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-naranja" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">{t('experience.projectTypes.volunteering')}</p>
                      <p className="text-sm text-gris-500">{t('experience.projectTypes.volunteeringDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roles & Stats */}
              <div className="lg:col-span-2 scroll-reveal" style={{ animationDelay: '0.1s' }}>
                <div className="bg-gradient-to-br from-terracota-muted/40 to-naranja-muted/30 rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold text-gris-800 mb-4">{t('experience.roles.title')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {(t.raw('experience.roles.items') as string[]).map((role: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-white/60 rounded-full text-sm font-medium">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Big stat */}
                <div className="text-center p-8 bg-gris-50 rounded-2xl">
                  <p className="text-6xl font-black text-naranja mb-2">5+</p>
                  <p className="text-gris-600 font-medium">años de experiencia colectiva</p>
                  <p className="text-sm text-gris-500">en proyectos Erasmus+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="section bg-gris-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 scroll-reveal">
              <span className="badge badge-azul mb-4">{t('targetGroups.badge')}</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('targetGroups.title')}</h2>
              <p className="text-gris-600 max-w-2xl mx-auto">{t('targetGroups.description')}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { key: 'youngPeople', color: 'azul', icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                )},
                { key: 'youthWorkers', color: 'lima', icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                )},
                { key: 'educators', color: 'naranja', icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                )},
                { key: 'migrants', color: 'terracota', icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                )},
                { key: 'disadvantaged', color: 'azul', icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                )},
              ].map((group, index) => (
                <div
                  key={group.key}
                  className={`bg-white rounded-xl p-5 border border-${group.color}-muted hover:border-${group.color} transition-colors scroll-reveal`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-${group.color}-muted/40 text-${group.color}-dark`}>
                    {group.icon}
                  </div>
                  <h3 className="font-semibold mb-1">{t(`targetGroups.${group.key}`)}</h3>
                  <p className="text-sm text-gris-500">{t(`targetGroups.${group.key}Desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EU Priorities */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <span className="badge badge-azul mb-4">{t('euPriorities.badge')}</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('euPriorities.title')}</h2>
            <p className="text-gris-600 mb-8">{t('euPriorities.description')}</p>

            <div className="flex flex-wrap justify-center gap-3">
              {(t.raw('euPriorities.items') as string[]).map((priority: string, index: number) => {
                const colors = ['azul', 'lima', 'naranja', 'terracota'];
                const color = colors[index % colors.length];
                return (
                  <span
                    key={index}
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-${color}-muted/40 text-gris-800 rounded-full font-medium`}
                  >
                    <svg className={`w-4 h-4 text-${color}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {priority}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Opportunities */}
      <section className="section bg-gris-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 scroll-reveal">
              <span className="badge badge-terracota mb-4">{t('collaboration.badge')}</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('collaboration.title')}</h2>
              <p className="text-gris-600 max-w-2xl mx-auto">{t('collaboration.description')}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(t.raw('collaboration.items') as Array<{ name: string; desc: string }>).map((item, index: number) => {
                const colors = ['azul', 'lima', 'naranja', 'terracota'];
                const color = colors[index % colors.length];
                return (
                  <div
                    key={index}
                    className={`bg-white rounded-xl p-5 border-b-4 border-${color} hover:shadow-lg transition-shadow scroll-reveal`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="font-bold mb-2">{item.name}</h3>
                    <p className="text-sm text-gris-500">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-gris-600 mt-8 font-medium scroll-reveal">
              {t('collaboration.cta')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Full Details */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="scroll-reveal">
                <span className="badge badge-lima mb-4">{t('contact.badge')}</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('contact.title')}</h2>
                <p className="text-gris-600 mb-6">{t('contact.description')}</p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gris-50 rounded-xl">
                    <div className="w-10 h-10 bg-lima/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-lima-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gris-400 uppercase tracking-wider">{t('contact.contactPerson')}</p>
                      <p className="font-semibold">{t('contact.contactPersonValue')}</p>
                      <p className="text-sm text-gris-500">{t('contact.contactPersonRole')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gris-50 rounded-xl">
                    <div className="w-10 h-10 bg-azul/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-azul" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gris-400 uppercase tracking-wider">{t('contact.legalRep')}</p>
                      <p className="font-semibold">{t('contact.legalRepValue')}</p>
                      <p className="text-sm text-gris-500">{t('contact.legalRepRole')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-naranja-muted/30 rounded-xl">
                    <div className="w-10 h-10 bg-naranja/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-naranja" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gris-400 uppercase tracking-wider">{t('contact.email')}</p>
                      <a href="mailto:somoscoloresdelmundo@gmail.com" className="font-semibold text-naranja hover:underline">
                        somoscoloresdelmundo@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Institutional Details Card */}
              <div className="scroll-reveal" style={{ animationDelay: '0.1s' }}>
                <div className="bg-gris-50 rounded-2xl p-6 h-full">
                  <h3 className="font-bold text-lg mb-6 pb-4 border-b border-gris-200">Datos Institucionales</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.legalName')}</p>
                        <p className="font-medium text-sm">{t('details.legalNameValue')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.type')}</p>
                        <p className="font-medium text-sm">{t('details.typeValue')}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.address')}</p>
                        <p className="font-medium text-sm">{t('details.addressValue')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.city')}</p>
                        <p className="font-medium text-sm">{t('details.cityValue')}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.country')}</p>
                        <p className="font-medium text-sm">{t('details.countryValue')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.foundingYear')}</p>
                        <p className="font-medium text-sm">{t('details.foundingYearValue')}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.staff')}</p>
                        <p className="font-medium text-sm">{t('details.staffValue')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.website')}</p>
                        <p className="font-medium text-sm text-naranja">{t('details.websiteValue')}</p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gris-200">
                      <p className="text-xs text-gris-400 uppercase tracking-wider mb-2">{t('contact.socialMedia')}</p>
                      <a
                        href="https://instagram.com/coloresdelmundo__"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-sm font-medium hover:bg-gris-100 transition-colors"
                      >
                        <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        {t('contact.instagram')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="section bg-gradient-to-r from-naranja via-terracota to-naranja">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white scroll-reveal">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('download.title')}</h2>
            <p className="text-white/90 mb-6">{t('download.description')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <DownloadPIFButton />
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                {tCommon('contact')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <p className="text-sm text-white/70 mt-4">{t('download.tip')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
