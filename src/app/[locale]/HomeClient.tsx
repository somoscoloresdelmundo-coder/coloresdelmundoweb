'use client';

import { ReactNode } from 'react';
import { HeroSection, CTASection } from '@/components/sections';
import { PageTransition } from '@/components/providers/PageTransition';
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
  return (
    <PageTransition>
      {/* Hero Profesional */}
      <HeroSection
        badge={{ text: heroBadge, color: 'azul' }}
        title={
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {heroTitleBefore} <span className="text-terracota">{heroTitleArt}</span> {heroTitleMiddle}{' '}
            <span className="text-lima">{heroTitleEducation}</span>
          </span>
        }
        description={heroDescription}
        cta={{
          primary: { ...heroPrimaryButton, icon: true },
          secondary: { ...heroSecondaryButton, icon: false },
        }}
        background="white"
      />

      {/* Sobre Nosotros - Clean & Serious */}
      <section className="py-20 md:py-28 bg-gris-50 border-t border-gris-200">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-gris-200 text-gris-600 rounded-full text-sm font-semibold mb-6">
                {aboutBadge}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gris-900 leading-tight">
                {aboutTitle}
              </h2>
              <p className="text-gris-600 mb-6 text-lg leading-relaxed">
                {aboutDescription}
              </p>
              <blockquote className="border-l-4 border-azul pl-6 py-2 my-8">
                <p className="text-xl italic text-gris-800 font-medium">"{aboutQuote}"</p>
              </blockquote>
              <a
                href={aboutButtonHref}
                className="inline-flex items-center gap-2 text-azul-dark font-semibold hover:text-azul transition-colors"
              >
                {aboutButtonText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            
            <div className="grid gap-6">
              {values.map((valor, index) => (
                <div key={valor.number} className="bg-white p-8 rounded-2xl shadow-sm border border-gris-100 flex gap-6 items-start">
                  <span className="text-4xl font-bold text-azul/20">{valor.number}</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gris-900">{valor.title}</h3>
                    <p className="text-gris-600 leading-relaxed">{valor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Líneas de Acción - Grid Limpio */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 bg-azul-pastel text-azul-dark rounded-full text-sm font-semibold mb-4">
              {actionLinesBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gris-900 mb-6">{actionLinesTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {actionLines.map((line) => (
              <div key={line.id} className="group p-8 rounded-3xl bg-gris-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gris-200">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-azul">
                  {line.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gris-900">{line.title}</h3>
                <p className="text-gris-600 mb-6 text-lg">{line.description}</p>
                <ul className="space-y-3">
                  {line.details?.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gris-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-azul mt-2 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <a
                href={actionLinesLinkHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-azul text-white rounded-xl font-semibold hover:bg-azul-dark transition-colors"
              >
                {actionLinesLinkText}
              </a>
          </div>
        </div>
      </section>

      {/* Erasmus+ Impacto Real */}
      <section className="py-20 md:py-28 bg-azul-dark text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm font-semibold mb-6">
                {erasmusBadge}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{erasmusTitle}</h2>
              <p className="text-azul-100 mb-8 text-lg leading-relaxed">
                {erasmusDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                {erasmusTags.map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end">
              <div className="bg-white text-center p-12 rounded-3xl shadow-2xl max-w-sm w-full">
                <div className="text-7xl font-bold text-azul mb-2">
                  {erasmusYearsValue}
                </div>
                <p className="text-gris-900 text-xl font-bold mb-2">{erasmusYearsLabel}</p>
                <p className="text-gris-500">{erasmusYearsDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="py-20 md:py-28 bg-gris-50">
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 bg-gris-200 text-gris-600 rounded-full text-sm font-semibold mb-4">
              {targetBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gris-900 mb-4">{targetTitle}</h2>
            <p className="text-gris-600 text-lg">{targetDescription}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {targetGroups.map((group) => (
              <div key={group.title} className="bg-white p-8 rounded-2xl shadow-sm border border-gris-100">
                <div className="w-14 h-14 rounded-xl bg-gris-50 flex items-center justify-center mb-6 text-azul">
                  {group.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gris-900">{group.title}</h3>
                <p className="text-gris-600">{group.description}</p>
              </div>
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
        background="white"
      />
    </PageTransition>
  );
}
