export interface Expediente {
  ID: number;
  EXPEDIENTE: string;
  HOJA: number;
  DNI: string;
  FECHA: string;
  LUGAR: string;
  LOCALIDAD: string;
  ID_MUN: number;
  CONT_NOMBRE: string;
  CONT_POLIZA: string;
  OBSER?: string;
  TECNICO?: string;
  FECHA_I?: string;
  DIAS?: number;
  OB_TEC?: string;
  TXT_INFORME?: string;
}