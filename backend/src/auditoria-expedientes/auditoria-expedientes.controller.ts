import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuditoriaExpedientesService } from './auditoria-expedientes.service';
import { CreateAuditoriaExpedienteDto } from './dto/create-auditoria-expediente.dto';
import { UpdateAuditoriaExpedienteDto } from './dto/update-auditoria-expediente.dto';

@Controller('auditoria-expedientes')
export class AuditoriaExpedientesController {
  constructor(private readonly auditoriaExpedientesService: AuditoriaExpedientesService) {}

  @Post()
  create(@Body() createAuditoriaExpedienteDto: CreateAuditoriaExpedienteDto) {
    return this.auditoriaExpedientesService.create(createAuditoriaExpedienteDto);
  }

  @Get()
  findAll() {
    return this.auditoriaExpedientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditoriaExpedientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuditoriaExpedienteDto: UpdateAuditoriaExpedienteDto) {
    return this.auditoriaExpedientesService.update(+id, updateAuditoriaExpedienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditoriaExpedientesService.remove(+id);
  }
}
