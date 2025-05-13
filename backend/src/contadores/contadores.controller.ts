import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContadoresService } from './contadores.service';
import { CreateContadorDto } from './dto/create-contador.dto';
import { UpdateContadorDto } from './dto/update-contador.dto';

@Controller('contadores')
export class ContadoresController {
  constructor(private readonly contadoresService: ContadoresService) {}

  @Post()
  create(@Body() createContadorDto: CreateContadorDto) {
    return this.contadoresService.create(createContadorDto);
  }

  @Get()
  findAll() {
    return this.contadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contadoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContadorDto: UpdateContadorDto) {
    return this.contadoresService.update(+id, updateContadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contadoresService.remove(+id);
  }
}