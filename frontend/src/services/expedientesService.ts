import api from './api';
import type { Expediente } from '../types';

// Obtener todos los expedientes
export async function getExpedientes(): Promise<Expediente[]> {
  try {
    const response = await api.get<Expediente[]>('/expedientes');
    return response;
  } catch (error) {
    console.error('Error al obtener expedientes:', error);
    return [];
  }
}

// Obtener expedientes recientes (limitados)
export async function getRecentExpedientes(limit = 3): Promise<Expediente[]> {
  try {
    const expedientes = await getExpedientes();
    
    // Prevenir error si expedientes no es iterable
    if (!Array.isArray(expedientes)) {
      console.warn('La respuesta no es un array:', expedientes);
      return [];
    }
    
    return expedientes
      .sort((a, b) => {
        const fechaA = a.FECHA ? new Date(a.FECHA).getTime() : 0;
        const fechaB = b.FECHA ? new Date(b.FECHA).getTime() : 0;
        return fechaB - fechaA;
      })
      .slice(0, limit);
  } catch (error) {
    console.error('Error al obtener expedientes recientes:', error);
    return [];
  }
}

// Obtener un expediente por ID - con manejo de errores mejorado
export async function getExpedienteById(id: string): Promise<Expediente> {
  try {
    // Cambia esta línea para usar la ruta correcta
    return await api.get<Expediente>(`/expedientes/id/${id}`);
  } catch (error) {
    console.error(`Error al obtener expediente con ID ${id}:`, error);
    throw error;
  }
}

// Obtener expedientes por DNI
export async function getExpedientesByDni(dni: string): Promise<Expediente[]> {
  try {
    return await api.get<Expediente[]>(`/expedientes/buscar/dni/${dni}`);
  } catch (error) {
    console.error(`Error al obtener expedientes para DNI ${dni}:`, error);
    return [];
  }
}

// Obtener expedientes por municipio
export async function getExpedientesByMunicipio(idMunicipio: number): Promise<Expediente[]> {
  try {
    return await api.get<Expediente[]>(`/expedientes/buscar/municipio/${idMunicipio}`);
  } catch (error) {
    console.error(`Error al obtener expedientes para municipio ${idMunicipio}:`, error);
    return [];
  }
}

// Crear un nuevo expediente
export async function createExpediente(expediente: Partial<Expediente>): Promise<Expediente> {
  return api.post<Expediente>('/expedientes', expediente);
}

// Actualizar un expediente existente
export async function updateExpediente(id: string, expediente: Partial<Expediente>): Promise<Expediente> {
  return api.patch<Expediente>(`/expedientes/${id}`, expediente);
}

// Eliminar un expediente
export async function deleteExpediente(id: string): Promise<void> {
  return api.delete<void>(`/expedientes/${id}`);
}