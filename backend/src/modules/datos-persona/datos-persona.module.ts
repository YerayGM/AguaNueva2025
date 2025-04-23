import { Module } from '@nestjs/common';
import { DatosPersonaService } from './datos-persona.service';
import { DatosPersonaController } from './datos-persona.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DatosPersonaService],
  controllers: [DatosPersonaController],
  imports: [PrismaModule],
})
export class DatosPersonaModule {}
