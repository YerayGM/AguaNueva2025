import { Injectable } from '@nestjs/common';
import { expediente } from '../../../generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpedienteService {
    constructor(private prisma: PrismaService) {}

    async getAllExpedientes(): Promise<expediente[]> {
        return this.prisma.expediente.findMany();
    }

    async getExpedientesById(expediente_id: number): Promise<expediente | null> {
        return this.prisma.expediente.findUnique({
            where: { 
                expediente_id
            },
        });
    }

    async getExpedientesByCodigo(expediente_codigo: string): Promise<expediente[]> {
        return this.prisma.expediente.findMany({
            where: {
                expediente_codigo
            },
        });
    }

    async getExpedientesByDni(expediente_dni: string): Promise<expediente[]> {
        return this.prisma.expediente.findMany({
            where: {
                expediente_dni
            },
        });
    }

    async getExpedientesByYear(expediente_fecha: Date): Promise<expediente[]> {
        return this.prisma.expediente.findMany({
            where: {
                expediente_fecha: {
                    gte: new Date(new Date(expediente_fecha).setFullYear(new Date(expediente_fecha).getFullYear() - 1)),
                    lte: new Date(new Date(expediente_fecha).setFullYear(new Date(expediente_fecha).getFullYear() + 1)),
                },
            },
        });
    }

    async createExpediente(data: {
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
    }): Promise<expediente> {
        return this.prisma.expediente.create({
            data: {
                expediente_codigo: data.expediente_codigo,
                expediente_fecha: data.expediente_fecha,
                expediente_dni: data.expediente_dni,
                expediente_hoja: data.expediente_hoja ?? 1,
                expediente_lugar: data.expediente_lugar,
                expediente_localidad: data.expediente_localidad,
                expediente_municipio_id: data.expediente_municipio_id,
                expediente_contador_nombre: data.expediente_contador_nombre,
                expediente_contador_poliza: data.expediente_contador_poliza,
                expediente_observaciones: data.expediente_observaciones,
                expediente_tecnico: data.expediente_tecnico,
                expediente_fecha_informe: data.expediente_fecha_informe,
                expediente_observaciones_tecnico: data.expediente_observaciones_tecnico,
            },
        });
    }
}
