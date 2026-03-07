import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroSection, CTASection } from '@/components/sections';
import { FeatureCard } from '@/components/cards';
import { Button, ArrowIcon, MobilityIcon, ArtIcon, EducationIcon, DigitalIcon, UsersIcon, HeartIcon, CheckIcon } from '@/components/ui';
import { MondrianGrid } from '@/components/decorations';
import { ColorVariant, colorClasses } from '@/types/ui';
import { ROUTES } from '@/config/routes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('whatWeDo.title'),
    description: t('whatWeDo.description'),
  };
}

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
            <div
              className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8
                ${colors.bgColor} ${colors.textDark}`}
            >
              {icon}
            </div>

            <span className={`badge ${colors.badge} mb-4`}>{subtitle}</span>
            <h2 className="mb-5">{title}</h2>
            <p className="text-gris-600 mb-8 text-lg leading-relaxed">{description}</p>

            <Button href={ROUTES.PARTICIPATE} variant="outline" icon={<ArrowIcon />}>
              {ctaText}
            </Button>
          </div>

          <div className={reverse ? 'lg:order-1' : ''}>
            <div className="card card-interactive">
              <h3 className="font-semibold mb-6 text-lg">{detailsTitle}</h3>
              <ul className="space-y-4">
                {details.map((detalle, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                        ${colors.bgColor} ${colors.text}`}
                    >
                      <CheckIcon className="w-4 h-4" />
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
      icon: <MobilityIcon className="w-12 h-12" />,
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
      icon: <ArtIcon className="w-12 h-12" />,
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
      icon: <EducationIcon className="w-12 h-12" />,
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
      icon: <DigitalIcon className="w-12 h-12" />,
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
    { title: t('erasmus.trainingCourses.title'), description: t('erasmus.trainingCourses.description'), color: 'lima' as ColorVariant, icon: <EducationIcon /> },
    { title: t('erasmus.volunteering.title'), description: t('erasmus.volunteering.description'), color: 'terracota' as ColorVariant, icon: <HeartIcon /> },
  ];

  return (
    <>
      <HeroSection
        badge={{ text: t('hero.badge'), color: 'lima' }}
        title={t('hero.title')}
        description={t('hero.description')}
        background="shapes"
        backgroundVariant="scattered"
      />

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
            {erasmusCards.map((card) => (
              <FeatureCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                description={card.description}
                color={card.color}
                variant="bordered"
                className="bg-white/90 backdrop-blur-sm text-center"
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={t('cta.title')}
        description={t('cta.description')}
        primaryButton={{ text: tCommon('seeOpportunities'), href: ROUTES.PARTICIPATE }}
        secondaryButton={{ text: tCommon('viewProjects'), href: ROUTES.PROJECTS, icon: false }}
        background="white"
      />
    </>
  );
}
