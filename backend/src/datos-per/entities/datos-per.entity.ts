import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('datos_per')
export class DatosPer {
  @PrimaryColumn({ type: 'varchar', length: 12, charset: 'latin1', collation: 'latin1_spanish_ci' })
  DNI: string;

  @Column({ type: 'varchar', length: 50, charset: 'latin1', collation: 'latin1_spanish_ci' })
  APELLIDOS: string;

  @Column({ type: 'varchar', length: 20, nullable: true, charset: 'latin1', collation: 'latin1_spanish_ci' })
  NOMBREC: string;

  @Column({ type: 'varchar', length: 50, nullable: true, charset: 'latin1', collation: 'latin1_spanish_ci' })
  DIRECCION: string;

  @Column({ type: 'varchar', length: 50, nullable: true, charset: 'latin1', collation: 'latin1_spanish_ci' })
  LOCALIDAD: string;

  @Column({ type: 'mediumint', default: 0 })
  ID_MUN: number;

  @Column({ type: 'varchar', length: 50, nullable: true, charset: 'latin1', collation: 'latin1_spanish_ci' })
  TELEFONO: string;

  @Column({ type: 'varchar', length: 100, charset: 'latin1', collation: 'latin1_spanish_ci' })
  EMAIL: string;

  @Column({ type: 'varchar', length: 10, charset: 'latin1', collation: 'latin1_spanish_ci' })
  ACTIVIDADAGROPEC: string;

  @Column({ type: 'tinyint', nullable: true })
  PER_FIS: boolean;

  @Column({ type: 'tinyint', nullable: true })
  PER_JUR: boolean;

  @Column({ type: 'tinyint', nullable: true })
  AGRI_PRO: boolean;

  @Column({ type: 'tinyint', nullable: true })
  AGRI_PARCIAL: boolean;

  @Column({ type: 'tinyint', nullable: true })
  TRAB_ASAL: boolean;

  @Column({ type: 'smallint', nullable: true })
  NUM_ASAL: number;

  @Column({ type: 'tinyint', nullable: true })
  DIS_AGRI_PROF: boolean;

  @Column({ type: 'smallint', nullable: true })
  NUM_AGRI_PROF: number;

  @Column({ type: 'smallint', nullable: true })
  NUM_TRAB_ASAL: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  DUMMY: Date;
}