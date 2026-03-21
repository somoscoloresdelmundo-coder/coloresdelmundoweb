// Componentes de cursor personalizado inmersivo
export {
  CursorProvider,
  useCursor,
  useCursorHandlers,
  CURSOR_COLORS,
  type CursorColorKey,
  type CursorType,
} from './CursorProvider';

export { CustomCursor, CursorHover } from './CustomCursor';

// Hero inmersivo
export { default as HeroImmersive } from './HeroImmersive';
export type { HeroImmersiveProps } from './HeroImmersive';

// Scroll horizontal con pinning
export { HorizontalScrollSection, type HorizontalScrollItem, type HorizontalScrollSectionProps } from './HorizontalScrollSection';

// Divisores orgánicos animados entre secciones
export {
  WaveDivider,
  DIVIDER_COLORS as WAVE_DIVIDER_COLORS,
  type WaveDividerProps,
  type DividerColorKey as WaveDividerColorKey,
} from './WaveDivider';

export {
  BlobDivider,
  DIVIDER_COLORS as BLOB_DIVIDER_COLORS,
  type BlobDividerProps,
  type DividerColorKey as BlobDividerColorKey,
} from './BlobDivider';

export {
  GradientTransition,
  type GradientTransitionProps,
} from './GradientTransition';

export {
  ParticlesDivider,
  DIVIDER_COLORS as PARTICLES_DIVIDER_COLORS,
  type ParticlesDividerProps,
  type DividerColorKey as ParticlesDividerColorKey,
} from './ParticlesDivider';

// Re-exportar colores unificados desde el sistema centralizado
export { DIVIDER_COLORS, OVERLAY_COLORS, type DividerColorKey, type OverlayColorKey } from '@/lib/design/colors';

// Componentes de microinteracciones avanzadas
export {
  MagneticElement,
  MAGNETIC_COLORS,
  type MagneticElementProps,
} from './MagneticElement';

export {
  Card3D,
  CARD3D_COLORS,
  type Card3DProps,
} from './Card3D';

export {
  TextReveal,
  TEXT_REVEAL_COLORS,
  type TextRevealProps,
} from './TextReveal';

export {
  CounterAnimated,
  CounterGroup,
  COUNTER_COLORS,
  type CounterAnimatedProps,
  type CounterGroupProps,
} from './CounterAnimated';

export {
  ButtonMagnetic,
  BUTTON_COLORS,
  type ButtonMagneticProps,
} from './ButtonMagnetic';

export {
  LinkUnderline,
  LinkUnderlineColor,
  LinkGroup,
  LINK_COLORS,
  type LinkUnderlineProps,
  type LinkUnderlineColorProps,
  type LinkGroupProps,
} from './LinkUnderline';

// Sistema de transiciones de pagina con overlay
export {
  TransitionOverlayProvider,
  useTransitionOverlay,
  useNavigateWithTransition,
  TransitionLink,
  TransitionButton,
  type TransitionEffect,
} from './TransitionOverlay';
