import { IsString, IsInt, Min } from 'class-validator';

export class CreateMateriaDto {
    @IsInt()
    orden: number;

    @IsString()
    tipo: string;

    @IsString()
    materia: string;

    @IsInt()
    @Min(0)
    multiplicador: number;

    @IsInt()
    @Min(0)
    minimo: number;

    @IsInt()
    @Min(0)
    maximo: number;
}
