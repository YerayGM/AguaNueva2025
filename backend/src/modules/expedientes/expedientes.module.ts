import { Module } from '@nestjs/common';
import { ExpedientesService } from './expedientes.service';

@Module({
  providers: [ExpedientesService]
})
export class ExpedientesModule {}
