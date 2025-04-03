import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Expediente } from '../../expedientes/entities/expediente.entity';
import { Materia } from '../../materia/entities/materia.entity';

@Entity('DatosExpediente')
export class DatosExpediente {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Expediente', length: 50 })
  expedienteNumero: string;

  @Column({ name: 'Hoja', length: 50 })
  hojaNumero: string;

  @Column({ name: 'Orden', type: 'int' })
  orden: number;

  @Column({ name: 'Cultivo', length: 100, nullable: true })
  @Index('idx_datosexpediente_cultivo')
  cultivo: string;

  @Column({ name: 'Poligono', length: 20, nullable: true })
  poligono: string;

  @Column({ name: 'Parcela', length: 20, nullable: true })
  parcela: string;

  @Column({ name: 'Recinto', length: 20, nullable: true })
  recinto: string;

  @Column({ name: 'IdMateria', nullable: true })
  idMateria: number;

  @Column({ name: 'Multiplicador', type: 'decimal', precision: 10, scale: 2, default: 1.00 })
  multiplicador: number;

  @Column({ name: 'Minimo', type: 'decimal', precision: 10, scale: 2, nullable: true })
  minimo: number;

  @Column({ name: 'Maximo', type: 'decimal', precision: 10, scale: 2, nullable: true })
  maximo: number;

  @Column({ name: 'Cantidad', type: 'decimal', precision: 10, scale: 2, nullable: true })
  cantidad: number;

  @Column({ name: 'Cantidad_I', type: 'decimal', precision: 10, scale: 2, nullable: true })
  cantidadI: number;

  @Column({ name: 'Desde', type: 'date', nullable: true })
  desde: Date;

  @Column({ name: 'Hasta', type: 'date', nullable: true })
  hasta: Date;

  @Column({ name: 'Cuatri', type: 'int', nullable: true })
  cuatrimestre: number;

  @Column({ name: 'Dummy', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Expediente, expediente => expediente.datosExpedientes, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: 'Expediente', referencedColumnName: 'expediente' },
    { name: 'Hoja', referencedColumnName: 'hoja' }
  ])
  expediente: Expediente;

  @ManyToOne(() => Materia, materia => materia.datosExpedientes, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'IdMateria' })
  materia: Materia;
}