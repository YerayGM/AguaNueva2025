import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DatosExpedientesService } from './datos-expedientes.service';
import { CreateDatosExpedienteDto } from './dto/create-datos-expediente.dto';
import { UpdateDatosExpedienteDto } from './dto/update-datos-expediente.dto';
import { DatosExpediente } from './entities/datos-expediente.entity';

@ApiTags('datos-expedientes')
@Controller('datos-expedientes')
export class DatosExpedientesController {
  constructor(private readonly datosExpedientesService: DatosExpedientesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new datos-expediente' })
  @ApiResponse({ status: 201, description: 'The datos-expediente has been successfully created.', type: DatosExpediente })
  create(@Body() createDatosExpedienteDto: CreateDatosExpedienteDto) {
    return this.datosExpedientesService.create(createDatosExpedienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all datos-expedientes' })
  @ApiResponse({ status: 200, description: 'Return all datos-expedientes.', type: [DatosExpediente] })
  findAll() {
    return this.datosExpedientesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a datos-expediente by id' })
  @ApiResponse({ status: 200, description: 'Return the datos-expediente.', type: DatosExpediente })
  findOne(@Param('id') id: string) {
    return this.datosExpedientesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a datos-expediente by id' })
  @ApiResponse({ status: 200, description: 'The datos-expediente has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateDatosExpedienteDto: UpdateDatosExpedienteDto) {
    return this.datosExpedientesService.update(+id, updateDatosExpedienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a datos-expediente by id' })
  @ApiResponse({ status: 200, description: 'The datos-expediente has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.datosExpedientesService.remove(+id);
  }
}
