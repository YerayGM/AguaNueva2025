import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createDatosExpedienteDto: CreateDatosExpedienteDto): Promise<DatosExpediente> {
    const datosExpediente = this.datosExpedientesRepository.create(createDatosExpedienteDto);
    return await this.datosExpedientesRepository.save(datosExpediente);
  }

  async findAll(): Promise<DatosExpediente[]> {
    return await this.datosExpedientesRepository.find();
  }

  async findOne(id: number): Promise<DatosExpediente> {
    const expediente = await this.datosExpedientesRepository.findOne({ 
      where: { ID: id } 
    });
    
    if (!expediente) {
      throw new NotFoundException(`No se encontró el expediente con ID ${id}`);
    }
    
    return expediente;
  }

  async findByFechas(fechaInicio?: Date, fechaFin?: Date): Promise<DatosExpediente[]> {
    if (!fechaInicio && !fechaFin) {
      throw new Error('Debe proporcionar al menos una fecha para realizar la búsqueda');
    }

    // Construimos el objeto de consulta de manera dinámica
    const queryBuilder = this.datosExpedientesRepository.createQueryBuilder('expediente');
    
    if (fechaInicio && fechaFin) {
      queryBuilder.where('expediente.FECHA BETWEEN :fechaInicio AND :fechaFin', { 
        fechaInicio, 
        fechaFin 
      });
    } else if (fechaInicio) {
      queryBuilder.where('expediente.FECHA >= :fechaInicio', { fechaInicio });
    } else if (fechaFin) {
      queryBuilder.where('expediente.FECHA <= :fechaFin', { fechaFin });
    }
    
    const expedientes = await queryBuilder.getMany();
    
    if (expedientes.length === 0) {
      let criterio = '';
      if (fechaInicio && fechaFin) {
        criterio = `entre ${fechaInicio.toISOString().split('T')[0]} y ${fechaFin.toISOString().split('T')[0]}`;
      } else if (fechaInicio) {
        criterio = `desde ${fechaInicio.toISOString().split('T')[0]}`;
      } else if (fechaFin) {
        criterio = `hasta ${fechaFin.toISOString().split('T')[0]}`;
      }
      throw new NotFoundException(`No se encontraron expedientes con fecha ${criterio}`);
    }
    
    return expedientes;
  }

  async findByDni(dni: string): Promise<DatosExpediente[]> {
    if (!dni) {
      throw new Error('Debe proporcionar un DNI para realizar la búsqueda');
    }
    
    // Usamos QueryBuilder para evitar problemas con la estructura de la entidad
    const expedientes = await this.datosExpedientesRepository
      .createQueryBuilder('expediente')
      .where('expediente.DNI = :dni', { dni })
      .getMany();
    
    if (expedientes.length === 0) {
      throw new NotFoundException(`No se encontraron expedientes para el DNI ${dni}`);
    }
    
    return expedientes;
  }

  async update(id: number, updateDatosExpedienteDto: UpdateDatosExpedienteDto): Promise<void> {
    const resultado = await this.datosExpedientesRepository.update(id, updateDatosExpedienteDto);
    
    if (resultado.affected === 0) {
      throw new NotFoundException(`No se encontró el expediente con ID ${id} para actualizar`);
    }
  }

  async remove(id: number): Promise<void> {
    const resultado = await this.datosExpedientesRepository.delete(id);
    
    if (resultado.affected === 0) {
      throw new NotFoundException(`No se encontró el expediente con ID ${id} para eliminar`);
    }
  }
}