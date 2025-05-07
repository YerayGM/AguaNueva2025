import { PartialType } from '@nestjs/swagger';
import { CreateMunicipioDto } from './create-municipio.dto';
import { IsString } from 'class-validator';

export class UpdateMunicipioDto extends PartialType(CreateMunicipioDto) {
    @IsString()
    municipio: string;
}
