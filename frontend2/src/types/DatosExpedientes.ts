export interface DatosExpediente {
  ID: number;
  EXPEDIENTE: string;
  HOJA: number;
  ORDEN: number;
  CULTIVO?: string;
  POLIGONO?: number;
  PARCELA?: number;
  RECINTO?: string;
  ID_MATERIA: number;
  MULTIPLICADOR: number;
  MINIMO: number;
  MAXIMO: number;
  CANTIDAD: number;
  CANTIDAD_I: number;
  DESDE: string;
  HASTA: string;
  CUATRI?: number;
}