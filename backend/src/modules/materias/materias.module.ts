import { Module } from '@nestjs/common';
import { MateriasService } from './materias.service';

@Module({
  providers: [MateriasService]
})
export class MateriasModule {}
