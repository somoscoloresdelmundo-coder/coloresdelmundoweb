'use client';

import { useTheme } from '@/hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
}

/**
 * Botón para cambiar entre modo claro y oscuro
 * Muestra un ícono de sol/luna con transición suave
 */
export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { toggleTheme, isDark, mounted } = useTheme();

  // Evita hydration mismatch
  if (!mounted) {
    return (
      <button
        className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gris-100 ${className}`}
        aria-label="Cambiar tema"
        disabled
      >
        <span className="w-5 h-5 bg-gris-300 rounded-full animate-pulse" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-10 h-10 rounded-xl flex items-center justify-center
        bg-gris-100 hover:bg-gris-200
        dark:bg-gris-800 dark:hover:bg-gris-700
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-azul/50 focus:ring-offset-2
        ${className}
      `}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      {/* Sol */}
      <svg
        className={`
          w-5 h-5 text-naranja absolute
          transition-all duration-300
          ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
        `}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Luna */}
      <svg
        className={`
          w-5 h-5 text-azul-light absolute
          transition-all duration-300
          ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
        `}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}

export default ThemeToggle;
