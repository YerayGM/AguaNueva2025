import { Controller, Get, HttpCode, Param, ParseIntPipe } from '@nestjs/common';
import { MunicipioService } from './municipio.service';

@Controller('municipio')
export class MunicipioController {
    constructor(private readonly municipioService: MunicipioService) {}

    @Get()
    async getAllMunicipios() {
        return this.municipioService.getAllMunicipios();
    }
    
    @Get('id/:id')
    @HttpCode(500) // Interesante el HttpCode, para unas risas esta bien.
    async getMunicipioById(@Param('id', ParseIntPipe) id: number) {
        return await this.municipioService.getMunicipiosById(id);
    }

    @Get('nombre/:nombre')
    async getMunicipioByNombre(@Param('nombre') nombre: string) {
        return await this.municipioService.getMunicipiosByNombre(nombre);
    }
}