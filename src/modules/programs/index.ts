/**
 * Módulo de Programas (FUTURO)
 *
 * Este módulo manejará los programas continuos:
 * - Programas Erasmus+
 * - Talleres regulares
 * - Mentorías
 * - Formaciones
 *
 * FASE ACTUAL: No implementado
 * FASE FUTURA: Implementar con gestión de cohortes
 */

// Tipos de datos para programas
export interface Program {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'erasmus-ka1' | 'erasmus-ka2' | 'esc' | 'taller-regular' | 'mentoria' | 'formacion';
  lineaAccion: 'movilidad' | 'arte' | 'educacion' | 'digital';
  duracion: string; // "3 meses", "1 año", etc.
  fechaInicio?: Date;
  fechaFin?: Date;
  ubicacion: string;
  online?: boolean;
  requisitos?: string[];
  beneficios?: string[];
  plazas?: number;
  inscripcionAbierta: boolean;
  financiado: boolean;
  financiador?: string;
  imagen?: string;
}

export interface ProgramEnrollment {
  programaId: string;
  miembroId: string;
  fechaInscripcion: Date;
  estado: 'aplicando' | 'aceptado' | 'en-curso' | 'completado' | 'abandonado';
  progreso?: number; // 0-100
  certificado?: string; // URL al certificado
}

// Placeholder para futuras funciones
export async function getActivePrograms(): Promise<Program[]> {
  // TODO: Implementar en fase 3
  return [];
}

export async function applyToProgram(programId: string, memberId: string): Promise<ProgramEnrollment | null> {
  // TODO: Implementar en fase 3
  throw new Error('Sistema de programas no implementado aún');
}

// Re-exportar componentes cuando existan
// export * from './components';
