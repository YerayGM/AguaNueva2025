import { Module } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';
import { Materia } from './entities/materia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MateriasController],
  providers: [MateriasService],
  imports: [
    TypeOrmModule.forFeature([Materia]),
  ],
})
export class MateriasModule {}
