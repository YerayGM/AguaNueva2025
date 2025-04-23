import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { datosPersona } from '../../../generated/prisma';

@Injectable()
export class DatosPersonaService {
    constructor(private prisma: PrismaService) {}

    async getAllDatosPersona(): Promise<datosPersona[]> {
        return this.prisma.datosPersona.findMany();
    }

    async getDatosPersonaByDNI(dni: string): Promise<datosPersona | null> {
        return this.prisma.datosPersona.findUnique({
            where: { 
                dni
            },
        });
    }

    async getDatosPersonaByMunicipioId(municipio_id: number): Promise<datosPersona[]> {
        return this.prisma.datosPersona.findMany({
            where: { 
                municipio_id
            },
        });
    }
}
