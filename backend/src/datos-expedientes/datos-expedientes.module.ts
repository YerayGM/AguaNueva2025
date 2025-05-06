import { Module } from '@nestjs/common';
import { DatosExpedientesService } from './datos-expedientes.service';
import { DatosExpedientesController } from './datos-expedientes.controller';

@Module({
  controllers: [DatosExpedientesController],
  providers: [DatosExpedientesService],
})
export class DatosExpedientesModule {}
