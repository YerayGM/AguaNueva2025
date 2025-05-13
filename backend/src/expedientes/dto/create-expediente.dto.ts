import { IsString, IsDateString, IsInt, IsOptional, Length, Min } from 'class-validator';

export class CreateExpedienteDto {
  @IsString()
  @Length(10, 10)
  idExpediente: string;

  @IsInt()
  @Min(0)
  hoja: number;

  @IsString()
  @Length(12, 12)
  dni: string;

  @IsDateString()
  fecha: string;

  @IsString()
  @Length(0, 50)
  lugar: string;

  @IsString()
  @Length(0, 50)
  localidad: string;

  @IsInt()
  idMunicipio: number;

  @IsString()
  @Length(0, 50)
  contadorNombre: string;

  @IsString()
  @Length(0, 30)
  contadorPoliza: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsString()
  @Length(0, 50)
  tecnico: string;

  @IsDateString()
  fechaInforme: string;

  @IsOptional()
  @IsString()
  observacionesTecnico?: string;

  @IsOptional()
  @IsString()
  textoInforme?: string;
}