/**
 * Utilidades para formatear datos
 */

/**
 * Formatea una fecha en formato ISO a formato local
 * @param dateString - Fecha en formato ISO o string válido para Date
 * @param options - Opciones de formato
 * @returns Fecha formateada
 */
export const formatDate = (
  dateString?: string | null, 
  options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }
): string => {
  if (!dateString) return '-';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '-';
  }
};

/**
 * Formatea un número como moneda
 * @param value - Valor numérico
 * @param currency - Símbolo de moneda
 * @param decimals - Número de decimales
 * @returns Valor formateado como moneda
 */
export const formatCurrency = (
  value?: number | null,
  currency = '€',
  decimals = 2
): string => {
  if (value === undefined || value === null) return '-';
  
  try {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${value.toFixed(decimals)} ${currency}`;
  }
};

/**
 * Trunca un texto si excede la longitud máxima
 * @param text - Texto a truncar
 * @param maxLength - Longitud máxima
 * @returns Texto truncado
 */
export const truncateText = (
  text?: string | null,
  maxLength = 50
): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Formatea un DNI/NIF con formato XX.XXX.XXX-X
 * @param dni - DNI sin formato
 * @returns DNI formateado
 */
export const formatDNI = (dni?: string | null): string => {
  if (!dni) return '';
  
  // Eliminar cualquier caracter no alfanumérico
  const cleanDni = dni.replace(/[^a-zA-Z0-9]/g, '');
  
  if (cleanDni.length !== 9) return dni;
  
  // Formato XX.XXX.XXX-X
  return `${cleanDni.substring(0, 2)}.${cleanDni.substring(2, 5)}.${cleanDni.substring(5, 8)}-${cleanDni.substring(8)}`;
};

/**
 * Convierte la primera letra de cada palabra a mayúscula
 * @param text - Texto a capitalizar
 * @returns Texto capitalizado
 */
export const capitalizeText = (text?: string | null): string => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};