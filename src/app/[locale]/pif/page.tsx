import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import DownloadPIFButton from '@/components/ui/DownloadPIFButton';
import { getTranslations } from 'next-intl/server';
import { MobilityIcon, ArtIcon, EducationIcon, DigitalIcon, UsersIcon, YouthWorkersIcon, EducatorIcon, GlobeIcon, ShieldCheckIcon, CheckFilledIcon, CheckCircleIcon, BookIcon, HeartIcon, UserIcon, EmailIcon, InstagramIcon, ArrowRightIcon } from '@/components/ui';
import { colorClasses } from '@/types/ui';
import { CONTACT, SOCIAL, INSTITUTIONAL, COLOR_CYCLE, LINES_OF_ACTION } from '@/config/constants';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('pif.title'),
    description: t('pif.description'),
  };
}

// Map line keys to centralized icons
const lineIcons: Record<string, React.ReactNode> = {
  mobility: <MobilityIcon />,
  art: <ArtIcon />,
  education: <EducationIcon />,
  digital: <DigitalIcon />,
};

// Map target group keys to centralized icons
const targetGroupIcons: Record<string, React.ReactNode> = {
  youngPeople: <UsersIcon className="w-6 h-6" />,
  youthWorkers: <YouthWorkersIcon />,
  educators: <EducatorIcon />,
  migrants: <GlobeIcon className="w-6 h-6" />,
  disadvantaged: <ShieldCheckIcon />,
};

