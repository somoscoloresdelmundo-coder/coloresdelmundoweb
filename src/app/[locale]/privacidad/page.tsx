import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections';
import { PageTransition } from '@/components/providers/PageTransition';
import { WaveDivider, DIVIDER_COLORS } from '@/components/immersive';
import { MotionReveal } from '@/components/animations';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('privacy.title'),
    description: t('privacy.description'),
  };
}

type Section = { title: string; paragraphs: string[] };

export default async function PrivacyPage() {
  const t = await getTranslations('privacy');

  const sections: Section[] = [
    {
      title: t('controller.title'),
      paragraphs: [
        `${t('controller.company')} · ${t('controller.cif')}`,
        t('controller.address'),
        t('controller.email'),
      ],
    },
    { title: t('data.title'), paragraphs: [t('data.p1'), t('data.p2')] },
    { title: t('purpose.title'), paragraphs: [t('purpose.p1')] },
    { title: t('lawfulness.title'), paragraphs: [t('lawfulness.p1')] },
    { title: t('recipients.title'), paragraphs: [t('recipients.p1')] },
    { title: t('retention.title'), paragraphs: [t('retention.p1')] },
    {
      title: t('rights.title'),
      paragraphs: [t('rights.p1'), t('rights.p2'), t('rights.p3')],
    },
  ];

  return (
    <PageTransition>
      <HeroSection
        badge={{ text: t('hero.badge'), color: 'azul' }}
        title={t('hero.title')}
        description={t('hero.description')}
        background="shapes"
        backgroundVariant="scattered"
      />

      <WaveDivider
        fromColor="#ffffff"
        toColor={DIVIDER_COLORS.blue}
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
