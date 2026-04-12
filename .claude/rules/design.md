# Reglas de Diseno - Colores del Mundo

## Filosofia de Diseno

### Direccion Estetica
**Organica + Editorial**: Combina formas naturales y fluidas con tipografia elegante y espacios generosos.

### Que Hace Unica Esta Web
- Paleta de 4 colores vibrantes con significado cultural
- Animaciones que revelan contenido de forma artistica
- Divisores organicos entre secciones (WaveDivider, BrushDivider)
- Particulas flotantes que dan vida al fondo
- Transiciones suaves que respetan el ritmo del usuario

## Colores

### Uso Correcto
```typescript
// CORRECTO - Importar desde sistema centralizado
import { COLORS, PRIMARY_HEX } from '@/lib/design/colors';
import { colorClasses } from '@/types/ui';

// Para clases Tailwind
<div className="bg-azul text-azul-dark border-azul-bg" />

// Para inline styles o SVG
<circle fill={PRIMARY_HEX.azul} />
```

### Uso Incorrecto
```typescript
// INCORRECTO - Hardcoded
<div style={{ backgroundColor: '#4B89BF' }} />
const color = '#4B89BF';
```

### Asignacion por Seccion
- **Azul**: Navegacion, links, informacion institucional
- **Lima**: Exito, naturaleza, proyectos ambientales
- **Naranja**: CTAs primarios, energia, creatividad
- **Terracota**: Alertas, pasion, acciones importantes

## Tipografia

### Jerarquia
- **h1**: `text-fluid-display` (clamp 2.5-4.5rem), Poppins Bold
- **h2**: `text-fluid-2xl` (clamp 2-3rem), Poppins Bold
- **h3**: `text-fluid-xl` (clamp 1.5-2rem), Poppins Semibold
- **Body**: `text-fluid-base` (clamp 1-1.125rem), Inter Regular

### Reglas
- Usar escalas fluidas (`text-fluid-*`) para responsive
- Line-height: 1.15 para headings, 1.7 para body
- Letter-spacing: -0.025em para headings
- Max-width: 68ch para parrafos

## Espaciado

### Sistema 8pt Grid
Usar variables de spacing: `--space-1` (4px) hasta `--space-24` (96px)

### Secciones
- Padding vertical: `py-16 md:py-20 lg:py-24`
- Container max-width: 1200px
- Padding horizontal: `px-4 sm:px-6 lg:px-8`

## Componentes

### Botones
- Primario: `bg-naranja hover:bg-naranja-light text-white`
- Secundario: `bg-azul hover:bg-azul-light text-white`
- Outline: `border-2 border-current hover:bg-current/10`
- Siempre con `transition-all duration-300`

### Cards
- Border radius: `rounded-2xl` o `rounded-3xl`
- Sombra: `shadow-lg hover:shadow-xl`
- Hover: `hover:-translate-y-1`
- Fondo sutil del color correspondiente

### Iconos
- Tamanos estandar: `w-4 h-4`, `w-5 h-5`, `w-6 h-6`
- Contenedor con fondo: `w-10 h-10 rounded-xl bg-[color]-pastel`
- Siempre con `aria-hidden="true"` si decorativo

## Animaciones

### Constantes Centralizadas
```typescript
import {
  DURATIONS,      // 0.15 - 1.0 segundos
  STAGGER,        // 0.02 - 0.2 segundos
  THRESHOLDS,     // 0.1 - 0.8 (IntersectionObserver)
  SPRING_CONFIGS  // soft, normal, bouncy, snappy
} from '@/lib/animations';
```

### Patrones
- **Entrada**: FadeInUp con stagger para listas
- **Scroll**: ScrollReveal con threshold 0.15-0.2
- **Hover**: Scale 1.02-1.05, translateY -2px a -4px
- **Transiciones**: 300ms para UI, 500-800ms para reveals

### Accesibilidad
- SIEMPRE respetar `prefers-reduced-motion`
- Duraciones reducidas o sin animacion
- No depender de animacion para comunicar estado

## Que EVITAR

### Estetica "AI Slop"
- Gradientes purpuras/azules genericos
- Fondos blancos planos sin textura
- Layouts simetricos predecibles
- Fuentes Arial, Roboto, system-ui

### Antipatrones
- Colores hardcodeados
- Espaciado inconsistente
- Animaciones sin proposito
- Componentes sin estados hover/focus
- Imagenes sin alt text
- Botones sin ARIA labels

## Dark Mode

### Implementacion
- Usar `data-theme="dark"` en html
- Clases con prefijo `dark:`
- Tokens semanticos en tokens.css ya configurados

### Ajustes
- Colores institucionales se mantienen
- Fondos usan escala de grises oscuros
- Contraste verificado en ambos modos
