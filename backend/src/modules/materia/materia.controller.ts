import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MateriaService } from './materia.service';
@Controller('materia')
export class MateriaController {
    constructor(private readonly materiaService: MateriaService) {}

    @Get()
    async getAllMaterias() {
        return this.materiaService.getAllMaterias();
    }

    @Get('id/:id')
    async getMateriaById(@Param('id', ParseIntPipe) id: number) {
        return await this.materiaService.getMunicipiosById(id);
    }
}

