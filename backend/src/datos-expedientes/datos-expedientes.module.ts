import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosExpedientesService } from './datos-expedientes.service';
import { DatosExpedientesController } from './datos-expedientes.controller';
import { DatosExpediente } from './entities/datos-expedientes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DatosExpediente])],
  controllers: [DatosExpedientesController],
  providers: [DatosExpedientesService],
})
export class DatosExpedientesModule {}