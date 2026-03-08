'use client';

import React, { type ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Componente ligero que envuelve el contenido de cada página
 * Usa CSS animations en lugar de Framer Motion para mejor rendimiento
 */
export function PageTransition({
  children,
  className = '',
}: PageTransitionProps): React.JSX.Element {
  return (
    <div
      className={`animate-fadeIn ${className}`}
      style={{
        animation: 'fadeIn 0.3s ease-out forwards',
      }}
    >
      {children}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
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
