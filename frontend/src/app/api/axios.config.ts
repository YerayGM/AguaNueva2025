import axios from 'axios';
import { DatosPersonales } from '../types/DatosPersonales';
import { Expediente, CreateExpedienteDto } from '../types/Expediente';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'my-secret-api-key';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Error de respuesta:', error.response.status, error.response.data);
      if (error.response.status === 401) {
        console.error('Error de autenticación: API key inválida o faltante');
      }
    } else if (error.request) {
      console.error('Error de conexión. Asegúrese de que el backend está ejecutándose:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

const transformToExpediente = (dto: CreateExpedienteDto): Partial<Expediente> => {
  return {
    ...dto,
    Fecha: new Date(dto.Fecha),
    FechaInforme: new Date(dto.FechaInforme),
    Observaciones: dto.Observaciones || null,
    ObservacionesTecnico: dto.ObservacionesTecnico || null,
    TextoInforme: null,
  };
};

export const datosPersonalesApi = {
  getAll: () => api.get<DatosPersonales[]>('/datos-personales'),
  getById: (dni: string) => api.get<DatosPersonales>(`/datos-personales/${dni}`),
  create: (data: Partial<DatosPersonales>) => api.post('/datos-personales', data),
  update: (dni: string, data: Partial<DatosPersonales>) => api.patch(`/datos-personales/${dni}`, data),
  delete: (dni: string) => api.delete(`/datos-personales/${dni}`),
};

export const expedientesApi = {
  getAll: () => api.get<Expediente[]>('/expedientes'),
  getById: (id: string, hoja: number) => api.get<Expediente>(`/expedientes/${id}/${hoja}`),
  create: (data: CreateExpedienteDto) => api.post('/expedientes', transformToExpediente(data)),
  update: (id: string, hoja: number, data: CreateExpedienteDto) => 
    api.patch(`/expedientes/${id}/${hoja}`, transformToExpediente(data)),
  delete: (id: string, hoja: number) => api.delete(`/expedientes/${id}/${hoja}`),
};

export default api;
