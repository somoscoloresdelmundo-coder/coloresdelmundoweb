---
name: colores-design
description: Crear componentes UI distintivos para Colores del Mundo. Usar cuando se pida crear botones, cards, secciones, o cualquier elemento visual. Genera codigo con la estetica organica/artistica del proyecto.
allowed-tools: Read, Glob, Grep, Edit, Write
---

# Skill: Diseno Colores del Mundo

Crea componentes UI que reflejen la identidad visual de Colores del Mundo ONG.

## Antes de Disenar

1. **Leer tokens**: `src/styles/tokens.css`
2. **Revisar colores**: `src/lib/design/colors.ts`
3. **Ver componentes existentes**: `src/components/ui/`
4. **Verificar animaciones**: `src/lib/animations/constants.ts`

## Principios de Diseno

### Estetica
- **Organica**: Formas suaves, bordes redondeados, transiciones fluidas
- **Artistica**: Uso expresivo del color, espacios generosos
- **Editorial**: Tipografia cuidada, jerarquia clara

### Paleta (SOLO estos 4 colores)
| Color | Uso Principal |
|-------|---------------|
| Azul (#4B89BF) | Informacion, enlaces, confianza |
| Lima (#9AAD2E) | Exito, naturaleza, crecimiento |
| Naranja (#F29A2E) | CTAs, energia, creatividad |
| Terracota (#D94423) | Enfasis, pasion, alertas |

### Que NUNCA Hacer
- Hardcodear colores (usar tokens)
- Usar fuentes genericas (Arial, Roboto)
- Crear layouts planos sin profundidad
- Olvidar estados hover/focus
- Ignorar dark mode
- Omitir accesibilidad

## Estructura de Componente

```typescript
'use client';

import { COLORS } from '@/lib/design/colors';
import { DURATIONS, SCALES } from '@/lib/animations';
import type { ColorVariant } from '@/types/ui';

interface MiComponenteProps {
  color?: ColorVariant;
  children: React.ReactNode;
  className?: string;
}

export default function MiComponente({
  color = 'naranja',
  children,
  className = '',
}: MiComponenteProps) {
  return (
    <div
      className={`
        rounded-2xl p-6
        bg-${color}-bg hover:bg-${color}-subtle
        border border-${color}/20
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1
        ${className}
      `}
    >
      {children}
    </div>
  );
}
```

## Checklist Final

- [ ] Usa tokens de color centralizados
- [ ] Tiene estados hover y focus
- [ ] Soporta dark mode (`dark:` prefixes)
- [ ] Animaciones usan constantes de `@/lib/animations`
- [ ] Props tipadas con interface
- [ ] Accesible (ARIA, semantico)
- [ ] Responsive (mobile-first)
- [ ] Max 200 lineas

## Ejemplos de Referencia

Ver componentes existentes:
- `src/components/ui/Button.tsx`
- `src/components/cards/FeatureCard.tsx`
- `src/components/sections/HeroSection.tsx`
