import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections';
import { PageTransition } from '@/components/providers/PageTransition';
import { WaveDivider, DIVIDER_COLORS } from '@/components/immersive';
import { MotionReveal } from '@/components/animations';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('cookies.title'),
    description: t('cookies.description'),
  };
}

type Section = { title: string; paragraphs: string[] };

export default async function CookiesPage() {
  const t = await getTranslations('cookies');

  const sections: Section[] = [
    { title: t('what.title'), paragraphs: [t('what.p1')] },
    { title: t('types.title'), paragraphs: [t('types.p1'), t('types.p2')] },
    { title: t('thirdParty.title'), paragraphs: [t('thirdParty.p1')] },
    { title: t('management.title'), paragraphs: [t('management.p1')] },
    { title: t('more.title'), paragraphs: [t('more.p1')] },
  ];

  return (
    <PageTransition>
      <HeroSection
        badge={{ text: t('hero.badge'), color: 'lima' }}
        title={t('hero.title')}
        description={t('hero.description')}
        background="shapes"
        backgroundVariant="scattered"
      />

      <WaveDivider
        fromColor="#ffffff"
        toColor={DIVIDER_COLORS.lime}
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
                  <h2 className="text-xl font-bold text-gris-900 mb-4">
                    {section.title}
                  </h2>
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
