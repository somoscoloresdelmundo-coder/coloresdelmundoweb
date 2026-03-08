'use client';

import { ReactNode } from 'react';
import { PageTransitionProvider } from './PageTransition';

interface ImmersiveProviderProps {
  children: ReactNode;
}

/**
 * Provider simplificado para mejor rendimiento
 * - Eliminado Lenis (causaba MutationObserver loop)
 * - Eliminado CustomCursor (pesado en móviles)
 * - Eliminado TransitionOverlay (requiere Framer Motion pesado)
 * - Solo mantiene PageTransition con CSS puro
 */
export function ImmersiveProvider({ children }: ImmersiveProviderProps) {
  return <PageTransitionProvider>{children}</PageTransitionProvider>;
}
