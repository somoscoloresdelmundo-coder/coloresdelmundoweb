'use client';

import { ReactNode } from 'react';
import {
  HeroImmersive,
  HorizontalScrollSection,
  WaveDivider,
  GradientTransition,
  Card3D,
  TextReveal,
  CounterAnimated,
  DIVIDER_COLORS,
} from '@/components/immersive';
import { PageTransition } from '@/components/providers/PageTransition';
import { CTASection } from '@/components/sections';
import { MondrianGrid } from '@/components/decorations';
import { ColorVariant, CTAConfig } from '@/types/ui';
import { Pathnames } from '@/i18n/routing';

interface HomeClientProps {
  // Hero
  heroBadge: string;
  heroTitleBefore: string;
  heroTitleArt: string;
  heroTitleMiddle: string;
  heroTitleEducation: string;
  heroDescription: string;
  heroPrimaryButton: { text: string; href: Pathnames };
  heroSecondaryButton: { text: string; href: Pathnames };
  heroSlogan: { inclusion: string; diversity: string; creation: string };

  // Líneas de Acción
  actionLinesBadge: string;
  actionLinesTitle: string;
  actionLines: Array<{
    id: string;
    title: string;
    description: string;
    icon: ReactNode;
    color: 'azul' | 'lima' | 'naranja' | 'terracota';
    details?: string[];
  }>;
  actionLinesLinkText: string;
  actionLinesLinkHref: Pathnames;

  // Sobre Nosotros
  aboutBadge: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutQuote: string;
  aboutButtonText: string;
  aboutButtonHref: Pathnames;
  values: Array<{
    number: string;
    title: string;
    description: string;
  }>;

  // Erasmus+
  erasmusBadge: string;
  erasmusTitle: string;
  erasmusDescription: string;
  erasmusTags: string[];
  erasmusYearsValue: number;
  erasmusYearsLabel: string;
  erasmusYearsDescription: string;

  // Target Groups
  targetBadge: string;
  targetTitle: string;
  targetDescription: string;
  targetGroups: Array<{
    title: string;
    description: string;
    icon: ReactNode;
    color: ColorVariant;
  }>;

  // CTA
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryButton: CTAConfig;
  ctaSecondaryButton: CTAConfig;
}

