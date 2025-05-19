import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { MunicipiosService } from './municipios.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { Municipio } from './entities/municipio.entity'; // Asegúrate de que esta entidad existe

@ApiTags('municipios')
@Controller('municipios')
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo municipio' })
  @ApiResponse({ status: 201, description: 'Municipio creado correctamente', type: Municipio })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMunicipioDto: CreateMunicipioDto) {
    return this.municipiosService.create(createMunicipioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los municipios' })
  @ApiResponse({ status: 200, description: 'Lista de municipios', type: [Municipio] })
  findAll() {
    return this.municipiosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un municipio por ID' })
  @ApiParam({ name: 'id', description: 'ID del municipio' })
  @ApiResponse({ status: 200, description: 'Municipio encontrado', type: Municipio })
  @ApiResponse({ status: 404, description: 'Municipio no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.municipiosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un municipio por ID' })
  @ApiParam({ name: 'id', description: 'ID del municipio' })
  @ApiResponse({ status: 200, description: 'Municipio actualizado correctamente', type: Municipio })
  @ApiResponse({ status: 404, description: 'Municipio no encontrado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMunicipioDto: UpdateMunicipioDto) {
    return this.municipiosService.update(id, updateMunicipioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un municipio por ID' })
  @ApiParam({ name: 'id', description: 'ID del municipio' })
  @ApiResponse({ status: 200, description: 'Municipio eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Municipio no encontrado' })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.municipiosService.remove(id);
  }
}