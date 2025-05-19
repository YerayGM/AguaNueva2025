// Interfaz para datos personales
export interface DatosPersonales {
  DNI: string
  APELLIDOS: string
  NOMBREC?: string
  DIRECCION?: string
  LOCALIDAD?: string
  ID_MUN: number
  TELEFONO?: string
  EMAIL: string
  ACTIVIDADAGROPEC: string
  PER_FIS?: boolean
  PER_JUR?: boolean
  AGRI_PRO?: boolean
  AGRI_PARCIAL?: boolean
  TRAB_ASAL?: boolean
  NUM_ASAL?: number
  DIS_AGRI_PROF?: boolean
  NUM_AGRI_PROF?: number
  NUM_TRAB_ASAL?: number
  DUMMY?: Date
}

// Interfaz para expedientes
export interface Expediente {
  ID: number
  EXPEDIENTE: string
  HOJA: number
  DNI: string
  FECHA: string
  LUGAR: string
  LOCALIDAD: string
  ID_MUN: number
  CONT_NOMBRE: string
  CONT_POLIZA: string
  OBSER: string
  TECNICO: string
  FECHA_I: string
  DIAS: number
  OB_TEC: string
  TXT_INFORME: string
  DUMMY?: string
}

// Interfaz para datos de expedientes
export interface DatosExpediente {
  ID: number
  EXPEDIENTE: string
  HOJA: number
  ORDEN: number
  CULTIVO?: string
  POLIGONO?: number
  PARCELA?: number
  RECINTO?: string
  ID_MATERIA: number
  MULTIPLICADOR: number
  MINIMO: number
  MAXIMO: number
  CANTIDAD: number
  CANTIDAD_I: number
  DESDE: string
  HASTA: string
  CUATRI?: number
  DUMMY?: string
}

// Interfaz para materias
export interface Materia {
  ID: number
  ORDEN: number
  TIPO: string
  MATERIA: string
  MULTIPLICADOR: number
  MINIMO: number
  MAXIMO: number
  DUMMY?: string
}

// Interfaz para municipios
export interface Municipio {
  ID_MUN: number
  MUNICIPIO: string
  DUMMY?: string
}

// Interfaz para contadores
export interface Contador {
  ID: number
  CONTADOR: number
  DUMMY?: string
}

// Tipos para formularios
export type FormMode = 'create' | 'edit' | 'view'