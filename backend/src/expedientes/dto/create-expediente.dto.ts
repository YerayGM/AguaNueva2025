import { IsString, IsInt, IsOptional, IsDate, MaxLength, Matches, Min } from 'class-validator';

export class CreateExpedienteDto {
    @IsString()
    @Matches(/^[A-Z]{3}[0-9]{7}$/, {
        message: 'IdExpediente must match the format: 3 letters followed by 7 digits',
    })
    IdExpediente: string;

    @IsInt()
    Hoja: number;

    @IsString()
    @Matches(/^[0-9A-Za-z]{12}$/, {
        message: 'Dni must be exactly 12 alphanumeric characters',
    })
    Dni: string;

    @IsDate()
    @IsOptional()
    Fecha?: Date;

    @IsString()
    @MaxLength(50)
    Lugar: string;

    @IsString()
    @MaxLength(50)
    Localidad: string;

    @IsInt()
    IdMunicipio: number;

    @IsString()
    @MaxLength(50)
    ContadorNombre: string;

    @IsString()
    @MaxLength(30)
    ContadorPoliza: string;

    @IsString()
    @IsOptional()
    Observaciones?: string;

    @IsString()
    @MaxLength(50)
    Tecnico: string;

    @IsDate()
    @IsOptional()
    FechaInforme?: Date;

    @IsInt()
    @Min(0)
    Dias: number;

    @IsString()
    @IsOptional()
    ObservacionesTecnico?: string;

    @IsString()
    @IsOptional()
    TextoInforme?: string;
}
