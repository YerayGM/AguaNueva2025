export interface Municipio {
  id: number;
  nombre: string;
}

export interface DatosPersonales {
  dni: string;
  nombre: string;
  apellidos: string;
  direccion: string | null;
  localidad: string | null;
  municipio: Municipio;
  telefono: string | null;
  email: string;
  actividadAgropecuaria: 'si' | 'no';
  personaFiscal: boolean | null;
  personaJuridica: boolean | null;
  agricultorProfesional: boolean | null;
  agricultorlTiempoParcial: boolean | null;
  trabajadorAsalariado: boolean | null;
  numeroasAlariados: number | null;
  discapacidadAgricultorProfesional: boolean | null;
  numeroAgriculresProfesionales: number | null;
  numeroTrabajadoresAsalariados: number | null;
  fechaCreacion: Date;
}
