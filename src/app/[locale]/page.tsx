import { getTranslations } from 'next-intl/server';
import {
  MobilityIcon,
  ArtIcon,
  EducationIcon,
  DigitalIcon,
  GlobeIcon,
  UsersIcon,
  HomeIcon,
} from '@/components/ui';
import { INSTITUTIONAL } from '@/config/constants';
import { ROUTES } from '@/config/routes';
import { HomeClient } from './HomeClient';

export default async function HomePage() {
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');
  const tWhatWeDo = await getTranslations('whatWeDo');

  // Líneas de acción con traducciones
  const actionLines = [
    {
      id: 'movilidad',
      title: t('actionLines.mobility.title'),
      description: t('actionLines.mobility.description'),
      icon: <MobilityIcon className="w-8 h-8" />,
      color: 'azul' as const,
      details: [
        tWhatWeDo('lines.mobility.details.0'),
        tWhatWeDo('lines.mobility.details.1'),
        tWhatWeDo('lines.mobility.details.2'),
      ],
    },
    {
      id: 'arte',
      title: t('actionLines.art.title'),
      description: t('actionLines.art.description'),
      icon: <ArtIcon className="w-8 h-8" />,
      color: 'terracota' as const,
      details: [
        tWhatWeDo('lines.art.details.0'),
        tWhatWeDo('lines.art.details.1'),
        tWhatWeDo('lines.art.details.2'),
      ],
    },
    {
      id: 'educacion',
      title: t('actionLines.education.title'),
      description: t('actionLines.education.description'),
      icon: <EducationIcon className="w-8 h-8" />,
      color: 'lima' as const,
      details: [
        tWhatWeDo('lines.education.details.0'),
        tWhatWeDo('lines.education.details.1'),
        tWhatWeDo('lines.education.details.2'),
      ],
    },
    {
      id: 'digital',
      title: t('actionLines.digital.title'),
      description: t('actionLines.digital.description'),
      icon: <DigitalIcon className="w-8 h-8" />,
      color: 'naranja' as const,
      details: [
        tWhatWeDo('lines.digital.details.0'),
        tWhatWeDo('lines.digital.details.1'),
        tWhatWeDo('lines.digital.details.2'),
      ],
    },
  ];

  // Valores
  const values = [
    { number: '01', title: t('values.inclusion.title'), description: t('values.inclusion.description') },
    { number: '02', title: t('values.diversity.title'), description: t('values.diversity.description') },
    { number: '03', title: t('values.creation.title'), description: t('values.creation.description') },
  ];

  // Target groups
  const targetGroups = [
    {
      title: t('targetGroups.migrants.title'),
      description: t('targetGroups.migrants.description'),
      color: 'azul' as const,
      icon: <GlobeIcon className="w-6 h-6" />,
    },
    {
      title: t('targetGroups.disadvantaged.title'),
      description: t('targetGroups.disadvantaged.description'),
      color: 'lima' as const,
      icon: <UsersIcon className="w-6 h-6" />,
    },
    {
      title: t('targetGroups.rural.title'),
      description: t('targetGroups.rural.description'),
      color: 'naranja' as const,
      icon: <HomeIcon className="w-6 h-6" />,
    },
  ];

  return (
    <HomeClient
      // Hero
      heroBadge={t('hero.badge')}
      heroTitleBefore={t('hero.title')}
      heroTitleArt={t('hero.art')}
      heroTitleMiddle={t('hero.and')}
      heroTitleEducation={t('hero.education')}
      heroDescription={t('hero.description')}
      heroPrimaryButton={{ text: tCommon('join'), href: ROUTES.PARTICIPATE }}
      heroSecondaryButton={{ text: tCommon('knowOurHistory'), href: ROUTES.ABOUT }}
      heroSlogan={{
        inclusion: t('slogan.inclusion'),
        diversity: t('slogan.diversity'),
        creation: t('slogan.creation'),
      }}
      // Líneas de Acción
      actionLinesBadge={t('actionLines.badge')}
      actionLinesTitle={t('actionLines.title')}
      actionLines={actionLines}
      actionLinesLinkText={tCommon('learnMore')}
      actionLinesLinkHref={ROUTES.WHAT_WE_DO}
      // Sobre Nosotros
      aboutBadge={t('aboutPreview.badge')}
      aboutTitle={t('aboutPreview.title')}
      aboutDescription={t('aboutPreview.description')}
      aboutQuote={t('aboutPreview.quote')}
      aboutButtonText={tCommon('knowMoreAboutUs')}
      aboutButtonHref={ROUTES.ABOUT}
      values={values}
      // Erasmus+
      erasmusBadge={t('erasmus.badge')}
      erasmusTitle={t('erasmus.title')}
      erasmusDescription={t('erasmus.description')}
      erasmusTags={[
        t('erasmus.youthExchanges'),
        t('erasmus.trainingCourses'),
        t('erasmus.volunteering'),
      ]}
      erasmusYearsValue={INSTITUTIONAL.FOUNDING_YEAR}
      erasmusYearsLabel={t('erasmus.yearsExperience')}
      erasmusYearsDescription={t('erasmus.yearsDescription')}
      // Target Groups
      targetBadge={t('targetGroups.badge')}
      targetTitle={t('targetGroups.title')}
      targetDescription={t('targetGroups.description')}
      targetGroups={targetGroups}
      // CTA
      ctaTitle={t('cta.title')}
      ctaDescription={t('cta.description')}
      ctaPrimaryButton={{ text: tCommon('participateWithUs'), href: ROUTES.PARTICIPATE }}
      ctaSecondaryButton={{ text: tCommon('contactUs'), href: ROUTES.CONTACT }}
    />
  );
}
