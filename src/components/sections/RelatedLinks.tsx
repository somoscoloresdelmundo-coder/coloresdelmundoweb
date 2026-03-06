import { Link } from '@/i18n/navigation';
import { Pathnames } from '@/i18n/routing';

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
  const colors = ['azul', 'lima', 'naranja', 'terracota'];

  return (
    <section className="py-12 bg-gris-50 border-t border-gris-100">
      <div className="container">
        <p className="text-sm text-gris-500 uppercase tracking-wider mb-6">{title}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link, index) => {
            const color = colors[index % colors.length];
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-4 p-4 bg-white rounded-xl border border-gris-100 hover:border-${color} hover:shadow-sm transition-all`}
              >
                <div className={`w-10 h-10 rounded-lg bg-${color}-muted/40 flex items-center justify-center flex-shrink-0 group-hover:bg-${color} transition-colors`}>
                  <svg className={`w-5 h-5 text-${color}-dark group-hover:text-white transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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
