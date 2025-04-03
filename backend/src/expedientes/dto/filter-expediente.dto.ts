import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterExpedienteDto {
  @ApiPropertyOptional({ description: 'DNI del propietario' })
  @IsOptional()
  @IsString()
  dni?: string;

  @ApiPropertyOptional({ description: 'Nombre del propietario' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ description: 'Apellidos del propietario' })
  @IsOptional()
  @IsString()
  apellidos?: string;

  @ApiPropertyOptional({ description: 'Fecha desde', example: '2025-01-01' })
  @IsOptional()
  @IsDateString()
  fechaDesde?: string;

  @ApiPropertyOptional({ description: 'Fecha hasta', example: '2025-12-31' })
  @IsOptional()
  @IsDateString()
  fechaHasta?: string;

  @ApiPropertyOptional({ description: 'Municipio' })
  @IsOptional()
  @IsString()
  municipio?: string;

  @ApiPropertyOptional({ description: 'Localidad' })
  @IsOptional()
  @IsString()
  localidad?: string;

  @ApiPropertyOptional({ description: 'Técnico' })
  @IsOptional()
  @IsString()
  tecnico?: string;
}