export default async function PIFPage() {
  const t = await getTranslations('pif');
  const tCommon = await getTranslations('common');

  const targetGroups = [
    { key: 'youngPeople', color: 'azul' as const },
    { key: 'youthWorkers', color: 'lima' as const },
    { key: 'educators', color: 'naranja' as const },
    { key: 'migrants', color: 'terracota' as const },
    { key: 'disadvantaged', color: 'azul' as const },
  ];

  return (
    <>
      {/* Hero with OID */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gris-50 via-white to-azul-muted/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-azul-muted/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-lima-muted/40 rounded-full blur-3xl translate-x-1/2" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-naranja-muted/30 rounded-full blur-3xl translate-y-1/2" />
        </div>

        <div className="container py-12 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="scroll-reveal">
              <span className="badge badge-azul mb-4">{t('hero.badge')}</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-gris-600 mb-6 max-w-lg">{t('hero.description')}</p>
              <div className="flex flex-wrap gap-3">
                <DownloadPIFButton />
                <Link href="/contacto" className="btn-secondary">{tCommon('contact')}</Link>
              </div>
            </div>

            <div className="scroll-reveal" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-naranja/20 to-transparent rounded-bl-full" />
                <div className="text-center mb-6 pb-6 border-b border-gris-100">
                  <p className="text-sm text-gris-400 uppercase tracking-wider mb-2">{t('quickInfo.oid')}</p>
                  <p className="text-5xl md:text-6xl font-black text-naranja tracking-wide">{INSTITUTIONAL.OID}</p>
                  <div className="flex justify-center gap-2 mt-4">
                    <span className="w-3 h-3 rounded-full bg-azul" />
                    <span className="w-3 h-3 rounded-full bg-lima" />
                    <span className="w-3 h-3 rounded-full bg-naranja" />
                    <span className="w-3 h-3 rounded-full bg-terracota" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gris-50 rounded-xl p-4">
                    <p className="text-xs text-gris-400 uppercase tracking-wider">{t('quickInfo.type')}</p>
                    <p className="font-semibold text-gris-800">{t('quickInfo.typeValue')}</p>
                  </div>
                  <div className="bg-gris-50 rounded-xl p-4">
                    <p className="text-xs text-gris-400 uppercase tracking-wider">{t('quickInfo.year')}</p>
                    <p className="font-semibold text-gris-800">{t('quickInfo.yearValue')}</p>
                  </div>
                  <div className="col-span-2 bg-azul-muted/30 rounded-xl p-4">
                    <p className="text-xs text-gris-400 uppercase tracking-wider">{t('quickInfo.location')}</p>
                    <p className="font-semibold text-gris-800">{t('quickInfo.locationValue')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Profile & Mission/Vision */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 scroll-reveal">
              <span className="badge badge-lima mb-4">{t('organization.badge')}</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('organization.title')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <p className="text-gris-600 leading-relaxed">{t('organization.description')}</p>
                <p className="text-gris-600 leading-relaxed">{t('organization.fullDescription')}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div className="bg-azul-muted/30 rounded-2xl p-8 scroll-reveal">
                <div className="w-12 h-12 bg-azul/20 rounded-xl flex items-center justify-center mb-4">
                  <MobilityIcon className="w-6 h-6 text-azul" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('missionVision.mission.title')}</h3>
                <p className="text-gris-600">{t('missionVision.mission.description')}</p>
              </div>
              <div className="bg-lima-muted/30 rounded-2xl p-8 scroll-reveal" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 bg-lima/20 rounded-xl flex items-center justify-center mb-4">
                  <EducationIcon className="w-6 h-6 text-lima-dark" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('missionVision.vision.title')}</h3>
                <p className="text-gris-600">{t('missionVision.vision.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lines of Action */}
      <section className="section bg-gris-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-reveal">
              <span className="badge badge-naranja mb-4">{t('linesOfAction.badge')}</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('linesOfAction.title')}</h2>
              <p className="text-gris-600 max-w-2xl mx-auto">{t('linesOfAction.description')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {LINES_OF_ACTION.map((line, index) => {
                const colors = colorClasses[line.color];
                return (
                  <div
                    key={line.key}
                    className={`bg-white rounded-2xl p-6 border-l-4 ${colors.border} shadow-sm hover:shadow-md transition-shadow scroll-reveal`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.bgMuted40} ${colors.textDark}`}>
                        {lineIcons[line.key]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2">{t(`linesOfAction.${line.key}.title`)}</h3>
                        <p className="text-sm text-gris-600 mb-4">{t(`linesOfAction.${line.key}.description`)}</p>
                        <div className="flex flex-wrap gap-2">
                          {(t.raw(`linesOfAction.${line.key}.activities`) as string[]).map((activity: string, i: number) => (
                            <span
                              key={i}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full ${colors.bgMuted40} text-gris-700`}
                            >
                              <CheckFilledIcon className={`w-3 h-3 ${colors.text}`} />
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Project Types */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-3 scroll-reveal">
                <span className="badge badge-terracota mb-4">{t('experience.badge')}</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('experience.title')}</h2>
                <p className="text-gris-600 mb-8">{t('experience.description')}</p>

                <h3 className="font-semibold text-gris-800 mb-4">{t('experience.projectTypes.title')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-azul-muted/20 rounded-xl">
                    <div className="w-10 h-10 bg-azul/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MobilityIcon className="w-5 h-5 text-azul" />
                    </div>
                    <div>
                      <p className="font-semibold">{t('experience.projectTypes.youthExchanges')}</p>
                      <p className="text-sm text-gris-500">{t('experience.projectTypes.youthExchangesDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-lima-muted/20 rounded-xl">
                    <div className="w-10 h-10 bg-lima/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookIcon className="w-5 h-5 text-lima-dark" />
                    </div>
                    <div>
                      <p className="font-semibold">{t('experience.projectTypes.trainingCourses')}</p>
                      <p className="text-sm text-gris-500">{t('experience.projectTypes.trainingCoursesDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-naranja-muted/20 rounded-xl">
                    <div className="w-10 h-10 bg-naranja/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HeartIcon className="w-5 h-5 text-naranja" />
                    </div>
                    <div>
                      <p className="font-semibold">{t('experience.projectTypes.volunteering')}</p>
                      <p className="text-sm text-gris-500">{t('experience.projectTypes.volunteeringDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 scroll-reveal" style={{ animationDelay: '0.1s' }}>
                <div className="bg-gradient-to-br from-terracota-muted/40 to-naranja-muted/30 rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold text-gris-800 mb-4">{t('experience.roles.title')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {(t.raw('experience.roles.items') as string[]).map((role: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-white/60 rounded-full text-sm font-medium">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center p-8 bg-gris-50 rounded-2xl">
                  <p className="text-6xl font-black text-naranja mb-2">{INSTITUTIONAL.YEARS_EXPERIENCE}+</p>
                  <p className="text-gris-600 font-medium">{t('experience.yearsExperience')}</p>
                  <p className="text-sm text-gris-500">{t('experience.inErasmus')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="section bg-gris-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 scroll-reveal">
              <span className="badge badge-azul mb-4">{t('targetGroups.badge')}</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('targetGroups.title')}</h2>
              <p className="text-gris-600 max-w-2xl mx-auto">{t('targetGroups.description')}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {targetGroups.map((group, index) => {
                const colors = colorClasses[group.color];
                return (
                  <div
                    key={group.key}
                    className={`bg-white rounded-xl p-5 border ${colors.borderMuted} ${colors.hoverBorder} transition-colors scroll-reveal`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colors.bgMuted40} ${colors.textDark}`}>
                      {targetGroupIcons[group.key]}
                    </div>
                    <h3 className="font-semibold mb-1">{t(`targetGroups.${group.key}`)}</h3>
                    <p className="text-sm text-gris-500">{t(`targetGroups.${group.key}Desc`)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* EU Priorities */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <span className="badge badge-azul mb-4">{t('euPriorities.badge')}</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('euPriorities.title')}</h2>
            <p className="text-gris-600 mb-8">{t('euPriorities.description')}</p>

            <div className="flex flex-wrap justify-center gap-3">
              {(t.raw('euPriorities.items') as string[]).map((priority: string, index: number) => {
                const color = COLOR_CYCLE[index % COLOR_CYCLE.length];
                const colors = colorClasses[color];
                return (
                  <span
                    key={index}
                    className={`inline-flex items-center gap-2 px-4 py-2 ${colors.bgMuted40} text-gris-800 rounded-full font-medium`}
                  >
                    <CheckCircleIcon className={`w-4 h-4 ${colors.text}`} />
                    {priority}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Opportunities */}
      <section className="section bg-gris-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 scroll-reveal">
              <span className="badge badge-terracota mb-4">{t('collaboration.badge')}</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('collaboration.title')}</h2>
              <p className="text-gris-600 max-w-2xl mx-auto">{t('collaboration.description')}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(t.raw('collaboration.items') as Array<{ name: string; desc: string }>).map((item, index: number) => {
                const color = COLOR_CYCLE[index % COLOR_CYCLE.length];
                const colors = colorClasses[color];
                return (
                  <div
                    key={index}
                    className={`bg-white rounded-xl p-5 border-b-4 ${colors.border} hover:shadow-lg transition-shadow scroll-reveal`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="font-bold mb-2">{item.name}</h3>
                    <p className="text-sm text-gris-500">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-gris-600 mt-8 font-medium scroll-reveal">
              {t('collaboration.cta')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Full Details */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="scroll-reveal">
                <span className="badge badge-lima mb-4">{t('contact.badge')}</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('contact.title')}</h2>
                <p className="text-gris-600 mb-6">{t('contact.description')}</p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gris-50 rounded-xl">
                    <div className="w-10 h-10 bg-lima/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-5 h-5 text-lima-dark" />
                    </div>
                    <div>
                      <p className="text-xs text-gris-400 uppercase tracking-wider">{t('contact.contactPerson')}</p>
                      <p className="font-semibold">{t('contact.contactPersonValue')}</p>
                      <p className="text-sm text-gris-500">{t('contact.contactPersonRole')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gris-50 rounded-xl">
                    <div className="w-10 h-10 bg-azul/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-5 h-5 text-azul" />
                    </div>
                    <div>
                      <p className="text-xs text-gris-400 uppercase tracking-wider">{t('contact.legalRep')}</p>
                      <p className="font-semibold">{t('contact.legalRepValue')}</p>
                      <p className="text-sm text-gris-500">{t('contact.legalRepRole')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-naranja-muted/30 rounded-xl">
                    <div className="w-10 h-10 bg-naranja/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <EmailIcon className="w-5 h-5 text-naranja" />
                    </div>
                    <div>
                      <p className="text-xs text-gris-400 uppercase tracking-wider">{t('contact.email')}</p>
                      <a href={CONTACT.EMAIL_HREF} className="font-semibold text-naranja hover:underline">
                        {CONTACT.EMAIL}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="scroll-reveal" style={{ animationDelay: '0.1s' }}>
                <div className="bg-gris-50 rounded-2xl p-6 h-full">
                  <h3 className="font-bold text-lg mb-6 pb-4 border-b border-gris-200">{t('details.institutionalTitle')}</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.legalName')}</p>
                        <p className="font-medium text-sm">{t('details.legalNameValue')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.type')}</p>
                        <p className="font-medium text-sm">{t('details.typeValue')}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.address')}</p>
                        <p className="font-medium text-sm">{t('details.addressValue')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.city')}</p>
                        <p className="font-medium text-sm">{t('details.cityValue')}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.country')}</p>
                        <p className="font-medium text-sm">{t('details.countryValue')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.foundingYear')}</p>
                        <p className="font-medium text-sm">{t('details.foundingYearValue')}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.staff')}</p>
                        <p className="font-medium text-sm">{t('details.staffValue')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gris-400 uppercase tracking-wider">{t('details.website')}</p>
                        <p className="font-medium text-sm text-naranja">{t('details.websiteValue')}</p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gris-200">
                      <p className="text-xs text-gris-400 uppercase tracking-wider mb-2">{t('contact.socialMedia')}</p>
                      <a
                        href={SOCIAL.INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-sm font-medium hover:bg-gris-100 transition-colors"
                      >
                        <InstagramIcon className="w-5 h-5 text-terracota" />
                        {t('contact.instagram')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="section bg-gradient-to-r from-naranja via-terracota to-naranja">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white scroll-reveal">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('download.title')}</h2>
            <p className="text-white/90 mb-6">{t('download.description')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <DownloadPIFButton />
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                {tCommon('contact')}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-sm text-white/70 mt-4">{t('download.tip')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
