'use client';

import { ReactNode } from 'react';
import { LenisProvider } from './LenisProvider';
import { PageTransitionProvider } from './PageTransition';
import { CursorProvider, CustomCursor, TransitionOverlayProvider } from '@/components/immersive';

interface ImmersiveProviderProps {
  children: ReactNode;
  /** Desactivar transiciones de pagina */
  disablePageTransitions?: boolean;
  /** Desactivar overlay de transicion */
  disableTransitionOverlay?: boolean;
}

/**
 * Provider combinado para todas las funcionalidades inmersivas
 * - Smooth scroll con Lenis
 * - Cursor personalizado
 * - Transiciones de pagina fluidas
 * - Overlay de transicion con efectos visuales
 */
export function ImmersiveProvider({
  children,
  disablePageTransitions = false,
  disableTransitionOverlay = false,
}: ImmersiveProviderProps) {
  // Construir el arbol de providers condicionalmente
  let content = <>{children}</>;

  // Envolver con PageTransitionProvider si esta habilitado
  if (!disablePageTransitions) {
    content = <PageTransitionProvider>{content}</PageTransitionProvider>;
  }

  // Envolver con TransitionOverlayProvider si esta habilitado
  if (!disableTransitionOverlay) {
    content = (
      <TransitionOverlayProvider defaultEffect="curtain">
        {content}
      </TransitionOverlayProvider>
    );
  }

  return (
    <LenisProvider>
      <CursorProvider defaultColor="blue">
        <CustomCursor />
        {content}
      </CursorProvider>
    </LenisProvider>
  );
}
