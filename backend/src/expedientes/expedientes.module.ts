import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpedientesService } from './expedientes.service';
import { ExpedientesController } from './expedientes.controller';
import { Expediente } from './entities/expedientes.entity';
import { Municipio } from '../municipios/entities/municipio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expediente, Municipio])],
  controllers: [ExpedientesController],
  providers: [ExpedientesService],
})
export class ExpedientesModule {}
