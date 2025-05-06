import { Module } from '@nestjs/common';
import { DatosPersonalesService } from './datos-personales.service';
import { DatosPersonalesController } from './datos-personales.controller';

@Module({
  controllers: [DatosPersonalesController],
  providers: [DatosPersonalesService],
})
export class DatosPersonalesModule {}
