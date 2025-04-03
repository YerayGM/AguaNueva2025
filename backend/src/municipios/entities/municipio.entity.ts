import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { DatosPersonales } from '../../datos-personales/entities/datos-personales.entity';
import { Expediente } from '../../expedientes/entities/expediente.entity';

@Entity('Municipios')
export class Municipio {
  @PrimaryGeneratedColumn({ name: 'IdMunicipio' })
  id: number;

  @Column({ name: 'Municipio', length: 100 })
  @Index('idx_municipios_municipio')
  nombre: string;

  @Column({ name: 'Provincia', length: 50, nullable: true })
  provincia: string;

  @Column({ name: 'CodigoPostal', length: 10, nullable: true })
  codigoPostal: string;

  @Column({ name: 'Dummy', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => DatosPersonales, datosPersonales => datosPersonales.municipio)
  datosPersonales: DatosPersonales[];

  @OneToMany(() => Expediente, expediente => expediente.municipio)
  expedientes: Expediente[];
}