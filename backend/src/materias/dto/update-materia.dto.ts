import { PartialType } from '@nestjs/swagger';
import { CreateMateriaDto } from './create-materia.dto';
import { IsString, IsInt, Min } from 'class-validator';

export class UpdateMateriaDto extends PartialType(CreateMateriaDto) {
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
