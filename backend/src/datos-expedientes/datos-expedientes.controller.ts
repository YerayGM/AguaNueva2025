import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { DatosExpedientesService } from './datos-expedientes.service';
import { CreateDatosExpedienteDto } from './dto/create-datos-expediente.dto';
import { UpdateDatosExpedienteDto } from './dto/update-datos-expediente.dto';
import { DatosExpediente } from './entities/datos-expedientes.entity';

@ApiTags('datos-expedientes')
@Controller('datos-expedientes')
export class DatosExpedientesController {
  constructor(private readonly datosExpedientesService: DatosExpedientesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo expediente' })
  @ApiResponse({ status: 201, description: 'Expediente creado correctamente', type: DatosExpediente })
  create(@Body() createDatosExpedienteDto: CreateDatosExpedienteDto) {
    return this.datosExpedientesService.create(createDatosExpedienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los expedientes' })
  @ApiResponse({ status: 200, description: 'Listado de expedientes', type: [DatosExpediente] })
  findAll() {
    return this.datosExpedientesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un expediente por ID' })
  @ApiParam({ name: 'id', description: 'ID del expediente' })
  @ApiResponse({ status: 200, description: 'Expediente encontrado', type: DatosExpediente })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.datosExpedientesService.findOne(id);
  }

  @Get('buscar/fechas')
  @ApiOperation({ summary: 'Buscar expedientes por rango de fechas' })
  @ApiQuery({ name: 'fechaInicio', required: false, description: 'Fecha de inicio (YYYY-MM-DD)' })
  @ApiQuery({ name: 'fechaFin', required: false, description: 'Fecha de fin (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Expedientes encontrados', type: [DatosExpediente] })
  @ApiResponse({ status: 404, description: 'No se encontraron expedientes en el rango de fechas' })
  findByFechas(
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    const fechaInicioObj = fechaInicio ? new Date(fechaInicio) : undefined;
    const fechaFinObj = fechaFin ? new Date(fechaFin) : undefined;
    return this.datosExpedientesService.findByFechas(fechaInicioObj, fechaFinObj);
  }

  @Get('buscar/dni/:dni')
  @ApiOperation({ summary: 'Buscar expedientes por DNI' })
  @ApiParam({ name: 'dni', description: 'DNI de la persona' })
  @ApiResponse({ status: 200, description: 'Expedientes encontrados', type: [DatosExpediente] })
  @ApiResponse({ status: 404, description: 'No se encontraron expedientes para el DNI proporcionado' })
  findByDni(@Param('dni') dni: string) {
    return this.datosExpedientesService.findByDni(dni);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un expediente por ID' })
  @ApiParam({ name: 'id', description: 'ID del expediente a actualizar' })
  @ApiResponse({ status: 200, description: 'Expediente actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateDatosExpedienteDto: UpdateDatosExpedienteDto
  ) {
    return this.datosExpedientesService.update(id, updateDatosExpedienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un expediente por ID' })
  @ApiParam({ name: 'id', description: 'ID del expediente a eliminar' })
  @ApiResponse({ status: 200, description: 'Expediente eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.datosExpedientesService.remove(id);
  }
}