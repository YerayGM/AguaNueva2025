import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expediente } from './entities/expediente.entity';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { UpdateExpedienteDto } from './dto/update-expediente.dto';
import { FilterExpedienteDto } from './dto/filter-expediente.dto';
import { DatosPersonales } from '../datos-personales/entities/datos-personales.entity';
import { DatosExpediente } from '../datos-expediente/entities/datos-expediente.entity';

@Injectable()
export class ExpedientesService {
  constructor(
    @InjectRepository(Expediente)
    private expedienteRepository: Repository<Expediente>,
    @InjectRepository(DatosPersonales)
    private datosPersonalesRepository: Repository<DatosPersonales>,
    @InjectRepository(DatosExpediente)
    private datosExpedienteRepository: Repository<DatosExpediente>,
  ) {}

  async create(createExpedienteDto: CreateExpedienteDto): Promise<Expediente> {
    // Verificar que el propietario existe
    const propietario = await this.datosPersonalesRepository.findOne({
      where: { dni: createExpedienteDto.dni }
    });

    if (!propietario) {
      throw new NotFoundException(`Propietario con DNI ${createExpedienteDto.dni} no encontrado`);
    }

    // Crear expediente
    const expediente = this.expedienteRepository.create({
      expediente: createExpedienteDto.expediente,
      hoja: createExpedienteDto.hoja,
      dni: createExpedienteDto.dni,
      fecha: new Date(createExpedienteDto.fecha),
      lugar: createExpedienteDto.lugar,
      localidad: createExpedienteDto.localidad,
      idMunicipio: createExpedienteDto.idMunicipio,
      contadorNombre: createExpedienteDto.contadorNombre,
      contadorPoliza: createExpedienteDto.contadorPoliza,
      observaciones: createExpedienteDto.observaciones,
      tecnico: createExpedienteDto.tecnico,
      fechaTecnico: new Date(),
    });

    const savedExpediente = await this.expedienteRepository.save(expediente);

    // Si hay datos de expediente, guardarlos
    if (createExpedienteDto.datosExpediente && createExpedienteDto.datosExpediente.length > 0) {
      const datosExpediente = createExpedienteDto.datosExpediente.map(dato => 
        this.datosExpedienteRepository.create({
          expediente: savedExpediente.expediente,
          hojaNumero: savedExpediente.hoja,
          orden: dato.orden,
          cultivo: dato.cultivo,
          poligono: dato.poligono,
          parcela: dato.parcela,
          recinto: dato.recinto,
          idMateria: dato.idMateria,
          multiplicador: dato.multiplicador,
          minimo: dato.minimo,
          maximo: dato.maximo,
          cantidad: dato.cantidad,
          cantidadI: dato.cantidadI,
          desde: dato.desde ? new Date(dato.desde) : null,
          hasta: dato.hasta ? new Date(dato.hasta) : null,
          cuatrimestre: dato.cuatrimestre,
        })
      );

      await this.datosExpedienteRepository.save(datosExpediente);
    }

    return savedExpediente;
  }

  async findAll(filterDto: FilterExpedienteDto): Promise<Expediente[]> {
    const query = this.expedienteRepository.createQueryBuilder('expediente')
      .leftJoinAndSelect('expediente.datosPersonales', 'datosPersonales')
      .leftJoinAndSelect('expediente.municipio', 'municipio')
      .leftJoinAndSelect('expediente.datosExpedientes', 'datosExpedientes')
      .leftJoinAndSelect('datosExpedientes.materia', 'materia');

    if (filterDto.dni) {
      query.andWhere('expediente.dni LIKE :dni', { dni: `%${filterDto.dni}%` });
    }

    if (filterDto.nombre) {
      query.andWhere('datosPersonales.nombre LIKE :nombre', { nombre: `%${filterDto.nombre}%` });
    }

    if (filterDto.apellidos) {
      query.andWhere('datosPersonales.apellidos LIKE :apellidos', { apellidos: `%${filterDto.apellidos}%` });
    }

    if (filterDto.fechaDesde && filterDto.fechaHasta) {
      query.andWhere('expediente.fecha BETWEEN :fechaDesde AND :fechaHasta', {
        fechaDesde: filterDto.fechaDesde,
        fechaHasta: filterDto.fechaHasta,
      });
    } else if (filterDto.fechaDesde) {
      query.andWhere('expediente.fecha >= :fechaDesde', { fechaDesde: filterDto.fechaDesde });
    } else if (filterDto.fechaHasta) {
      query.andWhere('expediente.fecha <= :fechaHasta', { fechaHasta: filterDto.fechaHasta });
    }

    if (filterDto.municipio) {
      query.andWhere('municipio.nombre LIKE :municipio', { municipio: `%${filterDto.municipio}%` });
    }

    if (filterDto.localidad) {
      query.andWhere('expediente.localidad LIKE :localidad', { localidad: `%${filterDto.localidad}%` });
    }

    if (filterDto.tecnico) {
      query.andWhere('expediente.tecnico LIKE :tecnico', { tecnico: `%${filterDto.tecnico}%` });
    }

    return query.orderBy('expediente.fecha', 'DESC').getMany();
  }

  async findOne(id: number): Promise<Expediente> {
    const expediente = await this.expedienteRepository.findOne({
      where: { id },
      relations: ['datosPersonales', 'municipio', 'datosExpedientes', 'datosExpedientes.materia'],
    });

    if (!expediente) {
      throw new NotFoundException(`Expediente con ID ${id} no encontrado`);
    }

    return expediente;
  }

  async update(id: number, updateExpedienteDto: UpdateExpedienteDto): Promise<Expediente> {
    const expediente = await this.findOne(id);

    // Actualizar campos del expediente
    Object.assign(expediente, {
      ...updateExpedienteDto,
      fecha: updateExpedienteDto.fecha ? new Date(updateExpedienteDto.fecha) : expediente.fecha,
      fechaTecnico: updateExpedienteDto.tecnico ? new Date() : expediente.fechaTecnico,
    });

    return this.expedienteRepository.save(expediente);
  }

  async remove(id: number): Promise<void> {
    const result = await this.expedienteRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Expediente con ID ${id} no encontrado`);
    }
  }
}