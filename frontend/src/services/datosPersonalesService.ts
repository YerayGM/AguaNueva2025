import apiService from './api';
import type { DatosPersonales } from '../types';

// URL base para todos los endpoints de datos personales
// Esta ruta debe coincidir con el controlador en el backend
const BASE_URL = 'datos-personales';

export const getDatosPersonales = async (): Promise<DatosPersonales[]> => {
  return await apiService.get<DatosPersonales[]>(BASE_URL);
};

export const getDatosPersonalesByDni = async (dni: string): Promise<DatosPersonales> => {
  const response = await apiService.get<DatosPersonales>(`${BASE_URL}/dni/${dni}`);
  return response;
};

export const searchDatosPersonales = async (
  nombre?: string, 
  apellidos?: string
): Promise<DatosPersonales[]> => {
  const params: Record<string, string> = {};
  if (nombre) params.nombre = nombre;
  if (apellidos) params.apellidos = apellidos;
  
  return await apiService.get<DatosPersonales[]>(`${BASE_URL}/buscar`, params);
};

export const getDatosPersonalesByMunicipio = async (idMunicipio: number): Promise<DatosPersonales[]> => {
  return await apiService.get<DatosPersonales[]>(`${BASE_URL}/municipio/${idMunicipio}`);
};

export const createDatosPersonales = async (data: Partial<DatosPersonales>): Promise<DatosPersonales> => {
  return await apiService.post<DatosPersonales>(BASE_URL, data as Record<string, unknown>);
};

export const updateDatosPersonales = async (dni: string, data: Partial<DatosPersonales>): Promise<void> => {
  await apiService.patch<void>(`${BASE_URL}/${dni}`, data as Record<string, unknown>);
};

export const deleteDatosPersonales = async (dni: string): Promise<void> => {
  await apiService.delete<void>(`${BASE_URL}/${dni}`);
};