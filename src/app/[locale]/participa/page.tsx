import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

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

  const formasParticipar = [
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
      icono: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
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
      icono: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
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
      icono: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      ),
    },
  ];

  const perfilIdeal = [
    {
      key: 'migrants',
      titulo: t('targetProfile.profiles.migrants.title'),
      descripcion: t('targetProfile.profiles.migrants.description'),
    },
    {
      key: 'disadvantaged',
      titulo: t('targetProfile.profiles.disadvantaged.title'),
      descripcion: t('targetProfile.profiles.disadvantaged.description'),
    },
    {
      key: 'rural',
      titulo: t('targetProfile.profiles.rural.title'),
      descripcion: t('targetProfile.profiles.rural.description'),
    },
    {
      key: 'artInterested',
      titulo: t('targetProfile.profiles.artInterested.title'),
      descripcion: t('targetProfile.profiles.artInterested.description'),
    },
  ];

  return (
    <>
      {/* Hero - Con los 4 colores */}
      <section className="bg-gradient-to-br from-gris-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-16 w-64 h-64 bg-azul-muted rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-lima-muted rounded-full blur-3xl opacity-50" />
          <div className="absolute top-32 left-1/3 w-48 h-48 bg-naranja-muted rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-16 right-1/4 w-40 h-40 bg-terracota-muted rounded-full blur-3xl opacity-30" />
        </div>
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <span className="badge badge-naranja mb-4">{t('hero.badge')}</span>
            <h1 className="mb-6">{t('hero.title')}</h1>
            <p className="text-lg text-gris-600">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Formas de participar */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {formasParticipar.map((forma) => (
              <div key={forma.key} className="card">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6
                    ${forma.color === 'azul' ? 'bg-azul/10 text-azul-dark' : ''}
                    ${forma.color === 'naranja' ? 'bg-naranja/10 text-naranja' : ''}
                    ${forma.color === 'lima' ? 'bg-lima/10 text-lima-dark' : ''}
                    ${forma.color === 'terracota' ? 'bg-terracota/10 text-terracota' : ''}
                  `}
                >
                  {forma.icono}
                </div>
                <h2 className="text-xl font-semibold mb-3">{forma.titulo}</h2>
                <p className="text-gris-600 mb-6">{forma.descripcion}</p>
                <ul className="space-y-2 mb-6">
                  {forma.beneficios.map((beneficio, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <svg
                        className={`w-5 h-5 flex-shrink-0
                          ${forma.color === 'azul' ? 'text-azul' : ''}
                          ${forma.color === 'naranja' ? 'text-naranja' : ''}
                          ${forma.color === 'lima' ? 'text-lima' : ''}
                          ${forma.color === 'terracota' ? 'text-terracota' : ''}
                        `}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gris-700">{beneficio}</span>
                    </li>
                  ))}
                </ul>
                {/* Si es partner, enlazar a PIF */}
                <Link
                  href={forma.key === 'partner' ? '/pif' : '/contacto'}
                  className={`btn-outline w-full flex items-center justify-center gap-2
                    ${forma.color === 'azul' ? 'border-azul text-azul-dark hover:bg-azul' : ''}
                    ${forma.color === 'naranja' ? 'border-naranja text-naranja hover:bg-naranja' : ''}
                    ${forma.color === 'lima' ? 'border-lima text-lima-dark hover:bg-lima' : ''}
                    ${forma.color === 'terracota' ? 'border-terracota text-terracota hover:bg-terracota' : ''}
                  `}
                >
                  {forma.key === 'partner' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {forma.key === 'partner' ? t('ways.partner.pifButton') : tCommon('interested')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfil ideal */}
      <section className="section bg-gris-50">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-lima mb-4">{t('targetProfile.badge')}</span>
            <h2 className="mb-4">{t('targetProfile.title')}</h2>
            <p className="text-gris-600 max-w-2xl mx-auto">
              {t('targetProfile.description')}
            </p>
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

      {/* Erasmus+ oportunidades - Estilo Mondrian */}
      <section className="section relative overflow-hidden">
        {/* Fondo artístico con los 4 colores */}
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
              <p className="text-gris-600 mb-6">
                {t('erasmus.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-azul-pastel rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-azul-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gris-700">{t('erasmus.fundedTravel')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-lima-pastel rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-lima-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gris-700">{t('erasmus.accommodationIncluded')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-terracota-pastel rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-terracota-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
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
                {/* Icono grande */}
                <div className="w-24 h-24 bg-lima-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-12 h-12 text-lima-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                {/* Contenido */}
                <div className="flex-1 text-center md:text-left">
                  <span className="badge badge-lima mb-3">{t('partnerCTA.badge')}</span>
                  <h2 className="mb-4">{t('partnerCTA.title')}</h2>
                  <p className="text-gris-600 mb-6 text-lg">
                    {t('partnerCTA.description')}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Link
                      href="/pif"
                      className="btn-primary bg-lima hover:bg-lima-dark flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {t('partnerCTA.button')}
                    </Link>
                    <Link href="/contacto" className="btn-secondary">
                      {tCommon('contactUs')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
          <Link href="/contacto" className="btn-primary">
            {tCommon('contactNow')}
          </Link>
        </div>
      </section>
    </>
  );
}
