import { IsDate, IsString, MinLength, MaxLength, IsEmail, IsEnum, IsBoolean, IsOptional, IsInt, Min, Matches } from 'class-validator';

export class CreateDatosPersonaleDto {
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    Nombre: string;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    Apellidos: string;

    @IsString()
    @Matches(/^[0-9XYZxyz][0-9]{7}[A-Za-z]$/, {
        message: 'Dni must match the format: 1 letter followed by 7 digits and 1 letter',
    })
    Dni: string;

    @IsString()
    @Matches(/^[0-9]{9}$/, {
        message: 'Telefono must be exactly 9 digits',
    })
    Telefono: string;

    @IsString()
    @IsEmail()
    @MaxLength(100)
    Email: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    Direccion?: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    Localidad?: string;

    @IsString()
    @Matches(/^[0-9]{5}$/, {
        message: 'CodigoPostal must be exactly 5 digits',
    })
    CodigoPostal: string;

    @IsInt()
    IdMunicipio: number;

    @IsEnum(['si', 'no'])
    ActividadAgropecuaria: 'si' | 'no' = 'no';

    @IsBoolean()
    @IsOptional()
    PersonaFiscal?: boolean;

    @IsBoolean()
    @IsOptional()
    PersonaJuridica?: boolean;

    @IsBoolean()
    @IsOptional()
    AgricultorProfesional?: boolean;

    @IsBoolean()
    @IsOptional()
    AgricultorlTiempoParcial?: boolean;

    @IsBoolean()
    @IsOptional()
    TrabajadorAsalariado?: boolean;

    @IsInt()
    @Min(0)
    @IsOptional()
    NumeroAsalariados?: number;

    @IsBoolean()
    @IsOptional()
    DiscapacidadAgricultorProfesional?: boolean;

    @IsInt()
    @Min(0)
    @IsOptional()
    NumeroAgriculresProfesionales?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    NumeroTrabajadoresAsalariados?: number;

    @IsDate()
    @IsOptional()
    FechaCreacion?: Date;
}
