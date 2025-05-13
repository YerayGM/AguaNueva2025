import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaService } from './materias.service';
import { MateriaController } from './materias.controller';
import { Materia } from './entities/materia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materia])],
  controllers: [MateriaController],
  providers: [MateriaService],
})
export class MateriasModule {}