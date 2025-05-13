import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateExpedienteDto {
  @IsNotEmpty()
  @IsString()
  EXPEDIENTE: string;

  @IsNotEmpty()
  @IsInt()
  HOJA: number;

  @IsNotEmpty()
  @IsString()
  DNI: string;

  @IsOptional()
  @IsString()
  FECHA?: string;

  @IsNotEmpty()
  @IsString()
  LUGAR: string;

  @IsNotEmpty()
  @IsString()
  LOCALIDAD: string;

  @IsNotEmpty()
  @IsInt()
  ID_MUN: number;

  @IsNotEmpty()
  @IsString()
  CONT_NOMBRE: string;

  @IsNotEmpty()
  @IsString()
  CONT_POLIZA: string;

  @IsOptional()
  @IsString()
  OBSER?: string;

  @IsOptional()
  @IsString()
  TECNICO?: string;

  @IsOptional()
  @IsString()
  FECHA_I?: string;

  @IsOptional()
  @IsInt()
  DIAS?: number;

  @IsOptional()
  @IsString()
  OB_TEC?: string;

  @IsOptional()
  @IsString()
  TXT_INFORME?: string;
}