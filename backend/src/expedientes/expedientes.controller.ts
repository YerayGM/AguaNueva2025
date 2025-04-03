import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ExpedientesService } from './expedientes.service';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { UpdateExpedienteDto } from './dto/update-expediente.dto';
import { FilterExpedienteDto } from './dto/filter-expediente.dto';
import { Expediente } from './entities/expediente.entity';

@ApiTags('expedientes')
@Controller('expedientes')
export class ExpedientesController {
  constructor(private readonly expedientesService: ExpedientesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo expediente' })
  @ApiResponse({ status: 201, description: 'Expediente creado con éxito', type: Expediente })
  create(@Body() createExpedienteDto: CreateExpedienteDto) {
    return this.expedientesService.create(createExpedienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los expedientes con filtros opcionales' })
  @ApiResponse({ status: 200, description: 'Lista de expedientes', type: [Expediente] })
  findAll(@Query() filterDto: FilterExpedienteDto) {
    return this.expedientesService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un expediente por ID' })
  @ApiResponse({ status: 200, description: 'Expediente encontrado', type: Expediente })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado' })
  findOne(@Param('id') id: string) {
    return this.expedientesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un expediente' })
  @ApiResponse({ status: 200, description: 'Expediente actualizado', type: Expediente })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado' })
  update(@Param('id') id: string, @Body() updateExpedienteDto: UpdateExpedienteDto) {
    return this.expedientesService.update(+id, updateExpedienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un expediente' })
  @ApiResponse({ status: 200, description: 'Expediente eliminado' })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado' })
  remove(@Param('id') id: string) {
    return this.expedientesService.remove(+id);
  }
}