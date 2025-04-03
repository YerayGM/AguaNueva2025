import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { MunicipiosModule } from './municipios/municipios.module';
import { DatosPersonalesModule } from './datos-personales/datos-personales.module';
import { ContadoresModule } from './contadores/contadores.module';
import { MateriaModule } from './materia/materia.module';
import { ExpedientesModule } from './expedientes/expedientes.module';
import { DatosExpedienteModule } from './datos-expediente/datos-expediente.module';

@Module({
  imports: [
    ConfigModule.forRoot(<ConfigModuleOptions>{
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    MunicipiosModule,
    DatosPersonalesModule,
    ContadoresModule,
    MateriaModule,
    ExpedientesModule,
    DatosExpedienteModule,
  ],
})
export class AppModule {}