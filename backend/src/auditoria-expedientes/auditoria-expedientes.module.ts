import { Module } from '@nestjs/common';
import { AuditoriaExpedientesService } from './auditoria-expedientes.service';
import { AuditoriaExpedientesController } from './auditoria-expedientes.controller';

@Module({
  controllers: [AuditoriaExpedientesController],
  providers: [AuditoriaExpedientesService],
})
export class AuditoriaExpedientesModule {}
