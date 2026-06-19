import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections';
import { PageTransition } from '@/components/providers/PageTransition';
import { WaveDivider, DIVIDER_COLORS } from '@/components/immersive';
import { MotionReveal } from '@/components/animations';
import { ShieldCheckIcon } from '@/components/ui';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('legalNotice.title'),
    description: t('legalNotice.description'),
  };
}

type Section = { title: string; paragraphs: string[] };

export default async function LegalNoticePage() {
  const t = await getTranslations('legalNotice');

  const sections: Section[] = [
    {
      title: t('provider.title'),
      paragraphs: [
        t('provider.p1'),
        `${t('provider.company')} · ${t('provider.cif')} · ${t('provider.registry')} · ${t('provider.address')} · ${t('provider.email')}`,
      ],
    },
    { title: t('object.title'), paragraphs: [t('object.p1')] },
    { title: t('ip.title'), paragraphs: [t('ip.p1')] },
    { title: t('use.title'), paragraphs: [t('use.p1'), t('use.p2')] },
    { title: t('law.title'), paragraphs: [t('law.p1')] },
  ];

  return (
    <PageTransition>
      <HeroSection
        badge={{ text: t('hero.badge'), color: 'terracota' }}
        title={t('hero.title')}
        description={t('hero.description')}
        background="shapes"
        backgroundVariant="scattered"
      />

      <WaveDivider
        fromColor="#ffffff"
        toColor={DIVIDER_COLORS.terracotta}
        variant="gentle"
        layers={2}
        height={80}
      />

      <section className="section bg-white">
        <div className="container max-w-3xl">
          <MotionReveal animation="fadeUp">
            <p className="text-sm text-gris-500 mb-10">{t('lastUpdated')}</p>

            <div className="space-y-12">
              {sections.map((section, idx) => (
                <article key={idx}>
                  <div className="flex items-center gap-2 mb-4">
                    {idx === 0 && (
                      <ShieldCheckIcon className="w-5 h-5 text-terracota flex-shrink-0" />
                    )}
                    <h2 className="text-xl font-bold text-gris-900">{section.title}</h2>
                  </div>
                  <div className="space-y-4">
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className="text-gris-700 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
