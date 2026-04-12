---
name: accessibility
description: Auditar y corregir problemas de accesibilidad. Usar cuando se pida revisar accesibilidad, WCAG compliance, o mejorar a11y de componentes.
allowed-tools: Read, Glob, Grep, Edit
---

# Skill: Auditoria de Accesibilidad

Verifica y corrige problemas de accesibilidad segun WCAG 2.1 AA.

## Proceso de Auditoria

### 1. Escanear Componente
```bash
# Buscar problemas comunes
grep -r "onClick" src/components/  # Sin button/role
grep -r "<img" src/components/     # Sin alt
grep -r "aria-" src/components/    # Verificar uso correcto
```

### 2. Checklist WCAG 2.1 AA

#### Perceptible
- [ ] Imagenes tienen `alt` descriptivo
- [ ] Videos tienen captions/transcripts
- [ ] Contraste texto: 4.5:1 (normal), 3:1 (grande)
- [ ] No depende solo del color para comunicar

#### Operable
- [ ] Todo accesible por teclado
- [ ] Focus visible y claro
- [ ] Sin trampas de teclado
- [ ] Touch targets >= 44x44px
- [ ] `prefers-reduced-motion` respetado

#### Comprensible
- [ ] Lenguaje de pagina declarado (`lang`)
- [ ] Labels en formularios
- [ ] Errores identificados claramente
- [ ] Instrucciones disponibles

#### Robusto
- [ ] HTML semantico valido
- [ ] ARIA usado correctamente
- [ ] Compatible con screen readers

## Patrones de Correccion

### Botones con Solo Icono
```tsx
// ANTES (Incorrecto)
<button onClick={handleClick}>
  <Icon />
</button>

// DESPUES (Correcto)
<button
  onClick={handleClick}
  aria-label="Descripcion de la accion"
>
  <Icon aria-hidden="true" />
</button>
```

### Imagenes
```tsx
// Decorativa
<img src="..." alt="" aria-hidden="true" />

// Informativa
<img src="..." alt="Descripcion significativa del contenido" />
```

### Formularios
```tsx
<div>
  <label htmlFor="email" className="sr-only">
    Email
  </label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <p id="email-error" role="alert">
      Mensaje de error
    </p>
  )}
</div>
```

### Links
```tsx
// Con contexto claro
<a href="/proyectos">Ver todos los proyectos</a>

// Sin contexto - agregar aria-label
<a href="/proyectos" aria-label="Ver todos los proyectos">
  Ver mas
</a>
```

### Focus States
```css
/* En components.css */
:focus-visible {
  outline: 2px solid var(--naranja);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}
```

### Reduced Motion
```tsx
// Hook existente
import { useReducedMotion } from '@/hooks';

const reducedMotion = useReducedMotion();

// En animaciones
const duration = reducedMotion ? 0 : DURATIONS.normal;
```

## Herramientas de Verificacion

### Contraste
- Ratio minimo texto normal: 4.5:1
- Ratio minimo texto grande (18px+): 3:1
- Verificar con: https://webaim.org/resources/contrastchecker/

### Screen Reader Testing
1. VoiceOver (Mac): Cmd + F5
2. Navegar con Tab
3. Verificar anuncios de ARIA

## Reporte de Auditoria

Al finalizar, generar reporte:

```markdown
## Auditoria de Accesibilidad

### Archivo: [ruta]

#### Problemas Criticos
- [ ] Problema 1 - Linea X

#### Problemas Moderados
- [ ] Problema 2 - Linea Y

#### Recomendaciones
- Sugerencia 1
- Sugerencia 2

### Resumen
- Criticos: X
- Moderados: Y
- Cumplimiento estimado: X%
```
