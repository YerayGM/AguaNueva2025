import { Module } from '@nestjs/common';
import { DatosPersonaService } from './datos-persona.service';
import { DatosPersonaController } from './datos-persona.controller';

@Module({
  providers: [DatosPersonaService],
  controllers: [DatosPersonaController]
})
export class DatosPersonaModule {}
