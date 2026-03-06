import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { HeroSection, GridSection, QuoteSection, CTASection, RelatedLinks } from '@/components/sections';
import { FeatureCard, TeamCard, ValueCard } from '@/components/cards';
import { ColorVariant } from '@/types/ui';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('about.title'),
    description: t('about.description'),
  };
}

// Iconos para misión y visión
const MissionIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const VisionIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

// Datos del equipo
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
      {/* Hero - Usando HeroSection */}
      <HeroSection
        badge={{ text: t('hero.badge'), color: 'naranja' }}
        title={t('hero.title')}
        description={t('hero.description')}
        background="shapes"
        backgroundVariant="corners"
      />

      {/* Misión y Visión - Usando GridSection + FeatureCard */}
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

      {/* Cita destacada - Usando QuoteSection */}
      <QuoteSection quote={t('quote')} />

      {/* Nuestra Historia - Custom porque tiene layout especial */}
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

      {/* Equipo - Usando GridSection + TeamCard */}
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

      {/* Habilidades - Usando GridSection + ValueCard */}
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

      {/* Datos institucionales - Custom (tabla de datos) */}
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
                  <dd className="text-negro">E10413227</dd>
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
                    <a href="mailto:somoscoloresdelmundo@gmail.com" className="text-naranja">
                      somoscoloresdelmundo@gmail.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Usando CTASection */}
      <CTASection
        title={t('cta.title')}
        description={t('cta.description')}
        primaryButton={{ text: tCommon('contactUs'), href: '/contacto', icon: false }}
        background="gray"
      />

      {/* Navegación contextual */}
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
