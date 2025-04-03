import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, Unique } from 'typeorm';
import { DatosExpediente } from '../../datos-expediente/entities/datos-expediente.entity';

@Entity('Materia')
@Unique('idx_orden_tipo', ['orden', 'tipo'])
export class Materia {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Orden', type: 'int' })
  orden: number;

  @Column({ name: 'Tipo', length: 50 })
  @Index('idx_materia_tipo')
  tipo: string;

  @Column({ name: 'Materia', length: 255 })
  materia: string;

  @Column({ name: 'Multiplicador', type: 'decimal', precision: 10, scale: 2, default: 1.00 })
  multiplicador: number;

  @Column({ name: 'Minimo', type: 'decimal', precision: 10, scale: 2, nullable: true })
  minimo: number;

  @Column({ name: 'Maximo', type: 'decimal', precision: 10, scale: 2, nullable: true })
  maximo: number;

  @Column({ name: 'Dummy', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => DatosExpediente, datosExpediente => datosExpediente.materia)
  datosExpedientes: DatosExpediente[];
}