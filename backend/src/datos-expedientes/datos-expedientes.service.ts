import { Injectable } from '@nestjs/common';
import { CreateDatosExpedienteDto } from './dto/create-datos-expediente.dto';
import { UpdateDatosExpedienteDto } from './dto/update-datos-expediente.dto';

@Injectable()
export class DatosExpedientesService {
  create(createDatosExpedienteDto: CreateDatosExpedienteDto) {
    return 'This action adds a new datosExpediente';
  }

  findAll() {
    return `This action returns all datosExpedientes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datosExpediente`;
  }

  update(id: number, updateDatosExpedienteDto: UpdateDatosExpedienteDto) {
    return `This action updates a #${id} datosExpediente`;
  }

  remove(id: number) {
    return `This action removes a #${id} datosExpediente`;
  }
}
