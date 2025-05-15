import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Crear instancia de axios con configuración base
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para solicitudes
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Puedes añadir lógica aquí, como añadir tokens de autenticación
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
    // Manejar errores comunes
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error de respuesta:', error.response.status, error.response.data);
      
      // Manejar errores específicos
      switch (error.response.status) {
        case 401:
          // No autorizado - podría redirigir a login
          console.warn('Sesión expirada o no autorizada');
          break;
        case 403:
          // Prohibido - no tiene permisos
          console.warn('No tiene permisos para esta acción');
          break;
        case 404:
          // No encontrado
          console.warn('Recurso no encontrado');
          break;
        case 500:
          // Error del servidor
          console.error('Error interno del servidor');
          break;
      }
    } else if (error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor');
    } else {
      // Error al configurar la solicitud
      console.error('Error al configurar la solicitud:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;