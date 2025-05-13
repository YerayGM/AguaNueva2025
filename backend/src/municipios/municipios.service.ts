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
    private readonly municipiosRepository: Repository<Municipio>,
  ) {}

  create(createMunicipioDto: CreateMunicipioDto) {
    const municipio = this.municipiosRepository.create(createMunicipioDto);
    return this.municipiosRepository.save(municipio);
  }

  findAll() {
    return this.municipiosRepository.find();
  }

  findOne(id: number) {
    return this.municipiosRepository.findOne({ where: { ID_MUN: id } });
  }

  update(id: number, updateMunicipioDto: UpdateMunicipioDto) {
    return this.municipiosRepository.update(id, updateMunicipioDto);
  }

  remove(id: number) {
    return this.municipiosRepository.delete(id);
  }
}