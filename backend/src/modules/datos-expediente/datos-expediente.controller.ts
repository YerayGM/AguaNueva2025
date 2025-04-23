import { Controller, Get, Param } from '@nestjs/common';
import { DatosExpedienteService } from './datos-expediente.service';

@Controller('datos-expediente')
export class DatosExpedienteController {
    constructor(private readonly datosExpedienteService: DatosExpedienteService) {}

    @Get()
    async getDatosExpediente() {
        return this.datosExpedienteService.getDatosExpediente();
    }

    @Get('codigo/:codigo')
    async getDatosExpedienteByCodigo(@Param('codigo') codigo: string) {
        return this.datosExpedienteService.getDatosExpedienteByCodigo(codigo);
    }
}
