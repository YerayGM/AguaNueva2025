import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

async function main() {
    // prisma.datosExpediente
    // prisma.datosPersona
    // prisma.expediente
    // prisma.materia
    // prisma.municipio
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })