import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Constantes para manejo de errores
const ERROR_MESSAGES = {
  NOT_FOUND: 'Recurso no encontrado',
  SERVER_ERROR: 'Error interno del servidor',
  NETWORK_ERROR: 'Error de conexión con el servidor',
  TIMEOUT_ERROR: 'Tiempo de espera agotado',
  DEFAULT: 'Ha ocurrido un error inesperado'
};

// Obtener la URL base de la API desde variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v7';

// Tiempo máximo de espera para solicitudes (en milisegundos)
const REQUEST_TIMEOUT = 15000;

// Crear instancia de axios con configuración base
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: REQUEST_TIMEOUT,
});

// Interceptor para solicitudes
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Añadir timestamp para evitar caché en solicitudes GET
    if (config.method?.toLowerCase() === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para respuestas
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Manejar errores de red
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        console.error(ERROR_MESSAGES.TIMEOUT_ERROR);
        // Puedes implementar una notificación para el usuario
      } else {
        console.error(ERROR_MESSAGES.NETWORK_ERROR, error.message);
      }
      return Promise.reject(error);
    }
    
    // Manejar errores HTTP
    const { status, data } = error.response;
    
    // Log detallado para desarrollo
    console.error(`Error ${status}:`, data);
    
    // Manejar errores específicos
    switch (status) {
      case 404:
        console.warn(ERROR_MESSAGES.NOT_FOUND);
        break;
      case 500:
        console.error(ERROR_MESSAGES.SERVER_ERROR);
        break;
    }
    
    return Promise.reject(error);
  }
);

// Métodos de API simplificados con manejo de errores mejorado
const apiService = {
  get: async <T, P = Record<string, unknown>>(url: string, params?: P): Promise<T> => {
    try {
      const response = await api.get<T>(url, { params });
      return response.data;
    } catch (error) {
      console.error(`Error en GET ${url}:`, error);
      throw error;
    }
  },
  
  post: async <T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> => {
    try {
      const response = await api.post<T>(url, data);
      return response.data;
    } catch (error) {
      console.error(`Error en POST ${url}:`, error);
      throw error;
    }
  },
  
  put: async <T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> => {
    try {
      const response = await api.put<T>(url, data);
      return response.data;
    } catch (error) {
      console.error(`Error en PUT ${url}:`, error);
      throw error;
    }
  },
  
  patch: async <T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> => {
    try {
      const response = await api.patch<T>(url, data);
      return response.data;
    } catch (error) {
      console.error(`Error en PATCH ${url}:`, error);
      throw error;
    }
  },
  
  delete: async <T>(url: string): Promise<T> => {
    try {
      const response = await api.delete<T>(url);
      return response.data;
    } catch (error) {
      console.error(`Error en DELETE ${url}:`, error);
      throw error;
    }
  },
};

export default apiService;
export { api };