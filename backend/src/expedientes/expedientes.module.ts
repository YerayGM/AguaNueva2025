import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expediente } from './entities/expedientes.entity';
import { ExpedientesService } from './expedientes.service';
import { ExpedientesController } from './expedientes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Expediente])],
  controllers: [ExpedientesController],
  providers: [ExpedientesService],
})
export class ExpedientesModule {}