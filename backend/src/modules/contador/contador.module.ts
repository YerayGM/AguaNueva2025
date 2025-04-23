import { Module } from '@nestjs/common';
import { ContadorService } from './contador.service';
import { ContadorController } from './contador.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ContadorService],
  controllers: [ContadorController],
  imports: [PrismaModule],
})
export class ContadorModule {}
