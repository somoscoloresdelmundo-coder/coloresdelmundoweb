/**
 * Sistema de Animaciones Modular - Colores del Mundo
 *
 * Componentes disponibles:
 *
 * - FadeIn: Animación de aparición con fade
 * - SlideIn: Animación de entrada con slide (up, down, left, right)
 * - ScrollReveal: Revela elementos al hacer scroll
 * - Stagger: Anima grupos de elementos en secuencia
 * - Hover: Micro-interacciones de hover
 *
 * Uso:
 * ```tsx
 * import { SlideIn, Stagger, ScrollReveal } from '@/components/animations';
 *
 * <SlideIn direction="up" delay={100}>
 *   <Card />
 * </SlideIn>
 *
 * <Stagger delay={80} animation="slideUp">
 *   <Card />
 *   <Card />
 *   <Card />
 * </Stagger>
 * ```
 *
 * También puedes usar las clases CSS directamente:
 * - .anim-slide-up, .anim-fade-in, .anim-scale-up
 * - .scroll-reveal, .scroll-reveal-left
 * - .hover-lift, .hover-scale, .hover-glow
 * - .stagger-1, .stagger-2, etc.
 */

export { default as FadeIn } from './FadeIn';
export { default as SlideIn } from './SlideIn';
export { default as ScrollReveal } from './ScrollReveal';
export { default as Stagger } from './Stagger';
export { default as Hover, hoverClasses } from './Hover';
