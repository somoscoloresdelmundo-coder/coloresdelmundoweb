/**
 * Módulo de Juegos Educativos (FUTURO)
 *
 * Este módulo contendrá juegos interactivos para:
 * - Aprendizaje intercultural
 * - Educación no formal
 * - Actividades de integración
 * - Herramientas de facilitación
 *
 * FASE ACTUAL: No implementado
 * FASE FUTURA: Implementar con React + Canvas/WebGL
 */

// Tipos de datos para juegos
export interface Game {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'quiz' | 'simulacion' | 'narrativo' | 'colaborativo';
  categoria: 'interculturalidad' | 'idiomas' | 'soft-skills' | 'ciudadania-digital';
  duracionMinutos: number;
  jugadoresMin: number;
  jugadoresMax: number;
  edadMinima?: number;
  imagen?: string;
  instrucciones: string;
  disponible: boolean;
}

export interface GameSession {
  id: string;
  juegoId: string;
  participantes: string[];
  fechaInicio: Date;
  fechaFin?: Date;
  puntuaciones?: Record<string, number>;
  estado: 'en-progreso' | 'completado' | 'abandonado';
}

// Placeholder para futuras funciones
export async function getAvailableGames(): Promise<Game[]> {
  // TODO: Implementar en fase 4
  return [];
}

export async function startGameSession(gameId: string, participants: string[]): Promise<GameSession | null> {
  // TODO: Implementar en fase 4
  throw new Error('Sistema de juegos no implementado aún');
}

// Re-exportar componentes cuando existan
// export * from './components';
