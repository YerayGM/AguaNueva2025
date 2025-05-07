import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materia } from './entities/materia.entity';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Injectable()
export class MateriasService {
  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
  ) {}

  async create(createMateriaDto: CreateMateriaDto): Promise<Materia> {
    const materia = this.materiaRepository.create(createMateriaDto);
    return this.materiaRepository.save(materia);
  }

  async findAll(): Promise<Materia[]> {
    return this.materiaRepository.find();
  }

  async findOne(id: number): Promise<Materia> {
    const materia = await this.materiaRepository.findOneBy({ id });
    if (!materia) {
      throw new Error(`Materia with ID ${id} not found`);
    }
    return materia;
  }

  async update(id: number, updateMateriaDto: UpdateMateriaDto): Promise<Materia> {
    await this.materiaRepository.update(id, updateMateriaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.materiaRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Materia with ID ${id} not found`);
    }
  }
}