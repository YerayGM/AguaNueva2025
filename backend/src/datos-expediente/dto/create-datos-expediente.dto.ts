import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDatosExpedienteDto {
  @ApiProperty({ description: 'Número de orden' })
  @IsNotEmpty()
  @IsNumber()
  orden: number;

  @ApiPropertyOptional({ description: 'Tipo de cultivo' })
  @IsOptional()
  @IsString()
  cultivo?: string;

  @ApiPropertyOptional({ description: 'Número de polígono' })
  @IsOptional()
  @IsString()
  poligono?: string;

  @ApiPropertyOptional({ description: 'Número de parcela' })
  @IsOptional()
  @IsString()
  parcela?: string;

  @ApiPropertyOptional({ description: 'Número de recinto' })
  @IsOptional()
  @IsString()
  recinto?: string;

  @ApiPropertyOptional({ description: 'ID de la materia' })
  @IsOptional()
  @IsNumber()
  idMateria?: number;

  @ApiPropertyOptional({ description: 'Multiplicador' })
  @IsOptional()
  @IsNumber()
  multiplicador?: number;

  @ApiPropertyOptional({ description: 'Valor mínimo' })
  @IsOptional()
  @IsNumber()
  minimo?: number;

  @ApiPropertyOptional({ description: 'Valor máximo' })
  @IsOptional()
  @IsNumber()
  maximo?: number;

  @ApiPropertyOptional({ description: 'Cantidad' })
  @IsOptional()
  @IsNumber()
  cantidad?: number;

  @ApiPropertyOptional({ description: 'Cantidad_I' })
  @IsOptional()
  @IsNumber()
  cantidadI?: number;

  @ApiPropertyOptional({ description: 'Fecha desde', example: '2025-01-01' })
  @IsOptional()
  @IsDateString()
  desde?: string;

  @ApiPropertyOptional({ description: 'Fecha hasta', example: '2025-12-31' })
  @IsOptional()
  @IsDateString()
  hasta?: string;

  @ApiPropertyOptional({ description: 'Cuatrimestre' })
  @IsOptional()
  @IsNumber()
  cuatrimestre?: number;
}