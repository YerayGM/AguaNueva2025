import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatosExpediente } from './entities/datos-expedientes.entity';
import { CreateDatosExpedienteDto } from './dto/create-datos-expediente.dto';
import { UpdateDatosExpedienteDto } from './dto/update-datos-expediente.dto';

@Injectable()
export class DatosExpedientesService {
  constructor(
    @InjectRepository(DatosExpediente)
    private readonly datosExpedientesRepository: Repository<DatosExpediente>,
  ) {}

  create(createDatosExpedienteDto: CreateDatosExpedienteDto) {
    const datosExpediente = this.datosExpedientesRepository.create(createDatosExpedienteDto);
    return this.datosExpedientesRepository.save(datosExpediente);
  }

  findAll() {
    return this.datosExpedientesRepository.find();
  }

  findOne(id: number) {
    return this.datosExpedientesRepository.findOne({ where: { ID: id } });
  }

  update(id: number, updateDatosExpedienteDto: UpdateDatosExpedienteDto) {
    return this.datosExpedientesRepository.update(id, updateDatosExpedienteDto);
  }

  remove(id: number) {
    return this.datosExpedientesRepository.delete(id);
  }
}