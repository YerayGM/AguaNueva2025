import { PartialType } from '@nestjs/swagger';
import { CreateDatosPersonaleDto } from './create-datos-personale.dto';

export class UpdateDatosPersonaleDto extends PartialType(CreateDatosPersonaleDto) {}
