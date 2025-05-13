import { IsNotEmpty, IsOptional, IsString, IsEmail, IsInt } from 'class-validator';

export class CreateDatosPerDto {
  @IsNotEmpty()
  @IsString()
  DNI: string;

  @IsNotEmpty()
  @IsString()
  APELLIDOS: string;

  @IsOptional()
  @IsString()
  NOMBREC?: string;

  @IsOptional()
  @IsString()
  DIRECCION?: string;

  @IsOptional()
  @IsString()
  LOCALIDAD?: string;

  @IsNotEmpty()
  @IsInt()
  ID_MUN: number;

  @IsOptional()
  @IsString()
  TELEFONO?: string;

  @IsNotEmpty()
  @IsEmail()
  EMAIL: string;

  @IsNotEmpty()
  @IsString()
  ACTIVIDADAGROPEC: string;

  @IsOptional()
  PER_FIS?: boolean;

  @IsOptional()
  PER_JUR?: boolean;

  @IsOptional()
  AGRI_PRO?: boolean;

  @IsOptional()
  AGRI_PARCIAL?: boolean;

  @IsOptional()
  TRAB_ASAL?: boolean;

  @IsOptional()
  NUM_ASAL?: number;

  @IsOptional()
  DIS_AGRI_PROF?: boolean;

  @IsOptional()
  NUM_AGRI_PROF?: number;

  @IsOptional()
  NUM_TRAB_ASAL?: number;
}