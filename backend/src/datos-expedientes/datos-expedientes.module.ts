import { Module } from '@nestjs/common';
import { DatosExpedientesService } from './datos-expedientes.service';
import { DatosExpedientesController } from './datos-expedientes.controller';
import { DatosExpediente } from './entities/datos-expediente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [DatosExpedientesController],
  providers: [DatosExpedientesService],
  imports: [
    TypeOrmModule.forFeature([DatosExpediente]),
  ],
})
export class DatosExpedientesModule {}
