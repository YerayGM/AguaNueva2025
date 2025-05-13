import { PartialType } from '@nestjs/swagger';
import { CreateDatosExpedienteDto } from './create-datos-expediente.dto';

export class UpdateDatosExpedienteDto extends PartialType(CreateDatosExpedienteDto) {}