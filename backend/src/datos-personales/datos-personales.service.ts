import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatosPersonales } from './entities/datos-personales.entity';
import { CreateDatosPersonaleDto } from './dto/create-datos-personale.dto';
import { UpdateDatosPersonaleDto } from './dto/update-datos-personale.dto';

@Injectable()
export class DatosPersonalesService {
  constructor(
    @InjectRepository(DatosPersonales)
    private readonly datosPersonalesRepository: Repository<DatosPersonales>,
  ) {}

  async create(createDatosPersonaleDto: CreateDatosPersonaleDto): Promise<DatosPersonales> {
    const datosPersonales = this.datosPersonalesRepository.create({
      ...createDatosPersonaleDto,
    } as Partial<DatosPersonales>);
    return this.datosPersonalesRepository.save(datosPersonales);
  }

  async findAll(): Promise<DatosPersonales[]> {
    return this.datosPersonalesRepository.find({ relations: ['municipio'] });
  }

  async findOne(dni: string): Promise<DatosPersonales> {
    const datosPersonales = await this.datosPersonalesRepository.findOne({
      where: { dni },
      relations: ['municipio'],
    });
    if (!datosPersonales) {
      throw new Error(`DatosPersonales with DNI ${dni} not found`);
    }
    return datosPersonales;
  }

  async update(dni: string, updateDatosPersonaleDto: UpdateDatosPersonaleDto): Promise<DatosPersonales> {
    await this.datosPersonalesRepository.update(dni, updateDatosPersonaleDto as Partial<DatosPersonales>);
    return this.findOne(dni);
  }

  async remove(dni: string): Promise<void> {
    const result = await this.datosPersonalesRepository.delete(dni);
    if (result.affected === 0) {
      throw new Error(`DatosPersonales with DNI ${dni} not found`);
    }
  }
}