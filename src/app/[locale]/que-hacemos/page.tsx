import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroSection, GridSection, CTASection } from '@/components/sections';
import { FeatureCard } from '@/components/cards';
import { Button, ArrowIcon } from '@/components/ui';
import { MondrianGrid } from '@/components/decorations';
import { ColorVariant, colorClasses } from '@/types/ui';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('whatWeDo.title'),
    description: t('whatWeDo.description'),
  };
}

// Iconos de las líneas de acción
const MobilityIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArtIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
  </svg>
);

const EducationIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

const DigitalIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

const TrainingIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

// Componente para sección de línea de acción
interface ActionLineSectionProps {
  id: string;
  icon: React.ReactNode;
  color: ColorVariant;
  subtitle: string;
  title: string;
  description: string;
  details: string[];
  detailsTitle: string;
  ctaText: string;
  reverse?: boolean;
  background?: 'white' | 'gray';
}

function ActionLineSection({
  id,
  icon,
  color,
  subtitle,
  title,
  description,
  details,
  detailsTitle,
  ctaText,
  reverse = false,
  background = 'white',
}: ActionLineSectionProps) {
  const colors = colorClasses[color];

  return (
    <section
      id={id}
      className={`section scroll-reveal ${background === 'gray' ? 'bg-gris-50' : 'bg-white'}`}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={reverse ? 'lg:order-2' : ''}>
            {/* Icono grande animado */}
            <div
              className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8
                transition-all duration-300 hover:scale-110 hover:rotate-3
                ${colors.bgColor} ${colors.textDark}
                hover:${colors.bg} hover:text-white hover:shadow-lg`}
            >
              {icon}
            </div>

            {/* Badge y título */}
            <span className={`badge ${colors.badge} mb-4`}>{subtitle}</span>
            <h2 className="mb-5">{title}</h2>
            <p className="text-gris-600 mb-8 text-lg leading-relaxed">{description}</p>

            {/* CTA */}
            <Button href="/participa" variant="outline" icon={<ArrowIcon />}>
              {ctaText}
            </Button>
          </div>

          {/* Card con detalles */}
          <div className={reverse ? 'lg:order-1' : ''}>
            <div className="card card-interactive">
              <h3 className="font-semibold mb-6 text-lg">{detailsTitle}</h3>
              <ul className="space-y-4">
                {details.map((detalle, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                        transition-all group-hover:scale-110 ${colors.bgColor} ${colors.text}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gris-700 leading-relaxed">{detalle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function QueHacemosPage() {
  const t = await getTranslations('whatWeDo');
  const tCommon = await getTranslations('common');

  // Datos de las líneas de acción
  const lineasAccion: Array<{
    id: string;
    icon: React.ReactNode;
    color: ColorVariant;
    subtitle: string;
    title: string;
    description: string;
    details: string[];
  }> = [
    {
      id: 'movilidad',
      icon: <MobilityIcon />,
      color: 'azul',
      subtitle: t('lines.mobility.subtitle'),
      title: t('lines.mobility.title'),
      description: t('lines.mobility.description'),
      details: [
        t('lines.mobility.details.0'),
        t('lines.mobility.details.1'),
        t('lines.mobility.details.2'),
        t('lines.mobility.details.3'),
        t('lines.mobility.details.4'),
      ],
    },
    {
      id: 'arte',
      icon: <ArtIcon />,
      color: 'terracota',
      subtitle: t('lines.art.subtitle'),
      title: t('lines.art.title'),
      description: t('lines.art.description'),
      details: [
        t('lines.art.details.0'),
        t('lines.art.details.1'),
        t('lines.art.details.2'),
        t('lines.art.details.3'),
        t('lines.art.details.4'),
      ],
    },
    {
      id: 'educacion',
      icon: <EducationIcon />,
      color: 'lima',
      subtitle: t('lines.education.subtitle'),
      title: t('lines.education.title'),
      description: t('lines.education.description'),
      details: [
        t('lines.education.details.0'),
        t('lines.education.details.1'),
        t('lines.education.details.2'),
        t('lines.education.details.3'),
        t('lines.education.details.4'),
      ],
    },
    {
      id: 'digital',
      icon: <DigitalIcon />,
      color: 'naranja',
      subtitle: t('lines.digital.subtitle'),
      title: t('lines.digital.title'),
      description: t('lines.digital.description'),
      details: [
        t('lines.digital.details.0'),
        t('lines.digital.details.1'),
        t('lines.digital.details.2'),
        t('lines.digital.details.3'),
        t('lines.digital.details.4'),
      ],
    },
  ];

  const erasmusCards = [
    { title: t('erasmus.youthExchanges.title'), description: t('erasmus.youthExchanges.description'), color: 'azul' as ColorVariant, icon: <UsersIcon /> },
    { title: t('erasmus.trainingCourses.title'), description: t('erasmus.trainingCourses.description'), color: 'lima' as ColorVariant, icon: <TrainingIcon /> },
    { title: t('erasmus.volunteering.title'), description: t('erasmus.volunteering.description'), color: 'terracota' as ColorVariant, icon: <HeartIcon /> },
  ];

  return (
    <>
      {/* Hero - Usando HeroSection */}
      <HeroSection
        badge={{ text: t('hero.badge'), color: 'lima' }}
        title={t('hero.title')}
        description={t('hero.description')}
        background="shapes"
        backgroundVariant="scattered"
      />

      {/* Líneas de Acción - Usando componente modular */}
      {lineasAccion.map((linea, index) => (
        <ActionLineSection
          key={linea.id}
          id={linea.id}
          icon={linea.icon}
          color={linea.color}
          subtitle={linea.subtitle}
          title={linea.title}
          description={linea.description}
          details={linea.details}
          detailsTitle={t('lines.whatWeDo')}
          ctaText={tCommon('participateInThisLine')}
          reverse={index % 2 === 1}
          background={index % 2 === 0 ? 'white' : 'gray'}
        />
      ))}

      {/* Erasmus+ - Usando MondrianGrid + GridSection */}
      <section className="section relative overflow-hidden scroll-reveal">
        <MondrianGrid variant="hero" opacity={40} />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <span className="badge badge-azul mb-6">{t('erasmus.badge')}</span>
            <h2 className="mb-5">{t('erasmus.title')}</h2>
            <p className="text-gris-600 max-w-2xl mx-auto text-lg leading-relaxed">
              {t('erasmus.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 stagger-container">
            {erasmusCards.map((card, index) => (
              <FeatureCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                description={card.description}
                color={card.color}
                variant="bordered"
                className={`bg-white/90 backdrop-blur-sm text-center hover-lift stagger-${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Usando CTASection */}
      <CTASection
        title={t('cta.title')}
        description={t('cta.description')}
        primaryButton={{ text: tCommon('seeOpportunities'), href: '/participa' }}
        secondaryButton={{ text: tCommon('viewProjects'), href: '/proyectos', icon: false }}
        background="white"
      />
    </>
  );
}
