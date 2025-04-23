import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DatosExpedienteService {
    constructor(private readonly prisma: PrismaService) {}

    async getDatosExpediente(){
        return this.prisma.datosExpediente.findMany();
    }

    async getDatosExpedienteByCodigo(datos_expediente_codigo: string) {
        return this.prisma.datosExpediente.findFirst({
            where: { 
                datos_expediente_codigo
            },
        });
    }
}
