import apiService from './api'
import type { Materia } from '../types'

const BASE_URL = '/materias'

export const getMaterias = async (): Promise<Materia[]> => {
  return await apiService.get<Materia[]>(BASE_URL)
}

export const getMateriaById = async (id: number): Promise<Materia> => {
  return await apiService.get<Materia>(`${BASE_URL}/${id}`)
}

export const getMateriasByTipo = async (tipo: string): Promise<Materia[]> => {
  return await apiService.get<Materia[]>(`${BASE_URL}/tipo/${tipo}`)
}

export const getMateriasByNombre = async (nombre: string): Promise<Materia[]> => {
  return await apiService.get<Materia[]>(`${BASE_URL}/nombre/${nombre}`)
}

export const createMateria = async (data: Partial<Materia>): Promise<Materia> => {
  return await apiService.post<Materia>(BASE_URL, data as Record<string, unknown>)
}

export const updateMateria = async (id: number, data: Partial<Materia>): Promise<void> => {
  await apiService.patch<void>(`${BASE_URL}/${id}`, data as Record<string, unknown>)
}

export const deleteMateria = async (id: number): Promise<void> => {
  await apiService.delete<void>(`${BASE_URL}/${id}`)
}