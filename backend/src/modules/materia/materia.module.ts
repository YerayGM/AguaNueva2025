import { Module } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [MateriaService],
  controllers: [MateriaController],
  imports: [PrismaModule],
})
export class MateriaModule {}
