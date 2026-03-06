/**
 * Sistema de Efectos Artísticos - Colores del Mundo
 *
 * Componentes disponibles:
 *
 * == CURSOR ==
 * - ArtisticCursor: Cursor personalizado con estela de colores
 *
 * == SCROLL ==
 * - ScrollProgress: Barra de progreso con gradiente de 4 colores
 *
 * == DIVISORES ==
 * - WaveDivider: Divisor ondulado SVG
 * - MultiWaveDivider: Divisor con múltiples ondas de colores
 * - BrushDivider: Divisor estilo pincelada
 *
 * == TIPOGRAFÍA ==
 * - TextReveal: Texto con animaciones de revelación
 * - BrushText: Texto con fondo de pincelada
 * - AnimatedNumber: Contador animado para estadísticas
 *
 * == FONDOS ==
 * - ParallaxShapes: Formas flotantes con parallax interactivo
 * - SimpleParallaxBackground: Formas con CSS parallax
 * - FloatingParticles: Sistema de partículas con canvas
 * - CSSParticles: Partículas CSS puras (más ligeras)
 *
 * == MARQUEE ==
 * - Marquee: Texto/elementos en scroll infinito
 * - ColorWordsMarquee: Palabras con colores institucionales
 * - LogoMarquee: Logos de partners en scroll
 *
 * Uso:
 * ```tsx
 * import {
 *   ArtisticCursor,
 *   ScrollProgress,
 *   WaveDivider,
 *   TextReveal,
 *   BrushText,
 * } from '@/components/artistic';
 *
 * // Cursor artístico (colocar en layout)
 * <ArtisticCursor />
 *
 * // Barra de progreso de scroll
 * <ScrollProgress />
 *
 * // Divisor entre secciones
 * <WaveDivider color="azul" style="organic" />
 *
 * // Texto animado
 * <TextReveal animation="split">
 *   Texto que aparece palabra por palabra
 * </TextReveal>
 *
 * // Texto con pincelada
 * <BrushText color="naranja">Destacado</BrushText>
 * ```
 *
 * Clases CSS disponibles (en artistic.css):
 * - .text-gradient-animated: Texto con gradiente animado
 * - .brush-stroke, .brush-stroke--[color]: Fondo de pincelada
 * - .glass-artistic: Efecto glassmorphism artístico
 * - .img-artistic: Imagen con hover artístico
 * - .img-duotone: Imagen con efecto duotono
 * - .color-morph: Fondo que cambia entre los 4 colores
 * - .border-morph: Borde animado con los 4 colores
 * - .parallax-element, .parallax-slow, .parallax-fast: Parallax CSS
 * - .typewriter: Efecto máquina de escribir
 * - .text-wave: Texto ondulante
 * - .hover-3d: Efecto de perspectiva 3D en hover
 * - .loader-artistic: Spinner con los 4 colores
 */

// Cursor
export { default as ArtisticCursor } from './ArtisticCursor';

// Scroll
export { default as ScrollProgress } from './ScrollProgress';

// Divisores
export {
  default as WaveDivider,
  MultiWaveDivider,
  BrushDivider,
} from './WaveDivider';

// Tipografía
export {
  default as TextReveal,
  BrushText,
  AnimatedNumber,
} from './TextReveal';

// Fondos y Parallax
export {
  default as ParallaxShapes,
  SimpleParallaxBackground,
} from './ParallaxShapes';

export {
  default as FloatingParticles,
  CSSParticles,
} from './FloatingParticles';

// Marquee
export {
  default as Marquee,
  ColorWordsMarquee,
  LogoMarquee,
} from './Marquee';
