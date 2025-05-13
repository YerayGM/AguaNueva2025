import { IsNotEmpty, IsString, IsNumber, IsInt } from 'class-validator';

export class CreateMateriaDto {
  @IsNotEmpty()
  @IsInt()
  ORDEN: number;

  @IsNotEmpty()
  @IsString()
  TIPO: string;

  @IsNotEmpty()
  @IsString()
  MATERIA: string;

  @IsNotEmpty()
  @IsNumber()
  MULTIPLICADOR: number;

  @IsNotEmpty()
  @IsNumber()
  MINIMO: number;

  @IsNotEmpty()
  @IsNumber()
  MAXIMO: number;
}