import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materia } from './entities/materia.entity';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Injectable()
export class MateriaService {
  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
  ) {}

  create(createMateriaDto: CreateMateriaDto) {
    const materia = this.materiaRepository.create(createMateriaDto);
    return this.materiaRepository.save(materia);
  }

  findAll() {
    return this.materiaRepository.find();
  }

  async findOne(id: number): Promise<Materia | null> {
    const materia = await this.materiaRepository.findOne({ where: { ID: id } });
    return materia || null;
  }

  findByTipo(tipo: string) {
    return this.materiaRepository.find({ where: { TIPO: tipo } });
  }

  findByNombre(nombre: string) {
    return this.materiaRepository.find({ where: { MATERIA: nombre } });
  }

  update(id: number, updateMateriaDto: UpdateMateriaDto) {
    return this.materiaRepository.update(id, updateMateriaDto);
  }

  remove(id: number) {
    return this.materiaRepository.delete(id);
  }
}