import { Controller, Get } from '@nestjs/common';
import { ContadorService } from './contador.service';


/**
 * ! Importante: No se que mierdas es contador, tengo que preguntarlo.
 */
@Controller('contador')
export class ContadorController {
    constructor(private readonly contadorService: ContadorService) {}

    @Get()
    async getContador() {
        return this.contadorService.getContador();
    }
}
