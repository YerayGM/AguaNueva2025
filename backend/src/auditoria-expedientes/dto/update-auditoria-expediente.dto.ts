import { PartialType } from '@nestjs/swagger';
import { CreateAuditoriaExpedienteDto } from './create-auditoria-expediente.dto';

export class UpdateAuditoriaExpedienteDto extends PartialType(CreateAuditoriaExpedienteDto) {}
