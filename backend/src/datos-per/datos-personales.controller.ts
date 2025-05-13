import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatosPersonalesService } from './datos-personales.service';
import { CreateDatosPerDto } from './dto/create-datos-per.dto';
import { UpdateDatosPerDto } from './dto/update-datos-per.dto';

@Controller('datos-personales')
export class DatosPersonalesController {
  constructor(private readonly datosPersonalesService: DatosPersonalesService) {}

  @Post()
  create(@Body() createDatosPerDto: CreateDatosPerDto) {
    return this.datosPersonalesService.create(createDatosPerDto);
  }

  @Get()
  findAll() {
    return this.datosPersonalesService.findAll();
  }

  @Get('dni/:dni')
  findByDni(@Param('dni') dni: string) {
    return this.datosPersonalesService.findOne(dni);
  }

  @Get('nombre')
  findByNombre(@Param('nombre') nombre: string, @Param('apellidos') apellidos?: string) {
    return this.datosPersonalesService.findByNombre(nombre, apellidos);
  }

  @Get('municipio/:idMunicipio')
  findByMunicipio(@Param('idMunicipio') idMunicipio: number) {
    return this.datosPersonalesService.findByMunicipio(idMunicipio);
  }

  @Patch(':dni')
  update(@Param('dni') dni: string, @Body() updateDatosPerDto: UpdateDatosPerDto) {
    return this.datosPersonalesService.update(dni, updateDatosPerDto);
  }

  @Delete(':dni')
  remove(@Param('dni') dni: string) {
    return this.datosPersonalesService.remove(dni);
  }
}