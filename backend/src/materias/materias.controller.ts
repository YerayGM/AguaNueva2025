import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MateriaService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}

  @Post()
  create(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiaService.create(createMateriaDto);
  }

  @Get()
  findAll() {
    return this.materiaService.findAll();
  }

  @Get('tipo/:tipo')
  findByTipo(@Param('tipo') tipo: string) {
    return this.materiaService.findByTipo(tipo);
  }

  @Get('nombre/:nombre')
  findByNombre(@Param('nombre') nombre: string) {
    return this.materiaService.findByNombre(nombre);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.materiaService.update(+id, updateMateriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materiaService.remove(+id);
  }
}