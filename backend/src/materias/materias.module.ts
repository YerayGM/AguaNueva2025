import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';
import { Materia } from './entities/materia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materia])],
  controllers: [MateriasController],
  providers: [MateriasService],
})
export class MateriasModule {}