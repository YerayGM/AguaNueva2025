import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('datos_expediente')
export class DatosExpediente {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'char', length: 8, charset: 'latin1', collation: 'latin1_spanish_ci' })
  EXPEDIENTE: string;

  @Column({ type: 'mediumint', default: 0 })
  HOJA: number;

  @Column({ type: 'mediumint', default: 0 })
  ORDEN: number;

  @Column({ type: 'varchar', length: 100, nullable: true, charset: 'latin1', collation: 'latin1_spanish_ci' })
  CULTIVO: string;

  @Column({ type: 'int', nullable: true })
  POLIGONO: number;

  @Column({ type: 'int', nullable: true })
  PARCELA: number;

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'latin1', collation: 'latin1_spanish_ci' })
  RECINTO: string;

  @Column({ type: 'int', default: 0 })
  ID_MATERIA: number;

  @Column({ type: 'double', default: 0 })
  MULTIPLICADOR: number;

  @Column({ type: 'int', default: 0 })
  MINIMO: number;

  @Column({ type: 'int', default: 0 })
  MAXIMO: number;

  @Column({ type: 'int', default: 0 })
  CANTIDAD: number;

  @Column({ type: 'int', default: 0 })
  CANTIDAD_I: number;

  @Column({ type: 'datetime', default: () => "'0000-00-00 00:00:00'" })
  DESDE: Date;

  @Column({ type: 'datetime', default: () => "'0000-00-00 00:00:00'" })
  HASTA: Date;

  @Column({ type: 'int', nullable: true })
  CUATRI: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  DUMMY: Date;
}