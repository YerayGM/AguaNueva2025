import api from './api';
import type { DatosPersonales } from '../types';

// Obtener todos los datos personales
export async function getDatosPersonales(): Promise<DatosPersonales[]> {
  return api.get<DatosPersonales[]>('/datos-personales');
}

// Obtener datos personales por DNI
export async function getDatosPersonalesByDni(dni: string): Promise<DatosPersonales> {
  return api.get<DatosPersonales>(`/datos-personales/dni/${dni}`);
}

// Buscar datos personales por nombre y/o apellidos
export async function searchDatosPersonales(nombre?: string, apellidos?: string): Promise<DatosPersonales[]> {
  const params: Record<string, string> = {};
  if (nombre) params.nombre = nombre;
  if (apellidos) params.apellidos = apellidos;
  
  return api.get<DatosPersonales[]>('/datos-personales/buscar', params);
}

// Obtener datos personales por municipio
export async function getDatosPersonalesByMunicipio(idMunicipio: number): Promise<DatosPersonales[]> {
  return api.get<DatosPersonales[]>(`/datos-personales/municipio/${idMunicipio}`);
}

// Crear nuevos datos personales
export async function createDatosPersonales(datos: Partial<DatosPersonales>): Promise<DatosPersonales> {
  return api.post<DatosPersonales>('/datos-personales', datos);
}

// Actualizar datos personales existentes
export async function updateDatosPersonales(dni: string, datos: Partial<DatosPersonales>): Promise<DatosPersonales> {
  return api.patch<DatosPersonales>(`/datos-personales/${dni}`, datos);
}

// Eliminar datos personales
export async function deleteDatosPersonales(dni: string): Promise<void> {
  return api.delete<void>(`/datos-personales/${dni}`);
}