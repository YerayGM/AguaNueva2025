import { Module } from '@nestjs/common';
import { DatosExpedienteService } from './datos-expediente.service';

@Module({
  providers: [DatosExpedienteService]
})
export class DatosExpedienteModule {}
