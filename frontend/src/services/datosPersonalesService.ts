import api from './api';
import type { DatosPersonales } from '../types';

// Obtener todos los datos personales
export async function getDatosPersonales(): Promise<DatosPersonales[]> {
  return api.get<DatosPersonales[]>('/datos-personales');
}

// Obtener datos personales por DNI
export async function getDatosPersonalesByDni(dni: string): Promise<DatosPersonales> {
  return api.get<DatosPersonales>(`/datos-personales/dni/${dni}`);
}

// Buscar datos personales por nombre y/o apellidos
export async function searchDatosPersonales(nombre?: string, apellidos?: string): Promise<DatosPersonales[]> {
  const params: Record<string, string> = {};
  if (nombre) params.nombre = nombre;
  if (apellidos) params.apellidos = apellidos;
  
  return api.get<DatosPersonales[]>('/datos-personales/buscar', params);
}

// Obtener datos personales por municipio
export async function getDatosPersonalesByMunicipio(idMunicipio: number): Promise<DatosPersonales[]> {
  return api.get<DatosPersonales[]>(`/datos-personales/municipio/${idMunicipio}`);
}

// Crear nuevos datos personales
export async function createDatosPersonales(datos: Partial<DatosPersonales>): Promise<DatosPersonales> {
  return api.post<DatosPersonales>('/datos-personales', datos);
}

// Actualizar datos personales existentes
export async function updateDatosPersonales(dni: string, datos: Partial<DatosPersonales>): Promise<DatosPersonales> {
  // Crear una copia para no modificar el original
  const datosFormateados = { ...datos };
  
  // Asegurar que los campos numéricos sean efectivamente números
  if (datosFormateados.TELEFONO && typeof datosFormateados.TELEFONO === 'string') {
    datosFormateados.TELEFONO = (parseInt(datosFormateados.TELEFONO, 10) || 0).toString();
  }
  
  if (datosFormateados.NUM_ASAL && typeof datosFormateados.NUM_ASAL === 'string') {
    datosFormateados.NUM_ASAL = parseInt(datosFormateados.NUM_ASAL, 10) || 0;
  }
  
  if (datosFormateados.NUM_AGRI_PROF && typeof datosFormateados.NUM_AGRI_PROF === 'string') {
    datosFormateados.NUM_AGRI_PROF = parseInt(datosFormateados.NUM_AGRI_PROF, 10) || 0;
  }
  
  if (datosFormateados.NUM_TRAB_ASAL && typeof datosFormateados.NUM_TRAB_ASAL === 'string') {
    datosFormateados.NUM_TRAB_ASAL = parseInt(datosFormateados.NUM_TRAB_ASAL, 10) || 0;
  }
  
  if (datosFormateados.ID_MUN && typeof datosFormateados.ID_MUN === 'string') {
    datosFormateados.ID_MUN = parseInt(datosFormateados.ID_MUN, 10) || 0;
  }
  
  // Verificar y eliminar campos no esperados por el backend
  // En ocasiones, el backend rechaza propiedades extra
  const camposPermitidos = [
    'DNI', 'APELLIDOS', 'NOMBREC', 'DIRECCION', 'LOCALIDAD', 'ID_MUN',
    'TELEFONO', 'EMAIL', 'ACTIVIDADAGROPEC', 'PER_FIS', 'PER_JUR',
    'AGRI_PRO', 'AGRI_PARCIAL', 'TRAB_ASAL', 'NUM_ASAL', 'DIS_AGRI_PROF',
    'NUM_AGRI_PROF', 'NUM_TRAB_ASAL'
  ];
  
  const datosLimpios: Partial<DatosPersonales> = {};
  camposPermitidos.forEach(campo => {
    if (campo in datosFormateados) {
      datosLimpios[campo as keyof DatosPersonales] = datosFormateados[campo as keyof DatosPersonales] as any;
    }
  });
  
  // Para depuración
  console.log("Datos enviados al backend:", datosLimpios);
  
  return api.patch<DatosPersonales>(`/datos-personales/${dni}`, datosLimpios);
}

// Eliminar datos personales
export async function deleteDatosPersonales(dni: string): Promise<void> {
  return api.delete<void>(`/datos-personales/${dni}`);
}