import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('expedientes')
export class Expediente {
  @PrimaryGeneratedColumn({ unsigned: true })
  ID: number;

  @Column({ type: 'char', length: 8, charset: 'latin1', collation: 'latin1_spanish_ci', default: '.' })
  EXPEDIENTE: string;

  @Column({ type: 'int', default: 0 })
  HOJA: number;

  @Column({ type: 'char', length: 12, charset: 'latin1', collation: 'latin1_spanish_ci', default: '.' })
  DNI: string;

  @Column({ type: 'datetime', default: () => "'0000-00-00 00:00:00'" })
  FECHA: Date;

  @Column({ type: 'char', length: 50, charset: 'latin1', collation: 'latin1_spanish_ci', default: '.' })
  LUGAR: string;

  @Column({ type: 'char', length: 50, charset: 'latin1', collation: 'latin1_spanish_ci', default: '.' })
  LOCALIDAD: string;

  @Column({ type: 'int', default: 0 })
  ID_MUN: number;

  @Column({ type: 'char', length: 50, charset: 'latin1', collation: 'latin1_spanish_ci', default: '.' })
  CONT_NOMBRE: string;

  @Column({ type: 'char', length: 30, charset: 'latin1', collation: 'latin1_spanish_ci', default: '.' })
  CONT_POLIZA: string;

  @Column({ type: 'char', length: 255, charset: 'latin1', collation: 'latin1_spanish_ci', default: '.' })
  OBSER: string;

  @Column({ type: 'char', length: 50, charset: 'latin1', collation: 'latin1_spanish_ci', default: '.' })
  TECNICO: string;

  @Column({ type: 'datetime', default: () => "'2013-01-01 00:00:00'" })
  FECHA_I: Date;

  @Column({ type: 'int', default: 0 })
  DIAS: number;

  @Column({ type: 'char', length: 255, charset: 'latin1', collation: 'latin1_spanish_ci', default: '.' })
  OB_TEC: string;

  @Column({ type: 'char', length: 255, charset: 'latin1', collation: 'latin1_spanish_ci', default: '.' })
  TXT_INFORME: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  DUMMY: Date;
}