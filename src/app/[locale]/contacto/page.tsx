import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('contact.title'),
    description: t('contact.description'),
  };
}

export default async function ContactoPage() {
  const t = await getTranslations('contact');
  const tCommon = await getTranslations('common');

  return (
    <>
      {/* Hero - Con los 4 colores */}
      <section className="bg-gradient-to-br from-gris-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-16 w-64 h-64 bg-naranja-muted rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-8 left-8 w-56 h-56 bg-lima-muted rounded-full blur-3xl opacity-50" />
          <div className="absolute top-28 left-1/3 w-44 h-44 bg-azul-muted rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-16 right-1/4 w-48 h-48 bg-terracota-muted rounded-full blur-3xl opacity-30" />
        </div>
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <span className="badge badge-naranja mb-4">{t('hero.badge')}</span>
            <h1 className="mb-6">{t('hero.title')}</h1>
            <p className="text-lg text-gris-600">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* CTA de Email Directo */}
            <div>
              <h2 className="text-xl font-semibold mb-6">{t('form.title')}</h2>

              {/* Card principal de email */}
              <div className="bg-gradient-to-br from-naranja/10 to-lima/10 rounded-2xl p-8 mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-naranja/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-naranja" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gris-800 mb-2">somoscoloresdelmundo@gmail.com</h3>
                  <p className="text-gris-600 mb-6">{t('info.emailResponse')}</p>
                  <a
                    href="mailto:somoscoloresdelmundo@gmail.com"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {tCommon('sendMessage')}
                  </a>
                </div>
              </div>

              {/* Opciones de contacto rápido */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="mailto:somoscoloresdelmundo@gmail.com?subject=Quiero%20ser%20voluntario/a"
                  className="card hover:border-azul hover:shadow-md transition-all text-center p-4"
                >
                  <div className="w-10 h-10 bg-azul/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-azul" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gris-700">{t('form.subjectOptions.volunteer')}</span>
                </a>
                <a
                  href="mailto:somoscoloresdelmundo@gmail.com?subject=Quiero%20participar%20en%20proyectos"
                  className="card hover:border-lima hover:shadow-md transition-all text-center p-4"
                >
                  <div className="w-10 h-10 bg-lima/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-lima-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gris-700">{t('form.subjectOptions.participate')}</span>
                </a>
                <a
                  href="mailto:somoscoloresdelmundo@gmail.com?subject=Propuesta%20de%20colaboraci%C3%B3n"
                  className="card hover:border-naranja hover:shadow-md transition-all text-center p-4"
                >
                  <div className="w-10 h-10 bg-naranja/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-naranja" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gris-700">{t('form.subjectOptions.collaboration')}</span>
                </a>
                <a
                  href="mailto:somoscoloresdelmundo@gmail.com?subject=B%C3%BAsqueda%20de%20partners%20Erasmus%2B"
                  className="card hover:border-terracota hover:shadow-md transition-all text-center p-4"
                >
                  <div className="w-10 h-10 bg-terracota/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-terracota" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gris-700">{t('form.subjectOptions.partner')}</span>
                </a>
              </div>
            </div>

            {/* Información de contacto */}
            <div>
              <h2 className="text-xl font-semibold mb-6">{t('info.title')}</h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-naranja/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-naranja" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('info.email')}</h3>
                      <a
                        href="mailto:somoscoloresdelmundo@gmail.com"
                        className="text-naranja hover:text-naranja-dark"
                      >
                        somoscoloresdelmundo@gmail.com
                      </a>
                      <p className="text-sm text-gris-500 mt-1">
                        {t('info.emailResponse')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-lima/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-lima-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('info.location')}</h3>
                      <p className="text-gris-700">
                        {t('info.address')}<br />
                        {t('info.addressLine2')}<br />
                        {t('info.addressLine3')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Redes sociales */}
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-terracota/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-terracota" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{t('info.followUs')}</h3>
                      <div className="flex gap-4">
                        <a
                          href="https://www.facebook.com/profile.php?id=61584137712755"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gris-100 rounded-full flex items-center justify-center text-gris-600 hover:bg-naranja hover:text-white transition-colors"
                          aria-label="Facebook"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                          </svg>
                        </a>
                        <a
                          href="https://www.instagram.com/coloresdelmundo__"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gris-100 rounded-full flex items-center justify-center text-gris-600 hover:bg-naranja hover:text-white transition-colors"
                          aria-label="Instagram"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card destacada para Partners - PIF */}
                <div className="card bg-gradient-to-br from-lima-bg to-naranja-bg border-lima/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-lima rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 text-lima-dark">{t('partner.title')}</h3>
                      <p className="text-sm text-gris-600 mb-3">
                        {t('partner.description')}
                      </p>
                      <Link
                        href="/pif"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-lima-dark hover:text-lima transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {t('partner.link')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa o imagen de ubicación */}
      <section className="bg-gris-100">
        <div className="container py-12">
          <div className="bg-white rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">{t('map.title')}</h2>
            <p className="text-gris-600 mb-6">
              {t('map.description')}
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://maps.google.com/?q=Paseo+Rosa+de+los+Vientos+39,+46730+Gandia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {tCommon('viewOnGoogleMaps')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
