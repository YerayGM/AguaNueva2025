import axios from 'axios';
import { DatosPersonales } from '../types/DatosPersonales';
import { Expediente } from '../types/Expediente';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'my-secret-api-key';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY, // Cambiado a x-api-key para coincidir con el backend
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
      console.error('Error de conexión. Asegúrese de que el backend está ejecutándose en el puerto 3000');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject({
      ...error,
      message: error.response?.data?.message || error.message
    });
  }
);

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
  create: (data: Partial<Expediente>) => api.post('/expedientes', data),
  update: (id: string, hoja: number, data: Partial<Expediente>) => 
    api.patch(`/expedientes/${id}/${hoja}`, data),
  delete: (id: string, hoja: number) => api.delete(`/expedientes/${id}/${hoja}`),
};

export default api;
