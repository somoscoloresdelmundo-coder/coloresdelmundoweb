import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Button, ArrowIcon } from '@/components/ui';
import { GridSection, CTASection } from '@/components/sections';
import { FeatureCard, ValueCard } from '@/components/cards';
import { MondrianGrid } from '@/components/decorations';
import { AnimatedNumber } from '@/components/artistic';
import { ColorVariant } from '@/types/ui';

// Iconos como componentes para reutilizar
const MobilityIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArtIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
  </svg>
);

const EducationIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

const DigitalIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

export default async function HomePage() {
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');

  // Datos de las líneas de acción con traducciones
  const lineasAccion: Array<{
    id: string;
    titulo: string;
    descripcion: string;
    icono: React.ReactNode;
    color: ColorVariant;
  }> = [
    {
      id: 'movilidad',
      titulo: t('actionLines.mobility.title'),
      descripcion: t('actionLines.mobility.description'),
      icono: <MobilityIcon />,
      color: 'azul',
    },
    {
      id: 'arte',
      titulo: t('actionLines.art.title'),
      descripcion: t('actionLines.art.description'),
      icono: <ArtIcon />,
      color: 'terracota',
    },
    {
      id: 'educacion',
      titulo: t('actionLines.education.title'),
      descripcion: t('actionLines.education.description'),
      icono: <EducationIcon />,
      color: 'lima',
    },
    {
      id: 'digital',
      titulo: t('actionLines.digital.title'),
      descripcion: t('actionLines.digital.description'),
      icono: <DigitalIcon />,
      color: 'naranja',
    },
  ];

  const valores = [
    { numero: '01', titulo: t('values.inclusion.title'), descripcion: t('values.inclusion.description') },
    { numero: '02', titulo: t('values.diversity.title'), descripcion: t('values.diversity.description') },
    { numero: '03', titulo: t('values.creation.title'), descripcion: t('values.creation.description'), span: 2 as const },
  ];

  const targetGroups = [
    { titulo: t('targetGroups.migrants.title'), descripcion: t('targetGroups.migrants.description'), color: 'azul' as ColorVariant, icono: <GlobeIcon /> },
    { titulo: t('targetGroups.disadvantaged.title'), descripcion: t('targetGroups.disadvantaged.description'), color: 'lima' as ColorVariant, icono: <UsersIcon /> },
    { titulo: t('targetGroups.rural.title'), descripcion: t('targetGroups.rural.description'), color: 'naranja' as ColorVariant, icono: <HomeIcon /> },
  ];

  return (
    <>
      {/* Hero Section - Custom porque tiene layout único con logo */}
      <section className="relative bg-gradient-to-b from-white via-gris-50 to-gris-50 overflow-hidden min-h-[90vh] flex flex-col justify-center">

        <div className="container py-16 md:py-24 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="anim-slide-up">
              <span className="badge bg-gris-100 text-gris-600 border-gris-200 mb-6 anim-scale-up stagger-2">
                {t('hero.badge')}
              </span>
              <h1 className="mb-6 leading-tight">
                {t('hero.title')}{' '}
                <span className="text-naranja-dark relative inline-block">
                  {t('hero.art')}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-naranja-pastel" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,8 Q25,0 50,8 T100,8" fill="none" stroke="currentColor" strokeWidth="4"/>
                  </svg>
                </span> {t('hero.and')}{' '}
                <span className="text-lima-dark relative inline-block">
                  {t('hero.education')}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-lima-pastel" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,8 Q25,0 50,8 T100,8" fill="none" stroke="currentColor" strokeWidth="4"/>
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gris-500 mb-8 max-w-xl leading-relaxed">
                {t('hero.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/participa" variant="primary" icon={<ArrowIcon />}>
                  {tCommon('join')}
                </Button>
                <Button href="/sobre-nosotros" variant="secondary">
                  {tCommon('knowOurHistory')}
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block anim-slide-up stagger-3">
              <div className="relative">
                <div className="absolute -inset-8 rounded-full blur-3xl opacity-60">
                  <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-azul-pastel rounded-full" />
                  <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-lima-pastel rounded-full" />
                  <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-naranja-pastel rounded-full" />
                  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-terracota-pastel rounded-full" />
                </div>
                <Image
                  src="/images/logo.png"
                  alt="Colores del Mundo"
                  width={500}
                  height={400}
                  className="relative z-10 mx-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Slogan */}
        <div className="py-6 mt-auto">
          <div className="divider-4colors max-w-xs mx-auto mb-6 opacity-60" />
          <div className="flex items-center justify-center gap-6 md:gap-10 text-sm md:text-base font-semibold tracking-widest uppercase">
            <span className="text-azul-dark hover:text-azul transition-colors">{t('slogan.inclusion')}</span>
            <span className="w-2 h-2 rounded-full bg-lima-soft" />
            <span className="text-naranja-dark hover:text-naranja transition-colors">{t('slogan.diversity')}</span>
            <span className="w-2 h-2 rounded-full bg-terracota-soft" />
            <span className="text-lima-dark hover:text-lima transition-colors">{t('slogan.creation')}</span>
          </div>
        </div>
      </section>

      {/* Divisor */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gris-200 to-transparent" />

      {/* Líneas de Acción - Usando GridSection + FeatureCard */}
      <GridSection
        badge={{ text: t('actionLines.badge'), color: 'naranja' }}
        title={t('actionLines.title')}
        description={t('actionLines.description')}
        columns={4}
        background="gray"
        gap="lg"
        stagger
      >
        {lineasAccion.map((linea, index) => (
          <FeatureCard
            key={linea.id}
            icon={linea.icono}
            title={linea.titulo}
            description={linea.descripcion}
            color={linea.color}
            href="/que-hacemos"
            linkText={tCommon('learnMore')}
            variant="bordered"
            className={`hover-lift stagger-${index + 1}`}
          />
        ))}
      </GridSection>

      {/* Sobre Nosotros Preview */}
      <section className="section bg-white scroll-reveal">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="badge bg-gris-100 text-gris-500 border-gris-200 mb-4">{t('aboutPreview.badge')}</span>
              <h2 className="mb-6">{t('aboutPreview.title')}</h2>
              <p className="text-gris-500 mb-6 text-lg leading-relaxed">
                {t('aboutPreview.description')}
              </p>
              <blockquote className="border-l-2 border-gris-200 pl-6 italic text-gris-600 mb-8 py-2">
                &ldquo;{t('aboutPreview.quote')}&rdquo;
              </blockquote>
              <Button href="/sobre-nosotros" variant="outline" icon={<ArrowIcon />}>
                {tCommon('knowMoreAboutUs')}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 stagger-container">
              {valores.map((valor, index) => (
                <ValueCard
                  key={valor.numero}
                  number={valor.numero}
                  title={valor.titulo}
                  description={valor.descripcion}
                  span={valor.span}
                  className={`hover-lift stagger-${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Erasmus+ - Con decoración Mondrian */}
      <section className="section bg-white scroll-reveal">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden">
            <MondrianGrid variant="section" opacity={60} />

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                  <span className="badge badge-azul mb-6">{t('erasmus.badge')}</span>
                  <h2 className="mb-5">{t('erasmus.title')}</h2>
                  <p className="text-gris-600 mb-8 text-lg leading-relaxed">
                    {t('erasmus.description')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-azul-pastel rounded-full text-sm text-azul-dark font-medium">
                      {t('erasmus.youthExchanges')}
                    </span>
                    <span className="px-3 py-1.5 bg-lima-pastel rounded-full text-sm text-lima-dark font-medium">
                      {t('erasmus.trainingCourses')}
                    </span>
                    <span className="px-3 py-1.5 bg-naranja-pastel rounded-full text-sm text-naranja-dark font-medium">
                      {t('erasmus.volunteering')}
                    </span>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                    <p className="text-6xl md:text-7xl font-bold text-naranja-dark">
                      <AnimatedNumber value={5} suffix="+" />
                    </p>
                    <p className="text-gris-700 text-lg mt-2 font-medium">{t('erasmus.yearsExperience')}</p>
                    <p className="text-gris-500 text-sm mt-1">{t('erasmus.yearsDescription')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Groups - Usando GridSection + FeatureCard */}
      <section className="section bg-gris-50 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <span className="badge badge-azul mb-4">{t('targetGroups.badge')}</span>
            <h2 className="mb-4">{t('targetGroups.title')}</h2>
            <p className="text-gris-500 max-w-2xl mx-auto text-lg">
              {t('targetGroups.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 stagger-container">
            {targetGroups.map((group, index) => (
              <FeatureCard
                key={group.titulo}
                icon={group.icono}
                title={group.titulo}
                description={group.descripcion}
                color={group.color}
                variant="bordered"
                className={`text-center hover-lift stagger-${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - Usando CTASection */}
      <CTASection
        title={t('cta.title')}
        description={t('cta.description')}
        primaryButton={{ text: tCommon('participateWithUs'), href: '/participa' }}
        secondaryButton={{ text: tCommon('contactUs'), href: '/contacto', icon: false }}
        background="mondrian"
      />
    </>
  );
}
