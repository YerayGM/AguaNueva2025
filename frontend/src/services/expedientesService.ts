import apiService from './api';
import type     { Expediente } from '../types';

// URL base para todos los endpoints de expedientes
const BASE_URL = 'expedientes';

export const getExpedientes = async (): Promise<Expediente[]> => {
  return await apiService.get<Expediente[]>(BASE_URL);
};

export const getRecentExpedientes = async (limit: number = 5): Promise<Expediente[]> => {
  // Como no existe el endpoint /recientes, usamos el endpoint principal
  const response = await apiService.get<Expediente[]>(BASE_URL);
  // Limitamos la cantidad a los primeros elementos
  const limitedData = response.data ? response.data.slice(0, limit) : [];
  return { data: limitedData };
};

export const getExpedienteById = async (expedienteId: string): Promise<Expediente> => {
  const response = await apiService.get<Expediente>(`${BASE_URL}/${expedienteId}`);
  return response;
};

export const getExpedientesByDni = async (dni: string): Promise<Expediente[]> => {
  const response = await apiService.get<Expediente[]>(`${BASE_URL}/dni/${dni}`);
  return response;
};

export const getExpedientesByMunicipio = async (idMunicipio: number): Promise<Expediente[]> => {
  const response = await apiService.get<Expediente[]>(`${BASE_URL}/municipio/${idMunicipio}`);
  return response;
};

export const createExpediente = async (data: Partial<Expediente>): Promise<Expediente> => {
  return await apiService.post<Expediente>(BASE_URL, data as Record<string, unknown>);
};

export const updateExpediente = async (expedienteId: string, data: Partial<Expediente>): Promise<void> => {
  await apiService.patch<void>(`${BASE_URL}/${expedienteId}`, data as Record<string, unknown>);
};

export const deleteExpediente = async (expedienteId: string): Promise<void> => {
  await apiService.delete<void>(`${BASE_URL}/${expedienteId}`);
};