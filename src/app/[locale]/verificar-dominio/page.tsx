import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections';
import { PageTransition } from '@/components/providers/PageTransition';
import { WaveDivider, DIVIDER_COLORS, MagneticElement } from '@/components/immersive';
import { MotionReveal } from '@/components/animations';
import {
  IconContainer,
  ShieldCheckIcon,
  DocumentIcon,
  GlobeIcon,
  LocationIcon,
  HashIcon,
} from '@/components/ui';
import { CONTACT, INSTITUTIONAL } from '@/config/constants';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('verifyDomain.title'),
    description: t('verifyDomain.description'),
    robots: { index: false, follow: true },
  };
}

export default async function VerifyDomainPage() {
  const t = await getTranslations('verifyDomain');
  const tCommon = await getTranslations('common');

  const dataRows = [
    { label: t('fields.legalName'), value: INSTITUTIONAL.LEGAL_NAME_FULL },
    { label: t('fields.commercialName'), value: INSTITUTIONAL.LEGAL_NAME },
    { label: t('fields.cif'), value: INSTITUTIONAL.CIF },
    { label: t('fields.registryNumber'), value: INSTITUTIONAL.REGISTRY_NUMBER },
    { label: t('fields.oid'), value: INSTITUTIONAL.OID },
    { label: t('fields.foundingYear'), value: String(INSTITUTIONAL.FOUNDING_YEAR) },
    { label: t('fields.address'), value: INSTITUTIONAL.ADDRESS },
    { label: t('fields.email'), value: CONTACT.EMAIL },
    { label: t('fields.domain'), value: 'coloresdelmundo.org' },
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

      {/* Declaración de titularidad */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <MotionReveal animation="fadeUp">
            <div className="bg-gradient-to-br from-azul-muted/40 to-white rounded-3xl p-8 md:p-12 border border-azul/10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <IconContainer color="azul" size="lg" rounded="xl">
                  <ShieldCheckIcon className="w-6 h-6 text-azul" />
                </IconContainer>
                <h2 className="text-2xl font-bold text-gris-900">
                  {t('ownership.title')}
                </h2>
              </div>
              <p className="text-gris-700 leading-relaxed mb-4">
                {t('ownership.p1', { domain: 'coloresdelmundo.org', org: INSTITUTIONAL.LEGAL_NAME_FULL })}
              </p>
              <p className="text-gris-700 leading-relaxed">
                {t('ownership.p2', { cif: INSTITUTIONAL.CIF, registry: INSTITUTIONAL.REGISTRY_NUMBER })}
              </p>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Tabla de datos verificables */}
      <section className="section bg-gris-50">
        <div className="container max-w-4xl">
          <MotionReveal animation="fadeUp">
            <h2 className="text-2xl font-bold text-gris-900 mb-2">
              {t('data.title')}
            </h2>
            <p className="text-gris-600 mb-8">{t('data.subtitle')}</p>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gris-100">
              <dl className="divide-y divide-gris-100">
                {dataRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 px-6 py-4 hover:bg-gris-50/50 transition-colors"
                  >
                    <dt className="text-sm font-semibold text-gris-500 uppercase tracking-wide">
                      {row.label}
                    </dt>
                    <dd className="md:col-span-2 text-gris-900 font-medium break-words">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Verificación cruzada en registros oficiales */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <MotionReveal animation="fadeUp">
            <h2 className="text-2xl font-bold text-gris-900 mb-2">
              {t('crossCheck.title')}
            </h2>
            <p className="text-gris-600 mb-8">{t('crossCheck.subtitle')}</p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="card hover:shadow-md transition-shadow">
                <IconContainer color="azul" size="lg" rounded="xl" className="mb-4">
                  <DocumentIcon className="w-6 h-6 text-azul" />
                </IconContainer>
                <h3 className="font-semibold mb-2">{t('crossCheck.registry.title')}</h3>
                <p className="text-sm text-gris-600 mb-3">
                  {t('crossCheck.registry.description', { registry: INSTITUTIONAL.REGISTRY_NUMBER })}
                </p>
              </div>

              <div className="card hover:shadow-md transition-shadow">
                <IconContainer color="lima" size="lg" rounded="xl" className="mb-4">
                  <HashIcon className="w-6 h-6 text-lima-dark" />
                </IconContainer>
                <h3 className="font-semibold mb-2">{t('crossCheck.tax.title')}</h3>
                <p className="text-sm text-gris-600 mb-3">
                  {t('crossCheck.tax.description', { cif: INSTITUTIONAL.CIF })}
                </p>
              </div>

              <div className="card hover:shadow-md transition-shadow">
                <IconContainer color="naranja" size="lg" rounded="xl" className="mb-4">
                  <GlobeIcon className="w-6 h-6 text-naranja" />
                </IconContainer>
                <h3 className="font-semibold mb-2">{t('crossCheck.salto.title')}</h3>
                <p className="text-sm text-gris-600 mb-3">
                  {t('crossCheck.salto.description', { oid: INSTITUTIONAL.OID })}
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Contacto para verificación */}
      <section className="section bg-gris-50">
        <div className="container max-w-4xl">
          <MotionReveal animation="fadeUp">
            <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm border border-gris-100">
              <IconContainer
                color="terracota"
                size="lg"
                rounded="xl"
                className="mx-auto mb-4"
              >
                <LocationIcon className="w-6 h-6 text-terracota" />
              </IconContainer>
              <h2 className="text-xl font-semibold mb-3">{t('contact.title')}</h2>
              <p className="text-gris-600 mb-6 max-w-xl mx-auto">
                {t('contact.description')}
              </p>
              <MagneticElement className="inline-block">
                <a
                  href={`mailto:${CONTACT.EMAIL}?subject=${encodeURIComponent(
                    t('contact.emailSubject')
                  )}`}
                  className="btn-primary"
                >
                  {CONTACT.EMAIL}
                </a>
              </MagneticElement>
              <p className="text-xs text-gris-400 mt-6">{t('contact.note')}</p>
            </div>
          </MotionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
