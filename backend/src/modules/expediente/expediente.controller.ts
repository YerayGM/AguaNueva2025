import{ Controller, Get, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { ExpedienteService } from './expediente.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('expediente')
@Controller('expediente')
export class ExpedienteController {
    constructor(private readonly expedienteService: ExpedienteService) {}

    @Get()
    async getAllExpedientes() {
        return this.expedienteService.getAllExpedientes();
    }

    @Post()
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                expediente_codigo: { type: 'string' },
                expediente_fecha: { type: 'string', format: 'date-time' },
                expediente_dni: { type: 'string' },
                expediente_hoja: { type: 'number', nullable: true },
                expediente_lugar: { type: 'string', nullable: true },
                expediente_localidad: { type: 'string', nullable: true },
                expediente_municipio_id: { type: 'number', nullable: true },
                expediente_contador_nombre: { type: 'string', nullable: true },
                expediente_contador_poliza: { type: 'string', nullable: true },
                expediente_observaciones: { type: 'string', nullable: true },
                expediente_tecnico: { type: 'string', nullable: true },
                expediente_fecha_informe: {
                    type: 'string',
                    format: 'date-time',
                    nullable: true,
                },
                expediente_observaciones_tecnico: { type: 'string', nullable: true },
            },
            required: ['expediente_codigo', 'expediente_fecha', 'expediente_dni'],
        },
    })

    async createExpediente(
        @Body()
        data: {
            expediente_codigo: string;
            expediente_fecha: Date;
            expediente_dni: string;
            expediente_hoja?: number;
            expediente_lugar?: string;
            expediente_localidad?: string;
            expediente_municipio_id?: number;
            expediente_contador_nombre?: string;
            expediente_contador_poliza?: string;
            expediente_observaciones?: string;
            expediente_tecnico?: string;
            expediente_fecha_informe?: Date;
            expediente_observaciones_tecnico?: string;
        },
    ){
        return this.expedienteService.createExpediente(data);
    }

    @Get('id/:id')
    async getExpedienteById(@Param('id', ParseIntPipe) id: number) {
        return await this.expedienteService.getExpedientesById(id);
    }

    @Get('codigo/:codigo')
    async getExpedienteByCodigo(@Param('codigo') codigo: string) {
        return await this.expedienteService.getExpedientesByCodigo(codigo);
    }

    @Get('dni/:dni')
    async getExpedienteByDni(@Param('dni') dni: string) {
        return await this.expedienteService.getExpedientesByDni(dni);
    }

    @Get('year/:year')
    async getExpedienteByYear(@Param('year') year: string) {
        const yearDate = new Date(`${year}-01-01`);
        return await this.expedienteService.getExpedientesByYear(yearDate);
    }
}
