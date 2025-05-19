import apiService from './api';
import { DatosPersonales, DatosPerFormData } from '../types/DatosPersonales';

const BASE_URL = '/datos-personales';

export const datosPersonalesService = {
  getAll: async (): Promise<DatosPersonales[]> => {
    return apiService.get<DatosPersonales[]>(BASE_URL);
  },
  
  getByDni: async (dni: string): Promise<DatosPersonales> => {
    return apiService.get<DatosPersonales>(`${BASE_URL}/dni/${dni}`);
  },
  
  searchByName: async (nombre?: string, apellidos?: string): Promise<DatosPersonales[]> => {
    const params: Record<string, string> = {};
    if (nombre) params.nombre = nombre;
    if (apellidos) params.apellidos = apellidos;
    
    // Si no hay parámetros de búsqueda, devolver lista vacía para evitar error en el backend
    if (!nombre && !apellidos) {
      return [];
    }
    
    return apiService.get<DatosPersonales[]>(`${BASE_URL}/buscar`, params);
  },
  
  create: async (datos: DatosPerFormData): Promise<DatosPersonales> => {
    return apiService.post<DatosPersonales>(BASE_URL, datos);
  },
  
  update: async (dni: string, datos: Partial<DatosPerFormData>): Promise<DatosPersonales> => {
    return apiService.patch<DatosPersonales>(`${BASE_URL}/${dni}`, datos);
  },
  
  delete: async (dni: string): Promise<void> => {
    return apiService.delete<void>(`${BASE_URL}/${dni}`);
  }
};

export default datosPersonalesService;