import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, HttpCode, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ContadoresService } from './contadores.service';
import { CreateContadorDto } from './dto/create-contador.dto';
import { UpdateContadorDto } from './dto/update-contador.dto';
import { Contador } from './entities/contador.entity'; // Asegúrate de que esta entidad existe

@ApiTags('contadores')
@Controller('contadores')
export class ContadoresController {
  constructor(private readonly contadoresService: ContadoresService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo contador' })
  @ApiResponse({ status: 201, description: 'Contador creado correctamente', type: Contador })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createContadorDto: CreateContadorDto) {
    return this.contadoresService.create(createContadorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los contadores' })
  @ApiResponse({ status: 200, description: 'Lista de contadores', type: [Contador] })
  findAll() {
    return this.contadoresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un contador por ID' })
  @ApiParam({ name: 'id', description: 'ID del contador' })
  @ApiResponse({ status: 200, description: 'Contador encontrado', type: Contador })
  @ApiResponse({ status: 404, description: 'Contador no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.contadoresService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Contador con ID ${id} no encontrado`);
    }
    return result;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un contador por ID' })
  @ApiParam({ name: 'id', description: 'ID del contador' })
  @ApiResponse({ status: 200, description: 'Contador actualizado correctamente', type: Contador })
  @ApiResponse({ status: 404, description: 'Contador no encontrado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateContadorDto: UpdateContadorDto) {
    return this.contadoresService.update(id, updateContadorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un contador por ID' })
  @ApiParam({ name: 'id', description: 'ID del contador' })
  @ApiResponse({ status: 200, description: 'Contador eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Contador no encontrado' })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contadoresService.remove(id);
  }
}