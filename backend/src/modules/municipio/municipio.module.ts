import { Module } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { MunicipioController } from './municipio.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [MunicipioService],
  controllers: [MunicipioController],
  imports: [PrismaModule],
})
export class MunicipioModule {}
