import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createExpedienteDto: CreateExpedienteDto): Promise<Expediente> {
    const expediente = this.expedientesRepository.create(createExpedienteDto);
    return await this.expedientesRepository.save(expediente);
  }

  async findAll(): Promise<Expediente[]> {
    return await this.expedientesRepository.find();
  }

  async findOne(expedienteCodigo: string): Promise<Expediente> {
    const expediente = await this.expedientesRepository.findOne({ 
      where: { EXPEDIENTE: expedienteCodigo } as any
    });
    
    if (!expediente) {
      throw new NotFoundException(`No se encontró el expediente con código ${expedienteCodigo}`);
    }
    
    return expediente;
  }

  async findById(id: number): Promise<Expediente> {
    const expediente = await this.expedientesRepository.findOne({ 
      where: { ID: id } as any
    });
    
    if (!expediente) {
      throw new NotFoundException(`No se encontró el expediente con ID ${id}`);
    }
    
    return expediente;
  }

  async findByDni(dni: string): Promise<Expediente[]> {
    if (!dni) {
      throw new Error('Debe proporcionar un DNI para realizar la búsqueda');
    }
    
    // Usamos QueryBuilder para evitar problemas con el sistema de tipos
    const expedientes = await this.expedientesRepository
      .createQueryBuilder('expediente')
      .where('expediente.DNI = :dni', { dni })
      .getMany();
    
    if (expedientes.length === 0) {
      throw new NotFoundException(`No se encontraron expedientes para el DNI ${dni}`);
    }
    
    return expedientes;
  }

  async findByMunicipio(idMunicipio: number): Promise<Expediente[]> {
    const municipio = await this.municipiosRepository.findOne({ 
      where: { ID_MUN: idMunicipio } as any
    });
    
    if (!municipio) {
      throw new NotFoundException(`No se encontró el municipio con ID ${idMunicipio}`);
    }
    
    // Usamos QueryBuilder para evitar problemas con el sistema de tipos
    const expedientes = await this.expedientesRepository
      .createQueryBuilder('expediente')
      .where('expediente.LOCALIDAD = :municipio', { municipio: municipio.MUNICIPIO })
      .getMany();
    
    if (expedientes.length === 0) {
      throw new NotFoundException(`No se encontraron expedientes en el municipio "${municipio.MUNICIPIO}"`);
    }
    
    return expedientes;
  }

  async findByFechas(fechaInicio?: Date, fechaFin?: Date): Promise<Expediente[]> {
    if (!fechaInicio && !fechaFin) {
      throw new Error('Debe proporcionar al menos una fecha para realizar la búsqueda');
    }

    // Construimos el objeto de consulta de manera dinámica
    const queryBuilder = this.expedientesRepository.createQueryBuilder('expediente');
    
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

  async findByExpediente(expedienteCodigo: string): Promise<Expediente> {
    if (!expedienteCodigo) {
      throw new Error('Debe proporcionar un código de expediente para realizar la búsqueda');
    }
    
    // Usamos QueryBuilder para evitar problemas con el sistema de tipos
    const expediente = await this.expedientesRepository
      .createQueryBuilder('expediente')
      .where('expediente.EXPEDIENTE = :codigo', { codigo: expedienteCodigo })
      .getOne();
    
    if (!expediente) {
      throw new NotFoundException(`No se encontró el expediente con código ${expedienteCodigo}`);
    }
    
    return expediente;
  }

  async update(expedienteCodigo: string, updateExpedienteDto: UpdateExpedienteDto): Promise<void> {
    const resultado = await this.expedientesRepository.update(
      { EXPEDIENTE: expedienteCodigo } as any,
      updateExpedienteDto as any
    );
    
    if (resultado.affected === 0) {
      throw new NotFoundException(`No se encontró el expediente con código ${expedienteCodigo} para actualizar`);
    }
  }

  async remove(expedienteCodigo: string): Promise<void> {
    const resultado = await this.expedientesRepository.delete({ EXPEDIENTE: expedienteCodigo } as any);
    
    if (resultado.affected === 0) {
      throw new NotFoundException(`No se encontró el expediente con código ${expedienteCodigo} para eliminar`);
    }
  }
}