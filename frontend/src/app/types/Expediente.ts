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
