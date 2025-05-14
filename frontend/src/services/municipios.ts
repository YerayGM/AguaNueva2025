import api from './api';
import { Municipio } from '../types/Municipios';

export const getMunicipios = async (): Promise<Municipio[]> => {
  const response = await api.get('/api/municipios');
  return response.data;
};

export const getMunicipio = async (id: number): Promise<Municipio> => {
  const response = await api.get(`/api/municipios/${id}`);
  return response.data;
};

export const createMunicipio = async (data: Partial<Municipio>): Promise<Municipio> => {
  const response = await api.post('/api/municipios', data);
  return response.data;
};

export const updateMunicipio = async (id: number, data: Partial<Municipio>): Promise<void> => {
  await api.patch(`/api/municipios/${id}`, data);
};

export const deleteMunicipio = async (id: number): Promise<void> => {
  await api.delete(`/api/municipios/${id}`);
};