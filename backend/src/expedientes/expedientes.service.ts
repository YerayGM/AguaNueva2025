import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expediente } from './entities/expedientes.entity';
import { Municipio } from '../municipios/entities/municipio.entity';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { UpdateExpedienteDto } from './dto/update-expediente.dto';

@Injectable()
export class ExpedientesService {
  constructor(
    @InjectRepository(Expediente)
    private readonly expedientesRepository: Repository<Expediente>,
    @InjectRepository(Municipio)
    private readonly municipiosRepository: Repository<Municipio>,
  ) {}

  create(createExpedienteDto: CreateExpedienteDto) {
    const expediente = this.expedientesRepository.create(createExpedienteDto);
    return this.expedientesRepository.save(expediente);
  }

  findAll() {
    return this.expedientesRepository.find();
  }

  findOne(id: number) {
    return this.expedientesRepository.findOne({ where: { ID: id } });
  }

  findByDni(dni: string) {
    return this.expedientesRepository.find({ where: { DNI: dni } });
  }

  async findByMunicipio(idMunicipio: number) {
    const municipio = await this.municipiosRepository.findOne({ where: { ID_MUN: idMunicipio } });
    if (!municipio) {
      throw new Error(`No se encontró el municipio con ID ${idMunicipio}`);
    }
    return this.expedientesRepository.find({ where: { LOCALIDAD: municipio.MUNICIPIO } });
  }

  update(id: number, updateExpedienteDto: UpdateExpedienteDto) {
    return this.expedientesRepository.update(id, updateExpedienteDto);
  }

  remove(id: number) {
    return this.expedientesRepository.delete(id);
  }
}