import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { DatosExpediente } from './entities/datos-expediente.entity';
import { CreateDatosExpedienteDto } from './dto/create-datos-expediente.dto';
import { UpdateDatosExpedienteDto } from './dto/update-datos-expediente.dto';

@Injectable()
export class DatosExpedientesService {
  constructor(
    @InjectRepository(DatosExpediente)
    private readonly datosExpedienteRepository: Repository<DatosExpediente>,
  ) {}

  async create(createDatosExpedienteDto: CreateDatosExpedienteDto): Promise<DatosExpediente> {
    const datosExpediente = this.datosExpedienteRepository.create(createDatosExpedienteDto as unknown as DatosExpediente);
    return this.datosExpedienteRepository.save(datosExpediente);
  }

  async findAll(): Promise<DatosExpediente[]> {
    return this.datosExpedienteRepository.find({ relations: ['Expediente', 'Materia'] });
  }

  async findOne(IdExpediente: string, Hoja: number, Orden: number): Promise<DatosExpediente> {
    const where: FindOptionsWhere<DatosExpediente> = { IdExpediente, Hoja, Orden };
    const datosExpediente = await this.datosExpedienteRepository.findOne({
      where,
      relations: ['Expediente', 'Materia'],
    });
    if (!datosExpediente) {
      throw new Error(`DatosExpediente with ID ${IdExpediente}, Hoja ${Hoja}, Orden ${Orden} not found`);
    }
    return datosExpediente;
  }

  async update(IdExpediente: string, Hoja: number, Orden: number, updateDatosExpedienteDto: UpdateDatosExpedienteDto): Promise<DatosExpediente> {
    const where: FindOptionsWhere<DatosExpediente> = { IdExpediente, Hoja, Orden };
    await this.datosExpedienteRepository.update(where, updateDatosExpedienteDto as Partial<DatosExpediente>);
    return this.findOne(IdExpediente, Hoja, Orden);
  }

  async remove(IdExpediente: string, Hoja: number, Orden: number): Promise<void> {
    const where: FindOptionsWhere<DatosExpediente> = { IdExpediente, Hoja, Orden };
    const result = await this.datosExpedienteRepository.delete(where);
    if (result.affected === 0) {
      throw new Error(`DatosExpediente with ID ${IdExpediente}, Hoja ${Hoja}, Orden ${Orden} not found`);
    }
  }
}
