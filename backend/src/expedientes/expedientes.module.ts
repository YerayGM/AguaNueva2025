import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpedientesService } from './expedientes.service';
import { ExpedientesController } from './expedientes.controller';
import { Expediente } from './entities/expediente.entity';
import { DatosPersonales } from '../datos-personales/entities/datos-personales.entity';
import { DatosExpediente } from '../datos-expediente/entities/datos-expediente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expediente, DatosPersonales, DatosExpediente]),
  ],
  controllers: [ExpedientesController],
  providers: [ExpedientesService],
  exports: [ExpedientesService],
})
export class ExpedientesModule {}