---
name: ui-review
description: Revisar calidad de UI/UX de componentes y paginas. Usar cuando se pida evaluar diseno, mejorar UX, o verificar consistencia visual.
allowed-tools: Read, Glob, Grep
---

# Skill: Revision de UI/UX

Evalua la calidad visual y experiencia de usuario de componentes.

## Proceso de Revision

### 1. Consistencia Visual

#### Colores
- [ ] Solo usa paleta institucional (azul, lima, naranja, terracota)
- [ ] Colores importados de `@/lib/design/colors`
- [ ] No hay colores hardcodeados
- [ ] Uso coherente (azul=info, naranja=CTA, etc.)

#### Tipografia
- [ ] Usa escala tipografica de tokens
- [ ] Headings con Poppins
- [ ] Body con Inter
- [ ] Line-heights apropiados

#### Espaciado
- [ ] Sigue sistema 8pt grid
- [ ] Usa variables `--space-*`
- [ ] Padding/margin consistentes
- [ ] Espacios generosos (no apretado)

### 2. Interactividad

#### Estados
- [ ] Hover states definidos
- [ ] Focus states visibles
- [ ] Active/pressed states
- [ ] Disabled states si aplica
- [ ] Loading states si aplica

#### Transiciones
- [ ] Usa `DURATIONS` de constantes
- [ ] Transiciones suaves (300-500ms)
- [ ] Easing apropiado (`ease-out-expo`)
- [ ] No hay saltos bruscos

#### Feedback
- [ ] Cambios visuales al interactuar
- [ ] Cursores apropiados
- [ ] Indicadores de carga

### 3. Responsividad

#### Breakpoints
- [ ] Mobile-first approach
- [ ] Breakpoints: sm(640), md(768), lg(1024), xl(1280)
- [ ] Texto legible en todos los tamanos
- [ ] Touch targets >= 44x44px en mobile

#### Layout
- [ ] Flexbox/Grid usado correctamente
- [ ] No overflow horizontal
- [ ] Imagenes responsivas
- [ ] Contenido no se corta

### 4. Accesibilidad Basica

- [ ] Contraste suficiente
- [ ] Focus visible
- [ ] ARIA labels donde necesario
- [ ] HTML semantico

### 5. Performance Visual

- [ ] No hay layout shift (CLS)
- [ ] Animaciones usan `transform`/`opacity`
- [ ] `will-change` usado con moderacion
- [ ] Imagenes optimizadas

## Escala de Evaluacion

| Aspecto | 1-2 | 3 | 4-5 |
|---------|-----|---|-----|
| Consistencia | Colores/fonts aleatorios | Mayoria consistente | 100% sistema |
| Interactividad | Sin estados | Estados basicos | Micro-interacciones |
| Responsivo | Roto en mobile | Funcional | Optimizado |
| Accesibilidad | Problemas criticos | WCAG parcial | WCAG AA completo |

## Template de Reporte

```markdown
## Revision UI/UX: [Componente/Pagina]

### Puntuacion General: X/5

### Consistencia Visual: X/5
- Colores: [Comentario]
- Tipografia: [Comentario]
- Espaciado: [Comentario]

### Interactividad: X/5
- Estados: [Comentario]
- Transiciones: [Comentario]
- Feedback: [Comentario]

### Responsividad: X/5
- Mobile: [Comentario]
- Tablet: [Comentario]
- Desktop: [Comentario]

### Accesibilidad: X/5
- [Problemas encontrados]

### Recomendaciones Prioritarias
1. [Alta prioridad]
2. [Media prioridad]
3. [Baja prioridad]
```

## Comparacion con Referencia

Cuando aplique, comparar con:
- Componentes existentes en `src/components/ui/`
- Design tokens en `src/styles/tokens.css`
- Patrones establecidos en el proyecto
