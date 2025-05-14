import api from './api';
import { Materia } from '../types/Materias';

export const getMaterias = async (): Promise<Materia[]> => {
  const response = await api.get('/api/materia');
  return response.data;
};

export const getMateriasByTipo = async (tipo: string): Promise<Materia[]> => {
  const response = await api.get(`/api/materia/tipo/${tipo}`);
  return response.data;
};

export const getMateriasByNombre = async (nombre: string): Promise<Materia[]> => {
  const response = await api.get(`/api/materia/nombre/${nombre}`);
  return response.data;
};

export const createMateria = async (data: Partial<Materia>): Promise<Materia> => {
  const response = await api.post('/api/materia', data);
  return response.data;
};

export const updateMateria = async (id: number, data: Partial<Materia>): Promise<void> => {
  await api.patch(`/api/materia/${id}`, data);
};

export const deleteMateria = async (id: number): Promise<void> => {
  await api.delete(`/api/materia/${id}`);
};