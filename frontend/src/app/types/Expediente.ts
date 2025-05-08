import { DatosPersonales } from './DatosPersonales';
import { Municipio } from './DatosPersonales';

export interface Expediente {
  IdExpediente: string;
  Hoja: number;
  DatosPersonales: DatosPersonales;
  Fecha: Date;
  Lugar: string;
  Localidad: string;
  Municipio: Municipio;
  ContadorNombre: string;
  ContadorPoliza: string;
  Observaciones: string | null;
  Tecnico: string;
  FechaInforme: Date;
  Dias: number;
  ObservacionesTecnico: string | null;
  TextoInforme: string | null;
}

export interface CreateExpedienteDto {
  IdExpediente: string;
  Dni: string;
  Fecha: string;
  Lugar: string;
  Localidad: string;
  IdMunicipio: string;
  ContadorNombre: string;
  ContadorPoliza: string;
  Observaciones?: string;
  Tecnico: string;
  FechaInforme: string;
  ObservacionesTecnico?: string;
}
