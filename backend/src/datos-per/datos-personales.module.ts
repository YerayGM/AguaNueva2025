import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosPersonalesService } from './datos-personales.service';
import { DatosPersonalesController } from './datos-personales.controller';
import { DatosPer } from './entities/datos-per.entity';
import { Municipio } from 'src/municipios/entities/municipio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DatosPer, Municipio])],
  controllers: [DatosPersonalesController],
  providers: [DatosPersonalesService],
})
export class DatosPersonalesModule {}