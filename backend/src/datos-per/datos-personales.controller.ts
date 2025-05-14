import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { DatosPersonalesService } from './datos-personales.service';
import { CreateDatosPerDto } from './dto/create-datos-per.dto';
import { UpdateDatosPerDto } from './dto/update-datos-per.dto';
import { DatosPer } from './entities/datos-per.entity';

@ApiTags('datos-personales')
@Controller('datos-personales')
export class DatosPersonalesController {
  constructor(private readonly datosPersonalesService: DatosPersonalesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo registro de datos personales' })
  @ApiResponse({ status: 201, description: 'Registro creado correctamente', type: DatosPer })
  create(@Body() createDatosPerDto: CreateDatosPerDto) {
    return this.datosPersonalesService.create(createDatosPerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de datos personales' })
  @ApiResponse({ status: 200, description: 'Listado de datos personales', type: [DatosPer] })
  findAll() {
    return this.datosPersonalesService.findAll();
  }

  @Get('dni/:dni')
  @ApiOperation({ summary: 'Buscar un registro por DNI' })
  @ApiParam({ name: 'dni', description: 'DNI de la persona' })
  @ApiResponse({ status: 200, description: 'Registro encontrado', type: DatosPer })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  findOne(@Param('dni') dni: string) {
    return this.datosPersonalesService.findOne(dni);
  }

  @Get('buscar')
  @ApiOperation({ summary: 'Buscar registros por nombre y/o apellidos' })
  @ApiQuery({ name: 'nombre', required: false, description: 'Nombre de la persona' })
  @ApiQuery({ name: 'apellidos', required: false, description: 'Apellidos de la persona' })
  @ApiResponse({ status: 200, description: 'Registros encontrados', type: [DatosPer] })
  @ApiResponse({ status: 404, description: 'No se encontraron registros con los criterios proporcionados' })
  findByNombre(
    @Query('nombre') nombre?: string,
    @Query('apellidos') apellidos?: string,
  ) {
    return this.datosPersonalesService.findByNombre(nombre, apellidos);
  }

  @Get('municipio/:idMunicipio')
  @ApiOperation({ summary: 'Buscar registros por ID de municipio' })
  @ApiParam({ name: 'idMunicipio', description: 'ID del municipio' })
  @ApiResponse({ status: 200, description: 'Registros encontrados', type: [DatosPer] })
  @ApiResponse({ status: 404, description: 'Municipio no encontrado o sin registros asociados' })
  findByMunicipio(@Param('idMunicipio') idMunicipio: number) {
    return this.datosPersonalesService.findByMunicipio(+idMunicipio);
  }

  @Patch(':dni')
  @ApiOperation({ summary: 'Actualizar un registro por DNI' })
  @ApiParam({ name: 'dni', description: 'DNI de la persona a actualizar' })
  @ApiResponse({ status: 200, description: 'Registro actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  update(@Param('dni') dni: string, @Body() updateDatosPerDto: UpdateDatosPerDto) {
    return this.datosPersonalesService.update(dni, updateDatosPerDto);
  }

  @Delete(':dni')
  @ApiOperation({ summary: 'Eliminar un registro por DNI' })
  @ApiParam({ name: 'dni', description: 'DNI de la persona a eliminar' })
  @ApiResponse({ status: 200, description: 'Registro eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  remove(@Param('dni') dni: string) {
    return this.datosPersonalesService.remove(dni);
  }
}