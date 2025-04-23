import { Module } from '@nestjs/common';
import { ExpedienteService } from './expediente.service';
import { ExpedienteController } from './expediente.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ExpedienteService],
  controllers: [ExpedienteController],
  imports: [PrismaModule],
})
export class ExpedienteModule {}
