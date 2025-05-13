import { PartialType } from '@nestjs/swagger';
import { CreateDatosPerDto } from './create-datos-per.dto';

export class UpdateDatosPerDto extends PartialType(CreateDatosPerDto) {}