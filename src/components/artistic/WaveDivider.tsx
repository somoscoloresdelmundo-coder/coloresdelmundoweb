import { ColorVariant } from '@/types/ui';
import { BACKGROUND_COLORS } from '@/lib/design';

type WaveStyle = 'smooth' | 'sharp' | 'layered' | 'organic';

interface WaveDividerProps {
  color?: ColorVariant | 'white' | 'gray';
  style?: WaveStyle;
  flip?: boolean;
  height?: number;
  animated?: boolean;
  className?: string;
}

const wavePatterns: Record<WaveStyle, string> = {
  smooth: "M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,100 L0,100 Z",
  sharp: "M0,50 L300,20 L600,60 L900,10 L1200,50 L1200,100 L0,100 Z",
  layered: "M0,30 Q300,60 600,30 T1200,30 L1200,100 L0,100 Z",
  organic: "M0,64 C150,30 350,80 500,50 C650,20 850,70 1000,40 C1100,20 1150,50 1200,45 L1200,100 L0,100 Z",
};

/**
 * Divisor ondulado artístico entre secciones
 * Crea una transición visual suave con forma de onda
 */
export default function WaveDivider({
  color = 'white',
  style = 'smooth',
  flip = false,
  height = 80,
  animated = false,
  className = '',
}: WaveDividerProps) {
  const fillColor = BACKGROUND_COLORS[color] || BACKGROUND_COLORS.white;
  const path = wavePatterns[style];

  return (
    <div
      className={`wave-divider ${flip ? 'wave-divider--top' : ''} ${animated ? 'wave-divider--animated' : ''} ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={path}
          fill={fillColor}
        />
      </svg>
    </div>
  );
}

/**
 * Divisor con múltiples ondas superpuestas
 * Efecto más artístico con los 4 colores
 */
export function MultiWaveDivider({
  flip = false,
  height = 120,
  className = '',
}: {
  flip?: boolean;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative ${flip ? 'rotate-180' : ''} ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Capa 1 - Azul */}
        <path
          d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
          fill="var(--azul-subtle)"
          opacity="0.5"
        />
        {/* Capa 2 - Lima */}
        <path
          d="M0,70 C200,30 400,90 600,50 C800,10 1000,70 1200,40 L1200,120 L0,120 Z"
          fill="var(--lima-subtle)"
          opacity="0.5"
        />
        {/* Capa 3 - Naranja */}
        <path
          d="M0,80 C200,50 400,100 600,70 C800,40 1000,80 1200,60 L1200,120 L0,120 Z"
          fill="var(--naranja-subtle)"
          opacity="0.6"
        />
        {/* Capa 4 - Principal (blanco o gris) */}
        <path
          d="M0,90 C200,70 400,110 600,85 C800,60 1000,95 1200,80 L1200,120 L0,120 Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

/**
 * Divisor con patrón de pinceladas
 * Efecto artístico de pintura
 */
export function BrushDivider({
  color = 'naranja',
  flip = false,
  height = 60,
  className = '',
}: {
  color?: ColorVariant;
  flip?: boolean;
  height?: number;
  className?: string;
}) {
  const fillColor = BACKGROUND_COLORS[color] || 'var(--naranja-bg)';

  return (
    <div
      className={`relative ${flip ? 'rotate-180' : ''} ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,30 Q50,10 100,25 T200,35 T300,20 T400,40 T500,15 T600,35 T700,25 T800,40 T900,20 T1000,30 T1100,25 T1200,35 L1200,60 L0,60 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
