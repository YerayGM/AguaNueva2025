import apiService from './api';
import type { DatosExpediente } from '../types';

// URL base para todos los endpoints de datos de expedientes
const BASE_URL = 'datos-expedientes';

export const getDatosExpedientes = async (): Promise<DatosExpediente[]> => {
  const response = await apiService.get<{success: boolean, data: DatosExpediente[]}>(`${BASE_URL}`);
  return response.data;
};

export const getDatosExpedienteById = async (id: number): Promise<DatosExpediente> => {
  return await apiService.get<DatosExpediente>(`${BASE_URL}/${id}`);
};

export const searchDatosExpedientesByFechas = async (
  fechaInicio?: string, 
  fechaFin?: string
): Promise<DatosExpediente[]> => {
  const params: Record<string, string> = {};
  if (fechaInicio) params.fechaInicio = fechaInicio;
  if (fechaFin) params.fechaFin = fechaFin;
  
  return await apiService.get<DatosExpediente[]>(`${BASE_URL}/buscar/fechas`, params);
};

export const createDatosExpediente = async (data: Partial<DatosExpediente>): Promise<DatosExpediente> => {
  return await apiService.post<DatosExpediente>(BASE_URL, data as Record<string, unknown>);
};

export const updateDatosExpediente = async (id: number, data: Partial<DatosExpediente>): Promise<void> => {
  await apiService.patch<void>(`${BASE_URL}/${id}`, data as Record<string, unknown>);
};

export const deleteDatosExpediente = async (id: number): Promise<void> => {
  await apiService.delete<void>(`${BASE_URL}/${id}`);
};