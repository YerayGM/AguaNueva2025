import { Module } from '@nestjs/common';
import { DatosExpedienteService } from './datos-expediente.service';
import { DatosExpedienteController } from './datos-expediente.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DatosExpedienteService],
  controllers: [DatosExpedienteController],
  imports: [PrismaModule],
})
export class DatosExpedienteModule {}
