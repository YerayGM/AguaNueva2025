import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ExpedientesService } from './expedientes.service';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { UpdateExpedienteDto } from './dto/update-expediente.dto';

@Controller('expedientes')
export class ExpedientesController {
  constructor(private readonly expedientesService: ExpedientesService) {}

  @Post()
  create(@Body() createExpedienteDto: CreateExpedienteDto) {
    return this.expedientesService.create(createExpedienteDto);
  }

  @Get()
  findAll() {
    return this.expedientesService.findAll();
  }

  @Get(':id/:hoja')
  findOne(@Param('id') id: string, @Param('hoja') hoja: number) {
    return this.expedientesService.findOne(id, hoja);
  }

  @Patch(':id/:hoja')
  update(
    @Param('id') id: string,
    @Param('hoja') hoja: number,
    @Body() updateExpedienteDto: UpdateExpedienteDto,
  ) {
    return this.expedientesService.update(id, hoja, updateExpedienteDto);
  }

  @Delete(':id/:hoja')
  remove(@Param('id') id: string, @Param('hoja') hoja: number) {
    return this.expedientesService.remove(id, hoja);
  }
}