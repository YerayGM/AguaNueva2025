import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipio } from './entities/municipio.entity';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';

@Injectable()
export class MunicipiosService {
  constructor(
    @InjectRepository(Municipio)
    private readonly municipioRepository: Repository<Municipio>,
  ) {}

  async create(createMunicipioDto: CreateMunicipioDto): Promise<Municipio> {
    const municipio = this.municipioRepository.create(createMunicipioDto);
    return this.municipioRepository.save(municipio);
  }

  async findAll(): Promise<Municipio[]> {
    return this.municipioRepository.find();
  }

  async findOne(id: number): Promise<Municipio> {
    const municipio = await this.municipioRepository.findOneBy({ idMunicipio: id });
    if (!municipio) {
      throw new Error(`Municipio with ID ${id} not found`);
    }
    return municipio;
  }

  async update(id: number, updateMunicipioDto: UpdateMunicipioDto): Promise<Municipio> {
    await this.municipioRepository.update(id, updateMunicipioDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.municipioRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Municipio with ID ${id} not found`);
    }
  }
}