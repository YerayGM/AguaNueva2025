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

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.expedientesService.findOne(+id);
  }

  @Get('dni/:dni')
  findByDni(@Param('dni') dni: string) {
    return this.expedientesService.findByDni(dni);
  }

  @Get('municipio/:idMunicipio')
  findByMunicipio(@Param('idMunicipio') idMunicipio: number) {
    return this.expedientesService.findByMunicipio(idMunicipio);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpedienteDto: UpdateExpedienteDto) {
    return this.expedientesService.update(+id, updateExpedienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expedientesService.remove(+id);
  }
}