import { IsDate, IsNumber, IsOptional, IsPositive, IsString, MinLength, ValidateIf } from 'class-validator';

export class CreateDatosExpedienteDto {

    @IsNumber()
    @IsPositive()
    Hoja: number; // Maps to Hoja INT NOT NULL DEFAULT 0

    @IsNumber()
    @IsPositive()
    Orden: number; // Maps to Orden INT NOT NULL DEFAULT 0 CHECK (Orden >= 0)

    @IsString()
    @MinLength(3)
    @IsOptional()
    Cultivo?: string; // Maps to Cultivo VARCHAR(100) DEFAULT NULL

    @IsNumber()
    @IsPositive()
    @IsOptional()
    Poligono?: number; // Maps to Poligono INT DEFAULT NULL CHECK (Poligono IS NULL OR Poligono > 0)

    @IsNumber()
    @IsPositive()
    @IsOptional()
    Parcela?: number; // Maps to Parcela INT DEFAULT NULL CHECK (Parcela IS NULL OR Parcela > 0)

    @IsString()
    @MinLength(5)
    @IsOptional()
    Recinto?: string; // Maps to Recinto VARCHAR(255) DEFAULT NULL

    @IsNumber()
    @IsPositive()
    IdMateria: number; // Maps to IdMateria INT NOT NULL

    @IsNumber()
    @IsPositive()
    Multiplicador: number; // Maps to Multiplicador DOUBLE NOT NULL DEFAULT 0 CHECK (Multiplicador >= 0)

    @IsNumber()
    @IsPositive()
    Minimo: number; // Maps to Minimo INT NOT NULL DEFAULT 0 CHECK (Minimo >= 0)

    @IsNumber()
    @IsPositive()
    Maximo: number; // Maps to Maximo INT NOT NULL DEFAULT 0

    @IsNumber()
    @IsPositive()
    Cantidad: number; // Maps to Cantidad INT NOT NULL DEFAULT 0

    @IsNumber()
    @IsPositive()
    CantidadInicial: number; // Maps to CantidadInicial INT NOT NULL DEFAULT 0 CHECK (CantidadInicial >= 0)

    @IsDate()
    Desde: Date; // Maps to Desde DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP

    @IsDate()
    @IsOptional()
    @ValidateIf((o: CreateDatosExpedienteDto) => o.Hasta == null || o.Hasta > o.Desde)
    Hasta?: Date | null; // Maps to Hasta DATETIME DEFAULT NULL with CHECK (Hasta IS NULL OR Hasta > Desde)

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @ValidateIf((o: CreateDatosExpedienteDto) => o.Cuatrimestre == null || (o.Cuatrimestre >= 1 && o.Cuatrimestre <= 3))
    Cuatrimestre?: number; // Maps to Cuatrimestre TINYINT DEFAULT NULL CHECK (Cuatrimestre IS NULL OR (Cuatrimestre BETWEEN 1 AND 3))

}
