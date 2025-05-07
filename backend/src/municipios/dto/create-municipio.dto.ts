import { IsString } from 'class-validator';

export class CreateMunicipioDto {
    @IsString()
    municipio: string;
}
