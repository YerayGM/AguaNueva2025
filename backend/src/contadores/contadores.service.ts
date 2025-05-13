import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contador } from './entities/contador.entity';
import { CreateContadorDto } from './dto/create-contador.dto';
import { UpdateContadorDto } from './dto/update-contador.dto';

@Injectable()
export class ContadoresService {
  constructor(
    @InjectRepository(Contador)
    private readonly contadoresRepository: Repository<Contador>,
  ) {}

  create(createContadorDto: CreateContadorDto) {
    const contador = this.contadoresRepository.create(createContadorDto);
    return this.contadoresRepository.save(contador);
  }

  findAll() {
    return this.contadoresRepository.find();
  }

  findOne(id: number) {
    return this.contadoresRepository.findOne({ where: { ID: id } });
  }

  update(id: number, updateContadorDto: UpdateContadorDto) {
    return this.contadoresRepository.update(id, updateContadorDto);
  }

  remove(id: number) {
    return this.contadoresRepository.delete(id);
  }
}