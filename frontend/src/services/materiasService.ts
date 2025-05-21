import api from './api';
import type { Materia } from '../types';

// Obtener todas las materias
export async function getMaterias(): Promise<Materia[]> {
  try {
    return await api.get<Materia[]>('/materias');
  } catch (error) {
    console.error('Error al obtener materias:', error);
    return [];
  }
}

// Obtener materia por ID
export async function getMateriaById(id: number): Promise<Materia> {
  return api.get<Materia>(`/materias/${id}`);
}

// Obtener materias por tipo
export async function getMateriasByTipo(tipo: string): Promise<Materia[]> {
  try {
    return await api.get<Materia[]>(`/materias/tipo/${tipo}`);
  } catch (error) {
    console.error(`Error al obtener materias por tipo ${tipo}:`, error);
    return [];
  }
}

// Crear una nueva materia
export async function createMateria(materia: Partial<Materia>): Promise<Materia> {
  return api.post<Materia>('/materias', materia);
}

// Actualizar una materia existente
export async function updateMateria(id: number, materia: Partial<Materia>): Promise<Materia> {
  return api.patch<Materia>(`/materias/${id}`, materia);
}

// Eliminar una materia
export async function deleteMateria(id: number): Promise<void> {
  return api.delete<void>(`/materias/${id}`);
}