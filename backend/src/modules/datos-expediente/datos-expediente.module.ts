import { Module } from '@nestjs/common';
import { DatosExpedienteService } from './datos-expediente.service';
import { DatosExpedienteController } from './datos-expediente.controller';

@Module({
  providers: [DatosExpedienteService],
  controllers: [DatosExpedienteController]
})
export class DatosExpedienteModule {}
