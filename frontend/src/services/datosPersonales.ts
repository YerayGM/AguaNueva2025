import api from './api';
import { DatosPersonales } from '../types/DatosPersonales';

export const getDatosPersonales = async (): Promise<DatosPersonales[]> => {
  const response = await api.get('/datos-personales');
  return response.data;
};

export const getDatosPersonalesByDni = async (dni: string): Promise<DatosPersonales> => {
  const response = await api.get(`/datos-personales/dni/${dni}`);
  return response.data;
};

export const createDatosPersonales = async (data: Partial<DatosPersonales>): Promise<DatosPersonales> => {
  const response = await api.post('/datos-personales', data);
  return response.data;
};

export const updateDatosPersonales = async (dni: string, data: Partial<DatosPersonales>): Promise<void> => {
  await api.patch(`/datos-personales/${dni}`, data);
};

export const deleteDatosPersonales = async (dni: string): Promise<void> => {
  await api.delete(`/datos-personales/${dni}`);
};