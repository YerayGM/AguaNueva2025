import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContadorService {
    constructor(private readonly prisma: PrismaService) {}

    async getContador() {
        return this.prisma.contador.findMany();
    }
}
