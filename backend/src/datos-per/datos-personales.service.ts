import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createDatosPerDto: CreateDatosPerDto): Promise<DatosPer> {
    const datosPer = this.datosPerRepository.create(createDatosPerDto);
    return await this.datosPerRepository.save(datosPer);
  }

  async findAll(): Promise<DatosPer[]> {
    return await this.datosPerRepository.find();
  }

  async findOne(dni: string): Promise<DatosPer> {
    const datosPer = await this.datosPerRepository.findOne({ 
      where: { DNI: dni } 
    });
    
    if (!datosPer) {
      throw new NotFoundException(`No se encontró ningún registro con DNI ${dni}`);
    }
    
    return datosPer;
  }

  async findByNombre(nombre?: string, apellidos?: string): Promise<DatosPer[]> {
    if (!nombre && !apellidos) {
      throw new Error('Debe proporcionar al menos un criterio de búsqueda: nombre o apellidos');
    }
    
    const where: Partial<Pick<DatosPer, 'NOMBREC' | 'APELLIDOS'>> = {};
    
    if (nombre) {
      where.NOMBREC = nombre;
    }
    
    if (apellidos) {
      where.APELLIDOS = apellidos;
    }
    
    const datos = await this.datosPerRepository.find({ where });
    
    if (datos.length === 0) {
      let criterio = '';
      if (nombre && apellidos) {
        criterio = `nombre "${nombre}" y apellidos "${apellidos}"`;
      } else if (nombre) {
        criterio = `nombre "${nombre}"`;
      } else {
        criterio = `apellidos "${apellidos}"`;
      }
      throw new NotFoundException(`No se encontraron registros con ${criterio}`);
    }
    
    return datos;
  }

  async findByMunicipio(idMunicipio: number): Promise<DatosPer[]> {
    const municipio = await this.municipiosRepository.findOne({ 
      where: { ID_MUN: idMunicipio } 
    });
    
    if (!municipio) {
      throw new NotFoundException(`No se encontró el municipio con ID ${idMunicipio}`);
    }
    
    const datos = await this.datosPerRepository.find({ 
      where: { LOCALIDAD: municipio.MUNICIPIO } 
    });
    
    if (datos.length === 0) {
      throw new NotFoundException(`No se encontraron registros en el municipio "${municipio.MUNICIPIO}"`);
    }
    
    return datos;
  }

  async update(dni: string, updateDatosPerDto: UpdateDatosPerDto): Promise<void> {
    const resultado = await this.datosPerRepository.update(dni, updateDatosPerDto);
    
    if (resultado.affected === 0) {
      throw new NotFoundException(`No se encontró ningún registro con DNI ${dni} para actualizar`);
    }
  }

  async remove(dni: string): Promise<void> {
    const resultado = await this.datosPerRepository.delete(dni);
    
    if (resultado.affected === 0) {
      throw new NotFoundException(`No se encontró ningún registro con DNI ${dni} para eliminar`);
    }
  }
}