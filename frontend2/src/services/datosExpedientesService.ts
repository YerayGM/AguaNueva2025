import apiService from './api';
import { Expediente, NuevoExpedienteData } from '../types/Expedientes';

const BASE_URL = '/expedientes';

export const expedientesService = {
  getAll: async (): Promise<Expediente[]> => {
    return apiService.get<Expediente[]>(BASE_URL);
  },
  
  getById: async (expediente: string): Promise<Expediente> => {
    return apiService.get<Expediente>(`${BASE_URL}/${expediente}`);
  },
  
  getByDni: async (dni: string): Promise<Expediente[]> => {
    return apiService.get<Expediente[]>(`${BASE_URL}/buscar/dni/${dni}`);
  },
  
  getByDates: async (fechaInicio?: string, fechaFin?: string): Promise<Expediente[]> => {
    const params: Record<string, string> = {};
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;
    
    return apiService.get<Expediente[]>(`${BASE_URL}/buscar/fechas`, params);
  },
  
  create: async (datos: NuevoExpedienteData): Promise<Expediente> => {
    return apiService.post<Expediente>(BASE_URL, datos);
  },
  
  update: async (expediente: string, datos: Partial<Expediente>): Promise<Expediente> => {
    return apiService.patch<Expediente>(`${BASE_URL}/${expediente}`, datos);
  },
  
  delete: async (expediente: string): Promise<void> => {
    return apiService.delete<void>(`${BASE_URL}/${expediente}`);
  }
};

export default expedientesService;