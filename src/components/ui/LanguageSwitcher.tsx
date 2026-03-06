'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 bg-gris-100 rounded-full p-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
            locale === loc
              ? 'bg-white text-naranja shadow-sm'
              : 'text-gris-500 hover:text-gris-700'
          }`}
          aria-label={loc === 'es' ? 'Cambiar a español' : 'Switch to English'}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
