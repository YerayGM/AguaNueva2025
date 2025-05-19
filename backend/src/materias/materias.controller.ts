import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { MateriaService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity'; // Asegúrate de que esta entidad existe

@ApiTags('materias')
@Controller('materias') // Cambio a plural para mantener consistencia con otros controladores
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva materia' })
  @ApiResponse({ status: 201, description: 'Materia creada correctamente', type: Materia })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiaService.create(createMateriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las materias' })
  @ApiResponse({ status: 200, description: 'Lista de materias', type: [Materia] })
  findAll() {
    return this.materiaService.findAll();
  }

  @Get('tipo/:tipo')
  @ApiOperation({ summary: 'Buscar materias por tipo' })
  @ApiParam({ name: 'tipo', description: 'Tipo de materia' })
  @ApiResponse({ status: 200, description: 'Materias encontradas', type: [Materia] })
  @ApiResponse({ status: 404, description: 'No se encontraron materias para el tipo proporcionado' })
  findByTipo(@Param('tipo') tipo: string) {
    return this.materiaService.findByTipo(tipo);
  }

  @Get('nombre/:nombre')
  @ApiOperation({ summary: 'Buscar materias por nombre' })
  @ApiParam({ name: 'nombre', description: 'Nombre de materia' })
  @ApiResponse({ status: 200, description: 'Materias encontradas', type: [Materia] })
  @ApiResponse({ status: 404, description: 'No se encontraron materias con el nombre proporcionado' })
  findByNombre(@Param('nombre') nombre: string) {
    return this.materiaService.findByNombre(nombre);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar una materia por ID' })
  @ApiParam({ name: 'id', description: 'ID de la materia' })
  @ApiResponse({ status: 200, description: 'Materia encontrada', type: Materia })
  @ApiResponse({ status: 404, description: 'Materia no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materiaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una materia por ID' })
  @ApiParam({ name: 'id', description: 'ID de la materia' })
  @ApiResponse({ status: 200, description: 'Materia actualizada correctamente', type: Materia })
  @ApiResponse({ status: 404, description: 'Materia no encontrada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.materiaService.update(id, updateMateriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una materia por ID' })
  @ApiParam({ name: 'id', description: 'ID de la materia' })
  @ApiResponse({ status: 200, description: 'Materia eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Materia no encontrada' })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.materiaService.remove(id);
  }
}