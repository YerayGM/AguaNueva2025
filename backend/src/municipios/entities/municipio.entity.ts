import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('municipios')
export class Municipio {
  @PrimaryGeneratedColumn()
  ID_MUN: number;

  @Column({ type: 'varchar', length: 50, charset: 'latin1', collation: 'latin1_spanish_ci' })
  MUNICIPIO: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  DUMMY: Date;
}