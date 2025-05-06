import { Module } from '@nestjs/common';
import { DatosPersonalesService } from './datos-personales.service';
import { DatosPersonalesController } from './datos-personales.controller';
import { DatosPersonales } from './entities/datos-personales.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DatosPersonalesController],
  providers: [DatosPersonalesService],
  imports: [
    TypeOrmModule.forFeature([DatosPersonales]),
  ],
})
export class DatosPersonalesModule {}
