import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatosExpedientesService } from './datos-expedientes.service';
import { CreateDatosExpedienteDto } from './dto/create-datos-expediente.dto';
import { UpdateDatosExpedienteDto } from './dto/update-datos-expediente.dto';

@Controller('datos-expedientes')
export class DatosExpedientesController {
  constructor(private readonly datosExpedientesService: DatosExpedientesService) {}

  @Post()
  create(@Body() createDatosExpedienteDto: CreateDatosExpedienteDto) {
    return this.datosExpedientesService.create(createDatosExpedienteDto);
  }

  @Get()
  findAll() {
    return this.datosExpedientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datosExpedientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatosExpedienteDto: UpdateDatosExpedienteDto) {
    return this.datosExpedientesService.update(+id, updateDatosExpedienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosExpedientesService.remove(+id);
  }
}
