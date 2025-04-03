import { IsNotEmpty, IsString, IsDateString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDatosExpedienteDto } from '../../datos-expediente/dto/create-datos-expediente.dto';

export class CreateExpedienteDto {
  @ApiProperty({ description: 'Número de expediente' })
  @IsNotEmpty()
  @IsString()
  expediente: string;

  @ApiProperty({ description: 'Número de hoja' })
  @IsNotEmpty()
  @IsString()
  hoja: string;

  @ApiProperty({ description: 'DNI del propietario' })
  @IsNotEmpty()
  @IsString()
  dni: string;

  @ApiProperty({ description: 'Fecha del expediente', example: '2025-01-01' })
  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @ApiPropertyOptional({ description: 'Lugar' })
  @IsOptional()
  @IsString()
  lugar?: string;

  @ApiPropertyOptional({ description: 'Localidad' })
  @IsOptional()
  @IsString()
  localidad?: string;

  @ApiPropertyOptional({ description: 'ID del municipio' })
  @IsOptional()
  @IsNumber()
  idMunicipio?: number;

  @ApiPropertyOptional({ description: 'Nombre del contador' })
  @IsOptional()
  @IsString()
  contadorNombre?: string;

  @ApiPropertyOptional({ description: 'Póliza del contador' })
  @IsOptional()
  @IsString()
  contadorPoliza?: string;

  @ApiPropertyOptional({ description: 'Observaciones' })
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiPropertyOptional({ description: 'Técnico asignado' })
  @IsOptional()
  @IsString()
  tecnico?: string;

  @ApiPropertyOptional({ description: 'Detalles del expediente', type: [CreateDatosExpedienteDto] })
  @IsOptional()
  @IsArray()
  datosExpediente?: CreateDatosExpedienteDto[];
}