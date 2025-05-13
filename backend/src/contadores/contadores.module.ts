import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContadoresService } from './contadores.service';
import { ContadoresController } from './contadores.controller';
import { Contador } from './entities/contador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contador])],
  controllers: [ContadoresController],
  providers: [ContadoresService],
})
export class ContadoresModule {}