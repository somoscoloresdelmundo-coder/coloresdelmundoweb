import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { HeroSection, GridSection, QuoteSection, CTASection, RelatedLinks } from '@/components/sections';
import { FeatureCard, TeamCard, ValueCard } from '@/components/cards';
import { MissionIcon, VisionIcon } from '@/components/ui';
import { ColorVariant } from '@/types/ui';
import { CONTACT, INSTITUTIONAL } from '@/config/constants';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('about.title'),
    description: t('about.description'),
  };
}

const equipo: Array<{ nombre: string; rol: string | null; color: ColorVariant }> = [
  { nombre: 'Fernando Licona-Romano Rodriguez', rol: 'president', color: 'azul' },
  { nombre: 'Eliana Colzani', rol: null, color: 'terracota' },
  { nombre: 'Omar Franco Trillo', rol: null, color: 'lima' },
  { nombre: 'Lucia Ojeda Frissia', rol: null, color: 'naranja' },
];

export default async function SobreNosotrosPage() {
  const t = await getTranslations('about');
  const tCommon = await getTranslations('common');

  const habilidades = [
    { key: 'international', titulo: t('skills.international.title'), descripcion: t('skills.international.description') },
    { key: 'facilitation', titulo: t('skills.facilitation.title'), descripcion: t('skills.facilitation.description') },
    { key: 'creative', titulo: t('skills.creative.title'), descripcion: t('skills.creative.description') },
    { key: 'digital', titulo: t('skills.digital.title'), descripcion: t('skills.digital.description') },
  ];

  return (
    <>
      <HeroSection
        badge={{ text: t('hero.badge'), color: 'naranja' }}
        title={t('hero.title')}
        description={t('hero.description')}
        background="shapes"
        backgroundVariant="corners"
      />

      <GridSection columns={2} background="white" gap="lg">
        <FeatureCard
          icon={<MissionIcon />}
          title={t('mission.title')}
          description={t('mission.description')}
          color="naranja"
          variant="bordered"
        />
        <FeatureCard
          icon={<VisionIcon />}
          title={t('vision.title')}
          description={t('vision.description')}
          color="lima"
          variant="bordered"
        />
      </GridSection>

      <QuoteSection quote={t('quote')} />

      <section className="section bg-gris-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge badge-terracota mb-4">{t('history.badge')}</span>
              <h2 className="mb-6">{t('history.title')}</h2>
              <p className="text-gris-600 mb-4">{t('history.p1')}</p>
              <p className="text-gris-600 mb-4">{t('history.p2')}</p>
              <p className="text-gris-600">{t('history.p3')}</p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/sellocoloredelmundo.png"
                alt="Sello Colores del Mundo"
                width={300}
                height={200}
                className="opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      <GridSection
        badge={{ text: t('team.badge'), color: 'lima' }}
        title={t('team.title')}
        description={t('team.description')}
        columns={4}
        background="white"
        className="max-w-4xl mx-auto"
      >
        {equipo.map((miembro) => (
          <TeamCard
            key={miembro.nombre}
            name={miembro.nombre}
            role={miembro.rol ? t('team.president') : undefined}
            color={miembro.color}
          />
        ))}
      </GridSection>

      <GridSection
        badge={{ text: t('skills.badge'), color: 'naranja' }}
        title={t('skills.title')}
        columns={4}
        background="gray"
      >
        {habilidades.map((hab, index) => (
          <ValueCard
            key={hab.key}
            number={`0${index + 1}`}
            title={hab.titulo}
            description={hab.descripcion}
            color="naranja"
          />
        ))}
      </GridSection>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="badge badge-lima mb-4">{t('institutional.badge')}</span>
              <h2>{t('institutional.title')}</h2>
            </div>

            <div className="card">
              <dl className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.legalName')}</dt>
                  <dd className="text-negro">{t('institutional.legalNameValue')}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">OID</dt>
                  <dd className="text-negro">{INSTITUTIONAL.OID}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.type')}</dt>
                  <dd className="text-negro">{t('institutional.typeValue')}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gris-100">
                  <dt className="font-medium text-gris-600">{t('institutional.location')}</dt>
                  <dd className="text-negro">{t('institutional.locationValue')}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="font-medium text-gris-600">Email</dt>
                  <dd>
                    <a href={CONTACT.EMAIL_HREF} className="text-naranja">
                      {CONTACT.EMAIL}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={t('cta.title')}
        description={t('cta.description')}
        primaryButton={{ text: tCommon('contactUs'), href: '/contacto', icon: false }}
        background="gray"
      />

      <RelatedLinks
        title={tCommon('youMightAlsoLike')}
        links={[
          { href: '/que-hacemos', title: tCommon('whatWeDo'), description: tCommon('discoverOurPrograms') },
          { href: '/proyectos', title: tCommon('projects'), description: tCommon('seeOurExperience') },
          { href: '/participa', title: tCommon('participate'), description: tCommon('joinOurTeam') },
        ]}
      />
    </>
  );
}
