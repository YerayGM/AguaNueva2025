export interface DatosPersonales {
  DNI: string;
  APELLIDOS: string;
  NOMBREC?: string;
  DIRECCION?: string;
  LOCALIDAD?: string;
  ID_MUN: number;
  TELEFONO?: string;
  EMAIL: string;
  ACTIVIDADAGROPEC: string;
  PER_FIS?: boolean;
  PER_JUR?: boolean;
  AGRI_PRO?: boolean;
  AGRI_PARCIAL?: boolean;
  TRAB_ASAL?: boolean;
  NUM_ASAL?: number;
  DIS_AGRI_PROF?: boolean;
  NUM_AGRI_PROF?: number;
  NUM_TRAB_ASAL?: number;
}