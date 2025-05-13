import { IsString, IsNumber, Min, Length } from 'class-validator';

export class CreateMateriaDto {
  @IsNumber()
  @Min(0)
  orden: number;

  @IsString()
  @Length(2, 50)
  tipo: string;

  @IsString()
  @Length(2, 30)
  materia: string;

  @IsNumber()
  @Min(0)
  multiplicador: number;

  @IsNumber()
  @Min(0)
  minimo: number;

  @IsNumber()
  maximo: number;
}