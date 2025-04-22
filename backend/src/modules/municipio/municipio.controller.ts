import { Controller, Get } from '@nestjs/common';
import { MunicipioService } from './municipio.service';

@Controller('municipio')
export class MunicipioController {
    constructor(private readonly municipioService: MunicipioService) {}

    @Get()
    async getAllMunicipios() {
        return this.municipioService.getAllMunicipios();
    }

    @Get(':id')
    async getMunicipioById(id: number) {
        return this.municipioService.getMunicipiosById(id);
    }

    @Get('nombre/:nombre')
    async getMunicipioByNombre(nombre: string) {
        return this.municipioService.getMunicipiosByNombre(nombre); 
    }
}
