import { Module } from '@nestjs/common';
import { ContadoresService } from './contadores.service';

@Module({
  providers: [ContadoresService]
})
export class ContadoresModule {}
