'use client';

import { DIVIDER_COLORS, type DividerColorKey } from '@/lib/design/colors';

// Re-export for backward compatibility
export { DIVIDER_COLORS, type DividerColorKey };

export interface WaveDividerProps {
  fromColor?: string;
  toColor?: string;
  height?: number;
  className?: string;
  direction?: 'top' | 'bottom';
  variant?: 'gentle' | 'dynamic' | 'choppy' | 'smooth';
  layers?: 1 | 2 | 3;
}

// Paths para diferentes variantes de olas
const WAVE_PATHS = {
  gentle: 'M0,50 Q250,30 500,50 T1000,50 L1000,100 L0,100 Z',
  dynamic: 'M0,40 C150,80 350,20 500,50 C650,80 850,20 1000,40 L1000,100 L0,100 Z',
  choppy: 'M0,50 L100,30 L200,60 L300,35 L400,55 L500,40 L600,65 L700,30 L800,55 L900,40 L1000,50 L1000,100 L0,100 Z',
  smooth: 'M0,60 Q500,20 1000,60 L1000,100 L0,100 Z',
};

const SECONDARY_PATHS = {
  gentle: 'M0,55 Q250,40 500,55 T1000,55 L1000,100 L0,100 Z',
  dynamic: 'M0,45 C200,70 400,30 500,55 C600,70 800,30 1000,45 L1000,100 L0,100 Z',
  choppy: 'M0,55 L150,40 L300,60 L450,45 L600,55 L750,40 L900,55 L1000,50 L1000,100 L0,100 Z',
  smooth: 'M0,65 Q500,35 1000,65 L1000,100 L0,100 Z',
};

const TERTIARY_PATHS = {
  gentle: 'M0,60 Q250,50 500,60 T1000,60 L1000,100 L0,100 Z',
  dynamic: 'M0,50 C250,65 450,45 500,55 C550,65 750,45 1000,50 L1000,100 L0,100 Z',
  choppy: 'M0,58 L200,48 L400,62 L600,52 L800,58 L1000,55 L1000,100 L0,100 Z',
  smooth: 'M0,68 Q500,50 1000,68 L1000,100 L0,100 Z',
};

// Función para mezclar dos colores hex
function mixColors(color1: string, color2: string, ratio: number): string {
  const hex = (c: string) => parseInt(c.slice(1), 16);
  const r = (n: number) => (n >> 16) & 255;
  const g = (n: number) => (n >> 8) & 255;
  const b = (n: number) => n & 255;

  const c1 = hex(color1);
  const c2 = hex(color2);

  const mixedR = Math.round(r(c1) * (1 - ratio) + r(c2) * ratio);
  const mixedG = Math.round(g(c1) * (1 - ratio) + g(c2) * ratio);
  const mixedB = Math.round(b(c1) * (1 - ratio) + b(c2) * ratio);

  return `#${((1 << 24) + (mixedR << 16) + (mixedG << 8) + mixedB)
    .toString(16)
    .slice(1)}`;
}

export function WaveDivider({
  fromColor = DIVIDER_COLORS.blue,
  toColor = DIVIDER_COLORS.lime,
  height = 120,
  className = '',
  direction = 'bottom',
  variant = 'gentle',
  layers = 2,
}: WaveDividerProps) {
  // Calcular colores de las capas
  const layerColors = [toColor];
  if (layers >= 2) {
    layerColors.unshift(mixColors(fromColor, toColor, 0.5));
  }
  if (layers >= 3) {
    layerColors.unshift(mixColors(fromColor, toColor, 0.25));
  }

  const containerStyle: React.CSSProperties = {
    height: `${height}px`,
    marginTop: direction === 'top' ? `-${height}px` : 0,
    marginBottom: direction === 'bottom' ? `-${height}px` : 0,
    transform: direction === 'top' ? 'rotate(180deg)' : 'none',
    background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
  };

  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={containerStyle}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Capa terciaria */}
        {layers >= 3 && (
          <path
            d={TERTIARY_PATHS[variant]}
            fill={layerColors[0]}
            opacity={0.4}
          />
        )}

        {/* Capa intermedia */}
        {layers >= 2 && (
          <path
            d={SECONDARY_PATHS[variant]}
            fill={layerColors[layers >= 3 ? 1 : 0]}
            opacity={0.6}
          />
        )}

        {/* Capa principal */}
        <path
          d={WAVE_PATHS[variant]}
          fill={toColor}
        />
      </svg>
    </div>
  );
}

export default WaveDivider;
