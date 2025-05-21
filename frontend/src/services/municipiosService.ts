import api from './api';
import type { Municipio } from '../types';

// Obtener todos los municipios
export async function getMunicipios(): Promise<Municipio[]> {
  return api.get<Municipio[]>('/municipios');
}

// Obtener municipio por ID
export async function getMunicipioById(id: number): Promise<Municipio> {
  return api.get<Municipio>(`/municipios/${id}`);
}

// Crear un nuevo municipio
export async function createMunicipio(municipio: Partial<Municipio>): Promise<Municipio> {
  return api.post<Municipio>('/municipios', municipio);
}

// Actualizar un municipio existente
export async function updateMunicipio(id: number, municipio: Partial<Municipio>): Promise<Municipio> {
  return api.patch<Municipio>(`/municipios/${id}`, municipio);
}

// Eliminar un municipio
export async function deleteMunicipio(id: number): Promise<void> {
  return api.delete<void>(`/municipios/${id}`);
}