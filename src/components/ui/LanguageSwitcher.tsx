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
    <div className="flex items-center gap-1 bg-gris-100 dark:bg-gris-800 rounded-full p-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-3 py-1.5 min-w-[44px] min-h-[44px] text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-azul/50 focus-visible:ring-offset-2 ${
            locale === loc
              ? 'bg-white dark:bg-gris-700 text-naranja shadow-sm'
              : 'text-gris-500 dark:text-gris-400 hover:text-gris-700 dark:hover:text-gris-200'
          }`}
          aria-label={loc === 'es' ? 'Cambiar a español' : 'Switch to English'}
          aria-current={locale === loc ? 'true' : undefined}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
