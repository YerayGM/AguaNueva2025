import { Module } from '@nestjs/common';
import { MunicipioModule } from './modules/municipio/municipio.module';
import { MateriaModule } from './modules/materia/materia.module';
import { ExpedienteModule } from './modules/expediente/expediente.module';
import { DatosExpedienteModule } from './modules/datos-expediente/datos-expediente.module';
import { DatosPersonaModule } from './modules/datos-persona/datos-persona.module';
import { ContadorModule } from './modules/contador/contador.module';

@Module({
  imports: [MunicipioModule, MateriaModule, ExpedienteModule, DatosExpedienteModule, DatosPersonaModule, ContadorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
