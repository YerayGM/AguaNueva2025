import { Module } from '@nestjs/common';
import { DatosExpedientesService } from './datos_expedientes.service';

@Module({
  providers: [DatosExpedientesService]
})
export class DatosExpedientesModule {}
