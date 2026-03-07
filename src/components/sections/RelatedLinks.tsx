import { Link } from '@/i18n/navigation';
import { Pathnames } from '@/i18n/routing';
import { ChevronRightIcon } from '@/components/ui';
import { colorClasses } from '@/types/ui';
import { COLOR_CYCLE } from '@/config/constants';

interface RelatedLink {
  href: Pathnames;
  title: string;
  description: string;
}

interface RelatedLinksProps {
  title: string;
  links: RelatedLink[];
}

export default function RelatedLinks({ title, links }: RelatedLinksProps) {
  return (
    <section className="py-12 bg-gris-50 border-t border-gris-100">
      <div className="container">
        <p className="text-sm text-gris-500 uppercase tracking-wider mb-6">{title}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link, index) => {
            const colors = colorClasses[COLOR_CYCLE[index % COLOR_CYCLE.length]];
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-4 p-4 bg-white rounded-xl border border-gris-100 ${colors.hoverBorder} hover:shadow-sm transition-all`}
              >
                <div className={`w-10 h-10 rounded-lg ${colors.bgMuted40} flex items-center justify-center flex-shrink-0 ${colors.groupHoverBg} transition-colors`}>
                  <ChevronRightIcon className={`w-5 h-5 ${colors.textDark} group-hover:text-white transition-colors`} />
                </div>
                <div>
                  <p className="font-semibold text-gris-800 group-hover:text-gris-900">{link.title}</p>
                  <p className="text-sm text-gris-500">{link.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
