import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Expediente } from './entities/expedientes.entity';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { UpdateExpedienteDto } from './dto/update-expediente.dto';

@Injectable()
export class ExpedientesService {
  constructor(
    @InjectRepository(Expediente)
    private readonly expedienteRepository: Repository<Expediente>,
  ) {}

  async create(createExpedienteDto: CreateExpedienteDto): Promise<Expediente> {
    const expediente = this.expedienteRepository.create(createExpedienteDto as unknown as Partial<Expediente>);
    return this.expedienteRepository.save(expediente);
  }

  async findAll(): Promise<Expediente[]> {
    return this.expedienteRepository.find({ relations: ['DatosPersonales', 'Municipio'] });
  }

  async findOne(IdExpediente: string, Hoja: number): Promise<Expediente> {
    const where: FindOptionsWhere<Expediente> = { IdExpediente, Hoja };
    const expediente = await this.expedienteRepository.findOne({
      where,
      relations: ['DatosPersonales', 'Municipio'],
    });
    if (!expediente) {
      throw new Error(`Expediente with ID ${IdExpediente} and Hoja ${Hoja} not found`);
    }
    return expediente;
  }

  async update(IdExpediente: string, Hoja: number, updateExpedienteDto: UpdateExpedienteDto): Promise<Expediente> {
    const where: FindOptionsWhere<Expediente> = { IdExpediente, Hoja };
    await this.expedienteRepository.update(where, updateExpedienteDto as unknown as Partial<Expediente>);
    return this.findOne(IdExpediente, Hoja);
  }

  async remove(IdExpediente: string, Hoja: number): Promise<void> {
    const where: FindOptionsWhere<Expediente> = { IdExpediente, Hoja };
    const result = await this.expedienteRepository.delete(where);
    if (result.affected === 0) {
      throw new Error(`Expediente with ID ${IdExpediente} and Hoja ${Hoja} not found`);
    }
  }
}
