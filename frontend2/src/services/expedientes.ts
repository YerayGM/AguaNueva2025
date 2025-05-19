import api from './api';
import { Expediente } from '../types/Expedientes';

export const getExpedientes = async (): Promise<Expediente[]> => {
  try {
    const response = await api.get('/expedientes');
    return response.data;
  } catch (error) {
    console.error('Error fetching expedientes:', error);
    throw error;
  }
};

export const getExpediente = async (expediente: string): Promise<Expediente> => {
  try {
    const response = await api.get(`/expedientes/${expediente}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching expediente ${expediente}:`, error);
    throw error;
  }
};

export const createExpediente = async (data: Partial<Expediente>): Promise<Expediente> => {
  try {
    const response = await api.post('/expedientes', data);
    return response.data;
  } catch (error) {
    console.error('Error creating expediente:', error);
    throw error;
  }
};

export const updateExpediente = async (expediente: string, data: Partial<Expediente>): Promise<void> => {
  try {
    await api.patch(`/expedientes/${expediente}`, data);
  } catch (error) {
    console.error(`Error updating expediente ${expediente}:`, error);
    throw error;
  }
};

export const deleteExpediente = async (expediente: string): Promise<void> => {
  try {
    await api.delete(`/expedientes/${expediente}`);
  } catch (error) {
    console.error(`Error deleting expediente ${expediente}:`, error);
    throw error;
  }
};

export const getExpedientesByDni = async (dni: string): Promise<Expediente[]> => {
  try {
    const response = await api.get(`/expedientes/buscar/dni/${dni}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching expedientes for DNI ${dni}:`, error);
    throw error;
  }
};