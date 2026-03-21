'use client';

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'colores-del-mundo-theme';

/**
 * Hook para manejar el tema (light/dark/system)
 * - Persiste la preferencia en localStorage
 * - Respeta prefers-color-scheme del sistema
 * - Aplica data-theme al <html>
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Obtiene el tema del sistema
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Aplica el tema al DOM
  const applyTheme = useCallback((newTheme: Theme) => {
    const resolved = newTheme === 'system' ? getSystemTheme() : newTheme;
    setResolvedTheme(resolved);

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', resolved);
      // También actualiza el meta theme-color para mobile
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content',
          resolved === 'dark' ? '#0D0D0D' : '#FFFFFF'
        );
      }
    }
  }, [getSystemTheme]);

  // Cambia el tema
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newTheme);
    }
    applyTheme(newTheme);
  }, [applyTheme]);

  // Toggle entre light y dark
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

  // Inicialización
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initialTheme = stored || 'system';
    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, [applyTheme]);

  // Escucha cambios en prefers-color-scheme
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme('system');

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    mounted,
    isDark: resolvedTheme === 'dark',
  };
}
