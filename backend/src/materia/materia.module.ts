import { Module } from '@nestjs/common';
import { MateriaService } from './materia.service';

@Module({
  providers: [MateriaService]
})
export class MateriaModule {}
