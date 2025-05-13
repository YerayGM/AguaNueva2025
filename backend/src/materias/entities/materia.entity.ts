import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('Materia')
@Index('idx_tipo_materia', ['tipo', 'materia'])
export class Materia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  orden: number;

  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @Column({ type: 'varchar', length: 30 })
  materia: string;

  @Column({ type: 'double', default: 0 })
  multiplicador: number;

  @Column({ type: 'double', default: 0 })
  minimo: number;

  @Column({ type: 'double', default: 0 })
  maximo: number;
}