import { Module } from '@nestjs/common';
import { ExpedientesService } from './expedientes.service';
import { ExpedientesController } from './expedientes.controller';
import { Expediente } from './entities/expedientes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ExpedientesController],
  providers: [ExpedientesService],
  imports: [
    TypeOrmModule.forFeature([Expediente]),
  ],
})
export class ExpedientesModule {}
