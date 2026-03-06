/**
 * Módulo de Proyectos
 *
 * Este módulo manejará toda la lógica relacionada con proyectos:
 * - Listado de proyectos
 * - Detalle de proyecto
 * - Filtros por línea de acción, estado, año
 *
 * FASE ACTUAL: Datos estáticos en el código
 * FASE FUTURA: Conexión a CMS (Strapi/Directus)
 */

// Tipos de datos para proyectos
export interface Project {
  id: string;
  titulo: string;
  descripcion: string;
  estado: 'planificado' | 'activo' | 'completado';
  lineasAccion: ('movilidad' | 'arte' | 'educacion' | 'digital')[];
  fechaInicio?: Date;
  fechaFin?: Date;
  paises?: string[];
  participantes?: number;
  financiador?: string;
  imagen?: string;
  destacado?: boolean;
}

export interface ProjectFilters {
  estado?: Project['estado'];
  lineaAccion?: Project['lineasAccion'][number];
  año?: number;
}

// Placeholder para futuras funciones
export async function getProjects(filters?: ProjectFilters): Promise<Project[]> {
  // TODO: Conectar a CMS en fase 2
  // Por ahora retorna datos estáticos
  return [];
}

export async function getProjectById(id: string): Promise<Project | null> {
  // TODO: Conectar a CMS en fase 2
  return null;
}

// Re-exportar componentes cuando existan
// export * from './components';
