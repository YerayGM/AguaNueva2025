import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpStatus, HttpCode, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ExpedientesService } from './expedientes.service';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { UpdateExpedienteDto } from './dto/update-expediente.dto';
import { Expediente } from './entities/expedientes.entity';

@ApiTags('expedientes')
@Controller('expedientes')
export class ExpedientesController {
  constructor(private readonly expedientesService: ExpedientesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo expediente' })
  @ApiResponse({ status: 201, description: 'Expediente creado correctamente', type: Expediente })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createExpedienteDto: CreateExpedienteDto) {
    return this.expedientesService.create(createExpedienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los expedientes' })
  @ApiResponse({ status: 200, description: 'Listado de expedientes', type: [Expediente] })
  findAll() {
    return this.expedientesService.findAll();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Buscar un expediente por ID numérico' })
  @ApiParam({ name: 'id', description: 'ID numérico del expediente' })
  @ApiResponse({ status: 200, description: 'Expediente encontrado', type: Expediente })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.expedientesService.findById(id);
    if (!result) {
      throw new NotFoundException(`Expediente con ID ${id} no encontrado`);
    }
    return result;
  }

  // Movido hacia abajo para evitar conflicto con otras rutas que comienzan con 'buscar'
  @Get(':expediente')
  @ApiOperation({ summary: 'Buscar un expediente por código' })
  @ApiParam({ name: 'expediente', description: 'Código del expediente' })
  @ApiResponse({ status: 200, description: 'Expediente encontrado', type: Expediente })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado' })
  async findOne(@Param('expediente') expediente: string) {
    const result = await this.expedientesService.findOne(expediente);
    if (!result) {
      throw new NotFoundException(`Expediente con código ${expediente} no encontrado`);
    }
    return result;
  }

  @Get('buscar/dni/:dni')
  @ApiOperation({ summary: 'Buscar expedientes por DNI' })
  @ApiParam({ name: 'dni', description: 'DNI de la persona' })
  @ApiResponse({ status: 200, description: 'Expedientes encontrados', type: [Expediente] })
  @ApiResponse({ status: 404, description: 'No se encontraron expedientes para el DNI proporcionado' })
  findByDni(@Param('dni') dni: string) {
    return this.expedientesService.findByDni(dni);
  }

  @Get('buscar/municipio/:idMunicipio')
  @ApiOperation({ summary: 'Buscar expedientes por ID de municipio' })
  @ApiParam({ name: 'idMunicipio', description: 'ID del municipio' })
  @ApiResponse({ status: 200, description: 'Expedientes encontrados', type: [Expediente] })
  @ApiResponse({ status: 404, description: 'Municipio no encontrado o sin expedientes asociados' })
  findByMunicipio(@Param('idMunicipio', ParseIntPipe) idMunicipio: number) {
    return this.expedientesService.findByMunicipio(idMunicipio);
  }

  @Get('buscar/fechas')
  @ApiOperation({ summary: 'Buscar expedientes por rango de fechas' })
  @ApiQuery({ name: 'fechaInicio', required: false, description: 'Fecha de inicio (YYYY-MM-DD)' })
  @ApiQuery({ name: 'fechaFin', required: false, description: 'Fecha de fin (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Expedientes encontrados', type: [Expediente] })
  @ApiResponse({ status: 404, description: 'No se encontraron expedientes en el rango de fechas' })
  findByFechas(
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    const fechaInicioObj = fechaInicio ? new Date(fechaInicio) : undefined;
    const fechaFinObj = fechaFin ? new Date(fechaFin) : undefined;
    return this.expedientesService.findByFechas(fechaInicioObj, fechaFinObj);
  }

  @Patch(':expediente')
  @ApiOperation({ summary: 'Actualizar un expediente por código de expediente' })
  @ApiParam({ name: 'expediente', description: 'Código del expediente a actualizar' })
  @ApiResponse({ status: 200, description: 'Expediente actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado' })
  update(
    @Param('expediente') expediente: string, 
    @Body() updateExpedienteDto: UpdateExpedienteDto
  ) {
    return this.expedientesService.update(expediente, updateExpedienteDto);
  }

  @Delete(':expediente')
  @ApiOperation({ summary: 'Eliminar un expediente por código de expediente' })
  @ApiParam({ name: 'expediente', description: 'Código del expediente a eliminar' })
  @ApiResponse({ status: 200, description: 'Expediente eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado' })
  @HttpCode(HttpStatus.OK)
  remove(@Param('expediente') expediente: string) {
    return this.expedientesService.remove(expediente);
  }
}