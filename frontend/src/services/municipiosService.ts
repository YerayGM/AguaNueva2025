import apiService from './api'
import type { Municipio } from '../types'

const BASE_URL = '/municipios'

export const getMunicipios = async (): Promise<Municipio[]> => {
  return await apiService.get<Municipio[]>(BASE_URL)
}

export const getMunicipioById = async (id: number): Promise<Municipio> => {
  return await apiService.get<Municipio>(`${BASE_URL}/${id}`)
}

export const createMunicipio = async (data: Partial<Municipio>): Promise<Municipio> => {
  return await apiService.post<Municipio>(BASE_URL, data as Record<string, unknown>)
}

export const updateMunicipio = async (id: number, data: Partial<Municipio>): Promise<void> => {
  await apiService.patch<void>(`${BASE_URL}/${id}`, data as Record<string, unknown>)
}

export const deleteMunicipio = async (id: number): Promise<void> => {
  await apiService.delete<void>(`${BASE_URL}/${id}`)
}