export function HomeClient({
  heroBadge,
  heroTitleBefore,
  heroTitleArt,
  heroTitleMiddle,
  heroTitleEducation,
  heroDescription,
  heroPrimaryButton,
  heroSecondaryButton,
  heroSlogan,
  actionLinesBadge,
  actionLinesTitle,
  actionLines,
  actionLinesLinkText,
  actionLinesLinkHref,
  aboutBadge,
  aboutTitle,
  aboutDescription,
  aboutQuote,
  aboutButtonText,
  aboutButtonHref,
  values,
  erasmusBadge,
  erasmusTitle,
  erasmusDescription,
  erasmusTags,
  erasmusYearsValue,
  erasmusYearsLabel,
  erasmusYearsDescription,
  targetBadge,
  targetTitle,
  targetDescription,
  targetGroups,
  ctaTitle,
  ctaDescription,
  ctaPrimaryButton,
  ctaSecondaryButton,
}: HomeClientProps) {
  // Mapear colores para HorizontalScrollSection
  const horizontalItems = actionLines.map((line) => ({
    id: line.id,
    title: line.title,
    description: line.description,
    icon: line.icon,
    color: line.color,
    details: line.details,
  }));

  return (
    <PageTransition>
      {/* Hero Inmersivo */}
      <HeroImmersive
        badge={heroBadge}
        titleParts={{
          before: heroTitleBefore,
          art: heroTitleArt,
          middle: heroTitleMiddle,
          education: heroTitleEducation,
        }}
        description={heroDescription}
        primaryButton={heroPrimaryButton}
        secondaryButton={heroSecondaryButton}
        slogan={heroSlogan}
        logoSrc="/images/logo.png"
      />

      {/* Divisor orgánico */}
      <WaveDivider
        fromColor="#ffffff"
        toColor={DIVIDER_COLORS.blue}
        variant="gentle"
        layers={2}
        height={120}
      />

      {/* Líneas de Acción - Scroll Horizontal */}
      <HorizontalScrollSection
        badge={actionLinesBadge}
        title={actionLinesTitle}
        items={horizontalItems}
        linkText={actionLinesLinkText}
        linkHref={actionLinesLinkHref}
      />

      {/* Divisor de gradiente */}
      <GradientTransition
        colors={[DIVIDER_COLORS.blue, DIVIDER_COLORS.lime, '#ffffff']}
        variant="smooth"
        height={150}
      />

      {/* Sobre Nosotros con Parallax */}
      <section className="section bg-white relative overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="badge bg-gris-100 text-gris-500 border-gris-200 mb-4">
                {aboutBadge}
              </span>
              <TextReveal
                text={aboutTitle}
                as="h2"
                variant="word"
                className="mb-6"
                trigger="scroll"
              />
              <p className="text-gris-500 mb-6 text-lg leading-relaxed">
                {aboutDescription}
              </p>
              <blockquote className="border-l-2 border-naranja pl-6 italic text-gris-600 mb-8 py-2">
                &ldquo;{aboutQuote}&rdquo;
              </blockquote>
              <a
                href={aboutButtonHref}
                className="btn-outline inline-flex items-center gap-2"
              >
                {aboutButtonText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((valor, index) => (
                <Card3D
                  key={valor.number}
                  className={`p-6 bg-white rounded-2xl shadow-lg ${index === 2 ? 'col-span-2' : ''}`}
                  tiltIntensity={10}
                  shineColor={index === 0 ? 'blue' : index === 1 ? 'lime' : 'orange'}
                >
                  <span className="text-4xl font-bold text-gris-200">{valor.number}</span>
                  <h3 className="text-lg font-semibold mt-2 mb-1">{valor.title}</h3>
                  <p className="text-sm text-gris-500">{valor.description}</p>
                </Card3D>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divisor de olas */}
      <WaveDivider
        fromColor="#ffffff"
        toColor={DIVIDER_COLORS.orange}
        variant="dynamic"
        layers={3}
        height={100}
      />

      {/* Erasmus+ con Mondrian */}
      <section className="section bg-naranja-bg relative overflow-hidden">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden">
            <MondrianGrid variant="section" opacity={40} />

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                  <span className="badge badge-azul mb-6">{erasmusBadge}</span>
                  <TextReveal text={erasmusTitle} as="h2" variant="word" className="mb-5" trigger="scroll" />
                  <p className="text-gris-600 mb-8 text-lg leading-relaxed">
                    {erasmusDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {erasmusTags.map((tag, i) => (
                      <span
                        key={tag}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                          i === 0
                            ? 'bg-azul-pastel text-azul-dark'
                            : i === 1
                            ? 'bg-lima-pastel text-lima-dark'
                            : 'bg-naranja-pastel text-naranja-dark'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="inline-block bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                    <p className="text-6xl md:text-7xl font-bold text-naranja-dark">
                      <CounterAnimated
                        value={erasmusYearsValue}
                        suffix="+"
                        easing="spring"
                        duration={2}
                      />
                    </p>
                    <p className="text-gris-700 text-lg mt-2 font-medium">{erasmusYearsLabel}</p>
                    <p className="text-gris-500 text-sm mt-1">{erasmusYearsDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divisor */}
      <GradientTransition
        fromColor={DIVIDER_COLORS.orange}
        toColor="#f9fafb"
        variant="smooth"
        height={100}
      />

      {/* Target Groups */}
      <section className="section bg-gris-50 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <span className="badge badge-azul mb-4">{targetBadge}</span>
            <TextReveal text={targetTitle} as="h2" variant="word" className="mb-4" trigger="scroll" />
            <p className="text-gris-500 max-w-2xl mx-auto text-lg">
              {targetDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {targetGroups.map((group, index) => (
              <Card3D
                key={group.title}
                className="p-6 bg-white rounded-2xl shadow-lg text-center"
                tiltIntensity={12}
                shineColor={
                  group.color === 'azul'
                    ? 'blue'
                    : group.color === 'lima'
                    ? 'lime'
                    : group.color === 'naranja'
                    ? 'orange'
                    : 'terracotta'
                }
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    group.color === 'azul'
                      ? 'bg-azul-pastel text-azul-dark'
                      : group.color === 'lima'
                      ? 'bg-lima-pastel text-lima-dark'
                      : 'bg-naranja-pastel text-naranja-dark'
                  }`}
                >
                  {group.icon}
                </div>
                <h3 className="font-semibold mb-2">{group.title}</h3>
                <p className="text-sm text-gris-500">{group.description}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <CTASection
        title={ctaTitle}
        description={ctaDescription}
        primaryButton={ctaPrimaryButton}
        secondaryButton={{ ...ctaSecondaryButton, icon: false }}
        background="mondrian"
      />
    </PageTransition>
  );
}
