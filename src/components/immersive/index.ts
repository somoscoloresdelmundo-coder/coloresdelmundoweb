// Componentes inmersivos activos en el sitio institucional.
// Se han eliminado CustomCursor, HeroImmersive, HorizontalScrollSection,
// BlobDivider, ParticlesDivider, TextReveal, CounterAnimated, ButtonMagnetic,
// LinkUnderline, TransitionOverlay y CursorProvider por no usarse en ninguna
// página y por introducir peso/patrones visuales inconsistentes con el tono
// institucional (cursors animados, partículas, transiciones pesadas).

// Divisor de onda (orgánico) entre secciones — usado en todas las páginas principales
export {
  WaveDivider,
  DIVIDER_COLORS as WAVE_DIVIDER_COLORS,
  type WaveDividerProps,
  type DividerColorKey as WaveDividerColorKey,
} from './WaveDivider';

// Transición de gradiente entre bloques a color
export {
  GradientTransition,
  type GradientTransitionProps,
} from './GradientTransition';

// Re-exportar colores unificados desde el sistema centralizado
export { DIVIDER_COLORS, OVERLAY_COLORS, type DividerColorKey, type OverlayColorKey } from '@/lib/design/colors';

// Microinteracción magnética para botones y enlaces destacados
export {
  MagneticElement,
  MAGNETIC_COLORS,
  type MagneticElementProps,
} from './MagneticElement';

// Efecto 3D sutil para tarjetas (usado por HistoryTimeline)
export {
  Card3D,
  CARD3D_COLORS,
  type Card3DProps,
} from './Card3D';
