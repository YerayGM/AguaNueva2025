import api from './api';
import { DatosExpediente } from '../types/DatosExpedientes';

export const getDatosExpedientes = async (): Promise<DatosExpediente[]> => {
  const response = await api.get('/api/datos-expedientes');
  return response.data;
};

export const getDatosExpediente = async (id: number): Promise<DatosExpediente> => {
  const response = await api.get(`/api/datos-expedientes/${id}`);
  return response.data;
};

export const createDatosExpediente = async (data: Partial<DatosExpediente>): Promise<DatosExpediente> => {
  const response = await api.post('/api/datos-expedientes', data);
  return response.data;
};

export const updateDatosExpediente = async (id: number, data: Partial<DatosExpediente>): Promise<void> => {
  await api.patch(`/api/datos-expedientes/${id}`, data);
};

export const deleteDatosExpediente = async (id: number): Promise<void> => {
  await api.delete(`/api/datos-expedientes/${id}`);
};

export const getDatosExpedientesByDni = async (dni: string): Promise<DatosExpediente[]> => {
  const response = await api.get(`/api/datos-expedientes/buscar/dni/${dni}`);
  return response.data;
};

export const getDatosExpedientesByFechas = async (fechaInicio?: string, fechaFin?: string): Promise<DatosExpediente[]> => {
  let url = '/api/datos-expedientes/buscar/fechas';
  const params = new URLSearchParams();
  
  if (fechaInicio) params.append('fechaInicio', fechaInicio);
  if (fechaFin) params.append('fechaFin', fechaFin);
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  const response = await api.get(url);
  return response.data;
};