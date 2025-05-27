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
    console.log('Todos los expedientes obtenidos:', expedientes.length); // Debug
    
    if (!Array.isArray(expedientes)) {
      console.warn('La respuesta no es un array:', expedientes);
      return [];
    }

    // Filtrar duplicados por ID antes de ordenar
    const expedientesUnicos = expedientes.filter((expediente, index, array) => 
      array.findIndex(e => e.ID === expediente.ID) === index
    );

    const resultado = expedientesUnicos
      .sort((a, b) => {
        const fechaA = a.FECHA ? new Date(a.FECHA).getTime() : 0;
        const fechaB = b.FECHA ? new Date(b.FECHA).getTime() : 0;
        return fechaB - fechaA;
      })
      .slice(0, limit);

    console.log('Expedientes recientes filtrados:', resultado.length); // Debug
    return resultado;
  } catch (error) {
    console.error('Error al obtener expedientes recientes:', error);
    return [];
  }
}

// Obtener un expediente por ID - con manejo de errores mejorado
export async function getExpedienteById(id: string): Promise<Expediente> {
  try {
    // Usando la ruta correcta según la API del backend
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

// Crear un nuevo expediente (ajusta los campos a los del backend)
export const createExpediente = async (expedienteData: Omit<Expediente, 'ID' | 'EXPEDIENTE'>) => {
  // No envíes ID ni EXPEDIENTE, el backend los genera
  return api.post<Expediente>('/expedientes', expedienteData);
};

// Actualizar un expediente existente
export async function updateExpediente(id: string, expediente: Partial<Expediente>): Promise<Expediente> {
  // El backend espera el código de expediente, no el ID numérico
  const expedienteData = await getExpedienteById(id);

  // Elimina ID y EXPEDIENTE del objeto a enviar
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ID, EXPEDIENTE, ...expedienteSinId } = expediente;

  return api.patch<Expediente>(`/expedientes/${expedienteData.EXPEDIENTE}`, expedienteSinId);
}

// Eliminar un expediente
export async function deleteExpediente(id: string): Promise<void> {
  // El backend espera el código de expediente, no el ID numérico
  const expedienteData = await getExpedienteById(id);
  return api.delete<void>(`/expedientes/${expedienteData.EXPEDIENTE}`);
}