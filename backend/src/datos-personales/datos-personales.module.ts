import { Module } from '@nestjs/common';
import { DatosPersonalesService } from './datos-personales.service';

@Module({
  providers: [DatosPersonalesService]
})
export class DatosPersonalesModule {}
