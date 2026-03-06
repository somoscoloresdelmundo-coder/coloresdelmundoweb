'use client';

import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  height?: number;
  position?: 'top' | 'bottom';
  showPercentage?: boolean;
}

/**
 * Indicador de progreso de scroll con gradiente de los 4 colores institucionales
 * Usa CSS scroll-driven animations cuando está disponible
 */
export default function ScrollProgress({
  height = 4,
  position = 'top',
  showPercentage = false,
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [supportsScrollTimeline, setSupportsScrollTimeline] = useState(false);

  useEffect(() => {
    // Verificar soporte de CSS scroll-timeline
    setSupportsScrollTimeline(CSS.supports('animation-timeline', 'scroll()'));

    // Si el navegador soporta scroll-timeline, usamos CSS puro
    if (CSS.supports('animation-timeline', 'scroll()')) {
      return;
    }

    // Fallback con JavaScript
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className={`scroll-progress ${supportsScrollTimeline ? '' : 'no-css-scroll'}`}
        style={{
          height: `${height}px`,
          [position]: 0,
          transform: supportsScrollTimeline ? undefined : `scaleX(${progress / 100})`,
        }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso de lectura"
      />
      {showPercentage && (
        <div
          className="fixed right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold shadow-md z-50"
          style={{ [position]: height + 8 }}
        >
          <span className="text-gradient-4colors">{Math.round(progress)}%</span>
        </div>
      )}
    </>
  );
}
