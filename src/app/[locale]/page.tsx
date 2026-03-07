import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import {
  Button,
  ArrowIcon,
  MobilityIcon,
  ArtIcon,
  EducationIcon,
  DigitalIcon,
  GlobeIcon,
  UsersIcon,
  HomeIcon,
} from '@/components/ui';
import { GridSection, CTASection } from '@/components/sections';
import { FeatureCard, ValueCard } from '@/components/cards';
import { MondrianGrid } from '@/components/decorations';
import { AnimatedNumber } from '@/components/artistic';
import { ColorVariant } from '@/types/ui';
import { INSTITUTIONAL } from '@/config/constants';
import { ROUTES } from '@/config/routes';

// Static stagger classes - Tailwind requires static class names for purging
const STAGGER = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4', 'stagger-5', 'stagger-6', 'stagger-7', 'stagger-8'] as const;

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
                <Button href={ROUTES.PARTICIPATE} variant="primary" icon={<ArrowIcon />}>
                  {tCommon('join')}
                </Button>
                <Button href={ROUTES.ABOUT} variant="secondary">
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
            href={ROUTES.WHAT_WE_DO}
            linkText={tCommon('learnMore')}
            variant="bordered"
            className={STAGGER[index] || 'stagger-1'}
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
              <Button href={ROUTES.ABOUT} variant="outline" icon={<ArrowIcon />}>
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
                  className={STAGGER[index] || 'stagger-1'}
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
                      <AnimatedNumber value={INSTITUTIONAL.YEARS_EXPERIENCE} suffix="+" />
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
                className={`text-center ${STAGGER[index] || 'stagger-1'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - Usando CTASection */}
      <CTASection
        title={t('cta.title')}
        description={t('cta.description')}
        primaryButton={{ text: tCommon('participateWithUs'), href: ROUTES.PARTICIPATE }}
        secondaryButton={{ text: tCommon('contactUs'), href: ROUTES.CONTACT, icon: false }}
        background="mondrian"
      />
    </>
  );
}
