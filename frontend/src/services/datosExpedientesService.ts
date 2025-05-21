import api from './api';
import type { DatosExpediente } from '../types';

// Obtener todos los datos de expedientes
export async function getDatosExpedientes(): Promise<DatosExpediente[]> {
  try {
    return await api.get<DatosExpediente[]>('/datos-expedientes');
  } catch (error) {
    console.error('Error al obtener datos de expedientes:', error);
    return [];
  }
}

// Obtener datos de expediente por ID
export async function getDatosExpedienteById(id: number): Promise<DatosExpediente> {
  return api.get<DatosExpediente>(`/datos-expedientes/${id}`);
}

// Obtener datos de expedientes por número de expediente
export async function getDatosExpedienteByNumero(expediente: string): Promise<DatosExpediente[]> {
  try {
    return await api.get<DatosExpediente[]>(`/datos-expedientes/expediente/${expediente}`);
  } catch (error) {
    console.error(`Error al obtener datos para expediente ${expediente}:`, error);
    return [];
  }
}

// Crear nuevos datos de expediente
export async function createDatosExpediente(datos: Partial<DatosExpediente>): Promise<DatosExpediente> {
  return api.post<DatosExpediente>('/datos-expedientes', datos);
}

// Actualizar datos de expediente existentes
export async function updateDatosExpediente(id: number, datos: Partial<DatosExpediente>): Promise<DatosExpediente> {
  return api.patch<DatosExpediente>(`/datos-expedientes/${id}`, datos);
}

// Eliminar datos de expediente
export async function deleteDatosExpediente(id: number): Promise<void> {
  return api.delete<void>(`/datos-expedientes/${id}`);
}