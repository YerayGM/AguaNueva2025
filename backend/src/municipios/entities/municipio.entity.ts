import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('Municipios')
export class Municipio {
  @PrimaryGeneratedColumn({ name: 'IdMunicipio' })
  idMunicipio: number;

  @Column({ name: 'Municipio', type: 'varchar', length: 50 })
  @Index('idx_municipio')
  municipio: string;
}
