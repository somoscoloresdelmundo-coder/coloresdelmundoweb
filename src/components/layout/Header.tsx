'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigation = [
    { name: t('home'), href: '/' as const },
    { name: t('about'), href: '/sobre-nosotros' as const },
    { name: t('whatWeDo'), href: '/que-hacemos' as const },
    { name: t('projects'), href: '/proyectos' as const },
    { name: t('participate'), href: '/participa' as const },
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
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gris-100'
          : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
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
            href="/pif"
            className="ml-2 px-4 py-2 bg-lima-bg text-lima-dark font-semibold text-sm rounded-lg border border-lima/30 hover:bg-lima hover:text-white hover:border-lima transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {t('partners')}
          </Link>
          <Link href="/contacto" className="btn-primary ml-2">
            {t('contact')}
          </Link>
          <div className="ml-3">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="p-2.5 text-negro hover:text-naranja hover:bg-gris-100 rounded-lg transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileMenuOpen}
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
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 border-t border-gris-100' : 'max-h-0'
        }`}
      >
        <div className="container py-4 flex flex-col gap-2 bg-white">
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
            href="/pif"
            className="py-3 px-4 rounded-lg bg-lima-bg text-lima-dark font-semibold flex items-center gap-2 hover:bg-lima hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {t('partners')} - {t('pif')}
          </Link>
          <Link
            href="/contacto"
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
