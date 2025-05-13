import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipiosModule } from './municipios/municipios.module';
import { ExpedientesModule } from './expedientes/expedientes.module';
import { DatosPersonalesModule } from './datos-per/datos-personales.module';
import { DatosExpedientesModule } from './datos-expedientes/datos-expedientes.module';
import { MateriasModule } from './materias/materias.module';
import { ContadoresModule } from './contadores/contadores.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      autoLoadEntities: true,
    }),
    MunicipiosModule,
    ExpedientesModule,
    DatosPersonalesModule,
    DatosExpedientesModule,
    MateriasModule,
    ContadoresModule,],
})
export class AppModule {}
