/**
 * Módulo de Miembros (FUTURO)
 *
 * Este módulo manejará el sistema de miembros:
 * - Autenticación (login/registro)
 * - Perfiles de usuario
 * - Área privada
 * - Gestión de membresías
 *
 * FASE ACTUAL: No implementado
 * FASE FUTURA: Implementar con NextAuth.js o Clerk
 */

// Tipos de datos para miembros
export interface Member {
  id: string;
  nombre: string;
  email: string;
  rol: 'voluntario' | 'participante' | 'colaborador' | 'admin';
  fechaRegistro: Date;
  activo: boolean;
  perfil?: {
    bio?: string;
    idiomas?: string[];
    intereses?: string[];
    foto?: string;
  };
}

export interface MemberSession {
  user: Member;
  expires: Date;
}

// Placeholder para futuras funciones de autenticación
export async function signIn(email: string, password: string): Promise<MemberSession | null> {
  // TODO: Implementar en fase 3
  throw new Error('Sistema de miembros no implementado aún');
}

export async function signOut(): Promise<void> {
  // TODO: Implementar en fase 3
  throw new Error('Sistema de miembros no implementado aún');
}

export async function getCurrentMember(): Promise<Member | null> {
  // TODO: Implementar en fase 3
  return null;
}

// Re-exportar componentes cuando existan
// export * from './components';
