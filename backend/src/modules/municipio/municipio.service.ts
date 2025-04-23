import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { municipio } from "../../../generated/prisma";

@Injectable()
export class MunicipioService {
    constructor(private prisma: PrismaService) {}

    async getAllMunicipios(): Promise<municipio[]> {
        return this.prisma.municipio.findMany();
    }

    async getMunicipiosById(municipio_id: number): Promise<municipio | null>{
        return this.prisma.municipio.findUnique({
            where: { 
                municipio_id
            },
        });
    }

    async getMunicipiosByNombre(municipio_nombre: string): Promise<municipio[]> {
        return this.prisma.municipio.findMany({
            where: {
                municipio_nombre
            },
        });
    }

    /**
     * ? Posiblemente se necesite añadir municipios(preguntar a Gero).
    */


    // async getAllMunicipios(): Promise<municipio[]> {
    //     return this.prisma.municipio.findMany();
    // }

    // async getAllMunicipios(): Promise<municipio[]> {
    //     return this.prisma.municipio.findMany();
    // }
}