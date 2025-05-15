import axios, { AxiosError } from 'axios';

/**
 * Extrae el mensaje de error de una respuesta de error de Axios
 * @param error - Error de Axios
 * @returns Mensaje de error formateado
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    // Error de respuesta del servidor
    if (axiosError.response) {
      const data = axiosError.response.data as any;
      
      // Si el servidor devuelve un mensaje de error específico
      if (data?.message) {
        return data.message;
      }
      
      // Si hay un array de errores
      if (data?.errors && Array.isArray(data.errors)) {
        return data.errors.map((err: any) => err.message || err).join(', ');
      }
      
      // Mensaje basado en el código de estado HTTP
      switch (axiosError.response.status) {
        case 400:
          return 'Solicitud incorrecta. Verifique los datos enviados.';
        case 401:
          return 'No autorizado. Inicie sesión nuevamente.';
        case 403:
          return 'Acceso denegado. No tiene permisos para esta acción.';
        case 404:
          return 'Recurso no encontrado.';
        case 409:
          return 'Conflicto con el estado actual del recurso.';
        case 422:
          return 'Datos de entrada inválidos.';
        case 500:
          return 'Error interno del servidor. Intente más tarde.';
        default:
          return `Error ${axiosError.response.status}: ${axiosError.response.statusText}`;
      }
    }
    
    // Error de red (sin respuesta del servidor)
    if (axiosError.request) {
      return 'No se pudo conectar con el servidor. Verifique su conexión.';
    }
    
    // Error al configurar la solicitud
    return axiosError.message || 'Error desconocido';
  }
  
  // Error no relacionado con Axios
  if (error instanceof Error) {
    return error.message;
  }
  
  // Fallback para cualquier otro tipo de error
  return 'Error desconocido';
};

/**
 * Maneja errores comunes y muestra mensajes apropiados
 * @param error - Error capturado
 * @param setError - Función para establecer el mensaje de error
 */
export const handleApiError = (
  error: unknown, 
  setError: (message: string) => void
): void => {
  const errorMessage = getErrorMessage(error);
  console.error('API Error:', error);
  setError(errorMessage);
};