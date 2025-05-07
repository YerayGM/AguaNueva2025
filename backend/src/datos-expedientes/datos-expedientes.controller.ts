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

  @Get(':idExpediente/:hoja/:orden')
  findOne(
    @Param('idExpediente') idExpediente: string,
    @Param('hoja') hoja: number,
    @Param('orden') orden: number,
  ) {
    return this.datosExpedientesService.findOne(idExpediente, hoja, orden);
  }

  @Patch(':idExpediente/:hoja/:orden')
  update(
    @Param('idExpediente') idExpediente: string,
    @Param('hoja') hoja: number,
    @Param('orden') orden: number,
    @Body() updateDatosExpedienteDto: UpdateDatosExpedienteDto,
  ) {
    return this.datosExpedientesService.update(idExpediente, hoja, orden, updateDatosExpedienteDto);
  }

  @Delete(':idExpediente/:hoja/:orden')
  remove(
    @Param('idExpediente') idExpediente: string,
    @Param('hoja') hoja: number,
    @Param('orden') orden: number,
  ) {
    return this.datosExpedientesService.remove(idExpediente, hoja, orden);
  }
}
