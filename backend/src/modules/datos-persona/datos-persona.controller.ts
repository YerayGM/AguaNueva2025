import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { datosPersona } from 'generated/prisma';
import { DatosPersonaService } from './datos-persona.service';

@Controller('datos-persona')
export class DatosPersonaController {
    constructor(private readonly datosPersonaService: DatosPersonaService) {}

    @Get()
    async getAllDatosPersona(): Promise<datosPersona[]> {
        return this.datosPersonaService.getAllDatosPersona();
    }

    @Get('dni/:dni')
    async getDatosPersonaByDNI(@Param('dni') dni: string): Promise<datosPersona | null> {
        return this.datosPersonaService.getDatosPersonaByDNI(dni);
    }
    
    @Get('municipio/:municipio_id')
    async getDatosPersonaByMunicipioId(@Param('municipio_id', ParseIntPipe) municipio_id: number): Promise<datosPersona[]> {
        return this.datosPersonaService.getDatosPersonaByMunicipioId(municipio_id);
    }
}