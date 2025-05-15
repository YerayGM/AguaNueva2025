import api from './api';
import { Municipio } from '../types/Municipios';

export const getMunicipios = async (): Promise<Municipio[]> => {
  const response = await api.get('/municipios');
  return response.data;
};

export const getMunicipio = async (id: number): Promise<Municipio> => {
  const response = await api.get(`/municipios/${id}`);
  return response.data;
};

export const createMunicipio = async (data: Partial<Municipio>): Promise<Municipio> => {
  const response = await api.post('/municipios', data);
  return response.data;
};

export const updateMunicipio = async (id: number, data: Partial<Municipio>): Promise<void> => {
  await api.patch(`/municipios/${id}`, data);
};

export const deleteMunicipio = async (id: number): Promise<void> => {
  await api.delete(`/municipios/${id}`);
};