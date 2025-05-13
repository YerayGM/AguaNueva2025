import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatosPer } from './entities/datos-per.entity';
import { Municipio } from '../municipios/entities/municipio.entity';
import { CreateDatosPerDto } from './dto/create-datos-per.dto';
import { UpdateDatosPerDto } from './dto/update-datos-per.dto';

@Injectable()
export class DatosPersonalesService {
  constructor(
    @InjectRepository(DatosPer)
    private readonly datosPerRepository: Repository<DatosPer>,
    @InjectRepository(Municipio)
    private readonly municipiosRepository: Repository<Municipio>,
  ) {}

  create(createDatosPerDto: CreateDatosPerDto) {
    const datosPer = this.datosPerRepository.create(createDatosPerDto);
    return this.datosPerRepository.save(datosPer);
  }

  findAll() {
    return this.datosPerRepository.find();
  }

  findOne(dni: string) {
    return this.datosPerRepository.findOne({ where: { DNI: dni } });
  }

  findByNombre(nombre: string, apellidos?: string) {
    const where: Partial<Pick<DatosPer, 'NOMBREC' | 'APELLIDOS'>> = { NOMBREC: nombre };
    if (apellidos) {
      where.APELLIDOS = apellidos;
    }
    return this.datosPerRepository.find({ where });
  }

  async findByMunicipio(idMunicipio: number) {
    const municipio = await this.municipiosRepository.findOne({ where: { ID_MUN: idMunicipio } });
    if (!municipio) {
      throw new Error(`No se encontró el municipio con ID ${idMunicipio}`);
    }
    return this.datosPerRepository.find({ where: { LOCALIDAD: municipio.MUNICIPIO } });
  }

  update(dni: string, updateDatosPerDto: UpdateDatosPerDto) {
    return this.datosPerRepository.update(dni, updateDatosPerDto);
  }

  remove(dni: string) {
    return this.datosPerRepository.delete(dni);
  }
}