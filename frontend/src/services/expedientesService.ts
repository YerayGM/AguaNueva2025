import apiService from './api'
import type { Expediente } from '../types'

const BASE_URL = '/expedientes'

export const getExpedientes = async (): Promise<Expediente[]> => {
  return await apiService.get<Expediente[]>(BASE_URL)
}

export const getExpedienteById = async (expedienteId: string): Promise<Expediente> => {
  return await apiService.get<Expediente>(`${BASE_URL}/${expedienteId}`)
}

export const getExpedientesByDni = async (dni: string): Promise<Expediente[]> => {
  return await apiService.get<Expediente[]>(`${BASE_URL}/buscar/dni/${dni}`)
}

export const getExpedientesByMunicipio = async (idMunicipio: number): Promise<Expediente[]> => {
  return await apiService.get<Expediente[]>(`${BASE_URL}/buscar/municipio/${idMunicipio}`)
}

export const createExpediente = async (data: Partial<Expediente>): Promise<Expediente> => {
  return await apiService.post<Expediente>(BASE_URL, data as Record<string, unknown>)
}

export const updateExpediente = async (expedienteId: string, data: Partial<Expediente>): Promise<void> => {
  await apiService.patch<void>(`${BASE_URL}/${expedienteId}`, data as Record<string, unknown>)
}

export const deleteExpediente = async (expedienteId: string): Promise<void> => {
  await apiService.delete<void>(`${BASE_URL}/${expedienteId}`)
}