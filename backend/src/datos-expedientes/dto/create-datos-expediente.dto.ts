import { IsNotEmpty, IsOptional, IsString, IsInt, IsNumber } from 'class-validator';

export class CreateDatosExpedienteDto {
  @IsNotEmpty()
  @IsString()
  EXPEDIENTE: string;

  @IsNotEmpty()
  @IsInt()
  HOJA: number;

  @IsNotEmpty()
  @IsInt()
  ORDEN: number;

  @IsOptional()
  @IsString()
  CULTIVO?: string;

  @IsOptional()
  @IsInt()
  POLIGONO?: number;

  @IsOptional()
  @IsInt()
  PARCELA?: number;

  @IsOptional()
  @IsString()
  RECINTO?: string;

  @IsNotEmpty()
  @IsInt()
  ID_MATERIA: number;

  @IsNotEmpty()
  @IsNumber()
  MULTIPLICADOR: number;

  @IsNotEmpty()
  @IsInt()
  MINIMO: number;

  @IsNotEmpty()
  @IsInt()
  MAXIMO: number;

  @IsNotEmpty()
  @IsInt()
  CANTIDAD: number;

  @IsNotEmpty()
  @IsInt()
  CANTIDAD_I: number;

  @IsNotEmpty()
  @IsString()
  DESDE: string;

  @IsNotEmpty()
  @IsString()
  HASTA: string;

  @IsOptional()
  @IsInt()
  CUATRI?: number;
}