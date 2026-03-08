'use client';

import React, { type ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Componente ligero que envuelve el contenido de cada página
 * Sin animaciones para evitar problemas de renderizado
 */
export function PageTransition({
  children,
  className = '',
}: PageTransitionProps): React.JSX.Element {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Provider simplificado (ya no necesario pero mantenemos por compatibilidad)
export function PageTransitionProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  return <>{children}</>;
}

// Alias para compatibilidad
export const PageWrapper = PageTransition;
