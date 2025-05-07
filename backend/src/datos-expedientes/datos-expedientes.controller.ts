import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DatosExpedientesService } from './datos-expedientes.service';
import { CreateDatosExpedienteDto } from './dto/create-datos-expediente.dto';
import { UpdateDatosExpedienteDto } from './dto/update-datos-expediente.dto';

@ApiTags('datos-expedientes')
@Controller('datos-expedientes')
export class DatosExpedientesController {
  constructor(private readonly datosExpedientesService: DatosExpedientesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new datos-expediente' })
  create(@Body() createDatosExpedienteDto: CreateDatosExpedienteDto) {
    return this.datosExpedientesService.create(createDatosExpedienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all datos-expedientes' })
  findAll() {
    return this.datosExpedientesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a datos-expediente by id' })
  findOne(@Param('id') id: string) {
    return this.datosExpedientesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a datos-expediente by id' })
  update(@Param('id') id: string, @Body() updateDatosExpedienteDto: UpdateDatosExpedienteDto) {
    return this.datosExpedientesService.update(+id, updateDatosExpedienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a datos-expediente by id' })
  remove(@Param('id') id: string) {
    return this.datosExpedientesService.remove(+id);
  }
}
