'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { PartnersIcon } from '@/components/ui/Icon';
import { ROUTES } from '@/config/routes';

export default function Header() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigation = [
    { name: t('home'), href: ROUTES.HOME },
    { name: t('about'), href: ROUTES.ABOUT },
    { name: t('whatWeDo'), href: ROUTES.WHAT_WE_DO },
    { name: t('projects'), href: ROUTES.PROJECTS },
    { name: t('participate'), href: ROUTES.PARTICIPATE },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gris-900/95 backdrop-blur-md shadow-sm border-b border-gris-100 dark:border-gris-800'
          : 'bg-white/80 dark:bg-gris-900/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <nav className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 no-underline transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/images/logo.png"
            alt="Colores del Mundo"
            width={140}
            height={56}
            sizes="140px"
            className={`transition-all duration-300 ${scrolled ? 'h-12' : 'h-14'} w-auto`}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link px-4 py-2 rounded-lg"
            >
              {item.name}
            </Link>
          ))}
          {/* PIF Button - Destacado para Partners */}
          <Link
            href={ROUTES.PIF}
            className="ml-2 px-4 py-2 bg-lima-bg text-lima-dark dark:bg-lima/20 dark:text-lima font-semibold text-sm rounded-lg border border-lima/30 hover:bg-lima hover:text-white hover:border-lima focus:outline-none focus:ring-2 focus:ring-lima/50 focus:ring-offset-2 transition-all duration-300 flex items-center gap-2"
          >
            <PartnersIcon className="w-4 h-4" aria-hidden="true" />
            {t('partners')}
          </Link>
          <Link href={ROUTES.CONTACT} className="btn-primary ml-2">
            {t('contact')}
          </Link>
          <div className="ml-3 flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            type="button"
            className="p-2.5 text-negro hover:text-naranja hover:bg-gris-100 dark:text-white dark:hover:bg-gris-800 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-naranja/50 focus:ring-offset-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? 'top-[11px] rotate-45' : 'top-1'
                }`}
              />
              <span
                className={`absolute left-0 top-[11px] w-6 h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? 'top-[11px] -rotate-45' : 'top-[19px]'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        role="region"
        aria-label={t('mobileNav')}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 border-t border-gris-100 dark:border-gris-800' : 'max-h-0'
        }`}
      >
        <div className="container py-4 flex flex-col gap-2 bg-white dark:bg-gris-900">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link py-3 px-4 rounded-lg hover:bg-gris-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {item.name}
            </Link>
          ))}
          {/* PIF Link - Destacado */}
          <Link
            href={ROUTES.PIF}
            className="py-3 px-4 rounded-lg bg-lima-bg text-lima-dark dark:bg-lima/20 dark:text-lima font-semibold flex items-center gap-2 hover:bg-lima hover:text-white focus:outline-none focus:ring-2 focus:ring-lima/50 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <PartnersIcon aria-hidden="true" />
            {t('partners')} - {t('pif')}
          </Link>
          <Link
            href={ROUTES.CONTACT}
            className="btn-primary text-center mt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('contact')}
          </Link>
        </div>
      </div>
    </header>
  );
}
