import { Injectable } from '@nestjs/common';
import { CreateAuditoriaExpedienteDto } from './dto/create-auditoria-expediente.dto';
import { UpdateAuditoriaExpedienteDto } from './dto/update-auditoria-expediente.dto';

@Injectable()
export class AuditoriaExpedientesService {
  create(createAuditoriaExpedienteDto: CreateAuditoriaExpedienteDto) {
    return 'This action adds a new auditoriaExpediente';
  }

  findAll() {
    return `This action returns all auditoriaExpedientes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auditoriaExpediente`;
  }

  update(id: number, updateAuditoriaExpedienteDto: UpdateAuditoriaExpedienteDto) {
    return `This action updates a #${id} auditoriaExpediente`;
  }

  remove(id: number) {
    return `This action removes a #${id} auditoriaExpediente`;
  }
}
