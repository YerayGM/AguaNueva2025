import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Municipio } from '../municipios/entities/municipio.entity';
import { DatosPersonales } from '../datos-personales/entities/datos-personales.entity';
import { Contador } from '../contadores/entities/contador.entity';
import { Materia } from '../materia/entities/materia.entity';
import { Expediente } from '../expedientes/entities/expediente.entity';
import { DatosExpediente } from '../datos-expediente/entities/datos-expediente.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3308', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'FaNaTiC052005.',
  database: process.env.DB_DATABASE || 'AguasNuevas2025',
  entities: [Municipio, DatosPersonales, Contador, Materia, Expediente, DatosExpediente],
  synchronize: false, // No sincronizar automáticamente para evitar modificar la estructura existente
  logging: process.env.NODE_ENV === 'development',
};