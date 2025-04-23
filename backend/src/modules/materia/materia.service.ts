import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { materia } from '../../../generated/prisma';

@Injectable()
export class MateriaService {
    constructor(private prisma: PrismaService) {}

    async getAllMaterias(): Promise<materia[]> {
        return this.prisma.materia.findMany();
    }

    async getMunicipiosById(concepto_id: number): Promise<materia | null>{
        return this.prisma.materia.findUnique({
            where: { 
                concepto_id
            },
        });
    }
    
}
