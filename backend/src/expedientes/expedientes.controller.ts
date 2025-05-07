import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpedientesService } from './expedientes.service';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { UpdateExpedienteDto } from './dto/update-expediente.dto';

@Controller('expedientes')
export class ExpedientesController {
  constructor(private readonly expedientesService: ExpedientesService) {}

  @Post()
  create(@Body() createExpedienteDto: CreateExpedienteDto) {
    return this.expedientesService.create(createExpedienteDto);
  }

  @Get()
  findAll() {
    return this.expedientesService.findAll();
  }

  @Get(':idExpediente/:hoja')
  findOne(@Param('idExpediente') idExpediente: string, @Param('hoja') hoja: number) {
    return this.expedientesService.findOne(idExpediente, hoja);
  }

  @Patch(':idExpediente/:hoja')
  update(@Param('idExpediente') idExpediente: string, @Param('hoja') hoja: number, @Body() updateExpedienteDto: UpdateExpedienteDto) {
    return this.expedientesService.update(idExpediente, hoja, updateExpedienteDto);
  }

  @Delete(':idExpediente/:hoja')
  remove(@Param('idExpediente') idExpediente: string, @Param('hoja') hoja: number) {
    return this.expedientesService.remove(idExpediente, hoja);
  }
}
