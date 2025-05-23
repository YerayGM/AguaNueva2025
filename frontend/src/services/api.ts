import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

// Constantes para manejo de errores
const ERROR_MESSAGES = {
  NOT_FOUND: 'Recurso no encontrado',
  SERVER_ERROR: 'Error interno del servidor',
  NETWORK_ERROR: 'Error de conexión con el servidor',
  TIMEOUT_ERROR: 'Tiempo de espera agotado',
  DEFAULT: 'Ha ocurrido un error inesperado'
};

// Obtener la URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://yeray.informaticamajada.es/api/v1';

// Tiempo máximo de espera para solicitudes (en milisegundos)
const REQUEST_TIMEOUT = 15000;

// Crear instancia de axios con configuración base
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para peticiones
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para respuestas
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: unknown) => {
    if (axios.isCancel(error)) {
      console.log('Petición cancelada');
      return Promise.reject(error);
    }

    // Asegurarse de que error es un AxiosError
    if (!axios.isAxiosError(error)) {
      toast.error(ERROR_MESSAGES.DEFAULT);
      return Promise.reject(error);
    }
    
    // Error de red o conexión
    if (!error.response) {
      toast.error(ERROR_MESSAGES.NETWORK_ERROR);
      return Promise.reject(error);
    }
    
    // Manejar errores HTTP
    const { status } = error.response;
    const data: Record<string, unknown> | undefined = error.response.data;

    // Mostrar mensajes específicos según el error
    switch (status) {
      case 404:
        toast.error(ERROR_MESSAGES.NOT_FOUND);
        break;
      case 500:
        toast.error(ERROR_MESSAGES.SERVER_ERROR);
        break;
      default: {
        const errorMessage = data && typeof data === 'object' && 'message' in data 
          ? String((data as Record<string, unknown>).message)
          : ERROR_MESSAGES.DEFAULT;
        toast.error(errorMessage);
        break;
      }
    }
    
    // Manejo específico para error 404 en expedientes
    if (error.response?.status === 404) {
      if (error.config?.url?.includes('/expedientes/') && error.config.method === 'get') {
        console.error('Expediente no encontrado:', error.config.url);
        // No mostramos toast aquí, lo manejamos en el componente
      }
    }

    return Promise.reject(error);
  }
);

// Añadir un interceptor para formatear datos automáticamente
axiosInstance.interceptors.request.use(
  (config) => {
    // Solo para requests de tipo PATCH o POST
    if ((config.method === 'patch' || config.method === 'post') && config.data) {
      config.data = formatearDatosParaAPI(config.data);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Función de utilidad para formatear datos
function formatearDatosParaAPI(data: any) {
  // Implementar la lógica de formateo aquí
  return data;
}

// Métodos de API simplificados
const api = {
  get: async <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
    const response = await axiosInstance.get<T>(url, { params });
    return response.data;
  },
  
  post: async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
  },
  
  patch<T = unknown>(url: string, data?: unknown): Promise<T> {
    return axiosInstance.patch<T>(url, data).then(res => res.data);
  },
  
  delete: async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.delete<T>(url);
    return response.data;
  }
};

// Añadir este interceptor para depuración

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.method === 'post' || config.method === 'patch') {
      console.log(`[${config.method.toUpperCase()}] ${config.url}`, config.data);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.config.url}`, error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;