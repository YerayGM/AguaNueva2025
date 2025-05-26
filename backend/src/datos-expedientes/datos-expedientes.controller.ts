import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpStatus, HttpCode, NotFoundException } from '@nestjs/common';
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
  @ApiOperation({ summary: 'Crear un nuevo registro de datos de expediente' })
  @ApiResponse({ status: 201, description: 'Registro creado correctamente', type: DatosExpediente })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDatosExpedienteDto: CreateDatosExpedienteDto) {
    return this.datosExpedientesService.create(createDatosExpedienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de datos de expedientes' })
  @ApiResponse({ status: 200, description: 'Listado de registros', type: [DatosExpediente] })
  findAll() {
    return this.datosExpedientesService.findAll();
  }

  // Movido hacia abajo para evitar conflicto de rutas
  @Get(':id')
  @ApiOperation({ summary: 'Buscar un registro por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro' })
  @ApiResponse({ status: 200, description: 'Registro encontrado', type: DatosExpediente })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.datosExpedientesService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Datos de expediente con ID ${id} no encontrados`);
    }
    return result;
  }

  @Get('buscar/fechas')
  @ApiOperation({ summary: 'Buscar registros por rango de fechas' })
  @ApiQuery({ name: 'fechaInicio', required: false, description: 'Fecha de inicio (YYYY-MM-DD)' })
  @ApiQuery({ name: 'fechaFin', required: false, description: 'Fecha de fin (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Registros encontrados', type: [DatosExpediente] })
  @ApiResponse({ status: 404, description: 'No se encontraron registros en el rango de fechas' })
  findByFechas(
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    const fechaInicioObj = fechaInicio ? new Date(fechaInicio) : undefined;
    const fechaFinObj = fechaFin ? new Date(fechaFin) : undefined;
    return this.datosExpedientesService.findByFechas(fechaInicioObj, fechaFinObj);
  }

  @Get('buscar/dni/:dni')
  @ApiOperation({ summary: 'Buscar registros por DNI' })
  @ApiParam({ name: 'dni', description: 'DNI de la persona' })
  @ApiResponse({ status: 200, description: 'Registros encontrados', type: [DatosExpediente] })
  @ApiResponse({ status: 404, description: 'No se encontraron registros para el DNI proporcionado' })
  findByDni(@Param('dni') dni: string) {
    return this.datosExpedientesService.findByDni(dni);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un registro por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro a actualizar' })
  @ApiResponse({ status: 200, description: 'Registro actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateDatosExpedienteDto: UpdateDatosExpedienteDto
  ) {
    return this.datosExpedientesService.update(id, updateDatosExpedienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un registro por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro a eliminar' })
  @ApiResponse({ status: 200, description: 'Registro eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.datosExpedientesService.remove(id);
  }

  @Get('expediente/:numero')
  @ApiOperation({ summary: 'Buscar registros por número de expediente' })
  @ApiParam({ name: 'numero', description: 'Número de expediente' })
  @ApiResponse({ status: 200, description: 'Registro encontrado', type: DatosExpediente })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  findByExpediente(@Param('numero') numero: string) {
    return this.datosExpedientesService.findByExpediente(numero);
  }
}