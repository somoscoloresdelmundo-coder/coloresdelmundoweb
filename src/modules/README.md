# Módulos - Colores del Mundo

Esta carpeta contiene los módulos de funcionalidad de la aplicación.
Cada módulo es autónomo y puede desarrollarse independientemente.

## Estructura de Módulos

```
modules/
├── projects/      # Gestión de proyectos
├── members/       # Sistema de miembros (futuro)
├── events/        # Gestión de eventos (futuro)
├── programs/      # Programas y actividades (futuro)
└── games/         # Juegos educativos (futuro)
```

## Cómo Crear un Nuevo Módulo

1. Crear carpeta dentro de `modules/`
2. Estructura recomendada:
   ```
   mi-modulo/
   ├── components/     # Componentes específicos del módulo
   ├── hooks/          # Hooks personalizados
   ├── lib/            # Lógica de negocio
   ├── types/          # Tipos TypeScript
   └── index.ts        # Exportaciones públicas
   ```

## Fases de Desarrollo

### Fase 1 (Actual)
- Web estática con todas las páginas institucionales
- Sistema de diseño completo
- PWA básica

### Fase 2 (Próxima)
- Conexión a CMS headless (Strapi/Directus)
- Gestión de proyectos dinámica
- Blog/Noticias

### Fase 3 (Futura)
- Sistema de autenticación
- Área de miembros
- Dashboard interno

### Fase 4 (Futura)
- Módulos interactivos
- Juegos educativos
- Aplicación móvil
