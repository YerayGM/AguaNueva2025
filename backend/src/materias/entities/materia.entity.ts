import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('materia')
export class Materia {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'int', default: 0 })
  ORDEN: number;

  @Column({ type: 'varchar', length: 50, charset: 'latin1', collation: 'latin1_spanish_ci' })
  TIPO: string;

  @Column({ type: 'varchar', length: 30, charset: 'latin1', collation: 'latin1_spanish_ci' })
  MATERIA: string;

  @Column({ type: 'double', default: 0 })
  MULTIPLICADOR: number;

  @Column({ type: 'double', default: 0 })
  MINIMO: number;

  @Column({ type: 'double', default: 0 })
  MAXIMO: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  DUMMY: Date;
}