'use client';

import Lenis from 'lenis';
import type { LenisOptions } from 'lenis';

/**
 * Configuracion optimizada de Lenis para smooth scroll
 * Integrado con GSAP ScrollTrigger
 */

// Detectar si es dispositivo movil
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
};

// Detectar si el usuario prefiere movimiento reducido
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Determinar si Lenis debe estar activo
export const shouldEnableLenis = (): boolean => {
  // Desactivar si prefiere movimiento reducido
  if (prefersReducedMotion()) return false;

  // Desactivar en moviles si hay problemas de performance
  // Puedes cambiar esto a true si quieres habilitar en moviles
  if (isMobile()) return false;

  return true;
};

// Opciones por defecto de Lenis
export const defaultLenisOptions: LenisOptions = {
  // Duracion del scroll suave (en segundos)
  duration: 1.2,

  // Funcion de easing personalizada
  // Easing exponencial que se siente natural
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

  // Orientacion del scroll
  orientation: 'vertical',

  // Permite gestos tactiles
  gestureOrientation: 'vertical',

  // Suavidad del scroll - menor = mas suave, mayor = mas responsivo
  smoothWheel: true,

  // Multiplicador para la rueda del mouse
  wheelMultiplier: 1,

  // Multiplicador para touch (moviles)
  touchMultiplier: 2,

  // Permitir scroll infinito
  infinite: false,
};

// Opciones para dispositivos de bajo rendimiento
export const lowPerformanceOptions: LenisOptions = {
  ...defaultLenisOptions,
  duration: 0.8,
  wheelMultiplier: 1.2,
  touchMultiplier: 1.5,
};

// Crear instancia de Lenis con opciones personalizadas
export const createLenis = (options?: Partial<LenisOptions>): Lenis | null => {
  if (typeof window === 'undefined') return null;

  if (!shouldEnableLenis()) {
    return null;
  }

  const finalOptions: LenisOptions = {
    ...defaultLenisOptions,
    ...options,
  };

  return new Lenis(finalOptions);
};

// Tipo para el callback de actualizacion
export type LenisScrollCallback = (lenis: Lenis) => void;

// Exportar tipo de Lenis para uso externo
export type { Lenis, LenisOptions };
