import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { Municipio } from '../../municipios/entities/municipio.entity';
import { Expediente } from '../../expedientes/entities/expediente.entity';

@Entity('DatosPersonales')
export class DatosPersonales {
  @PrimaryColumn({ name: 'DNI', length: 15 })
  dni: string;

  @Column({ name: 'Nombre', length: 100 })
  @Index('idx_datospersonales_nombre')
  nombre: string;

  @Column({ name: 'Apellidos', length: 200 })
  @Index('idx_datospersonales_apellidos')
  apellidos: string;

  @Column({ name: 'Direccion', length: 255, nullable: true })
  direccion: string;

  @Column({ name: 'Localidad', length: 100, nullable: true })
  @Index('idx_datospersonales_localidad')
  localidad: string;

  @Column({ name: 'IdMunicipio', nullable: true })
  idMunicipio: number;

  @Column({ name: 'Telefono', length: 20, nullable: true })
  telefono: string;

  @Column({ name: 'Email', length: 100, nullable: true })
  @Index('idx_datospersonales_email')
  email: string;

  @Column({ name: 'ActividadAgropecuaria', type: 'tinyint', default: 0 })
  actividadAgropecuaria: boolean;

  @Column({ name: 'Dummy', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'PerFis', type: 'tinyint', default: 1 })
  personaFisica: boolean;

  @Column({ name: 'PerJur', type: 'tinyint', default: 0 })
  personaJuridica: boolean;

  @Column({ name: 'AgricultorProfesional', type: 'tinyint', default: 0 })
  agricultorProfesional: boolean;

  @Column({ name: 'AgricultorParcial', type: 'tinyint', default: 0 })
  agricultorParcial: boolean;

  @Column({ name: 'TrabajadorAsalariado', type: 'tinyint', default: 0 })
  trabajadorAsalariado: boolean;

  @Column({ name: 'NumeroAsalariados', type: 'int', default: 0 })
  numeroAsalariados: number;

  @Column({ name: 'DisAgriProf', type: 'tinyint', default: 0 })
  disponeAgricultorProfesional: boolean;

  @Column({ name: 'NumeroAgricultoresProfesionales', type: 'int', default: 0 })
  numeroAgricultoresProfesionales: number;

  @Column({ name: 'NumeroTrabajadoresAsalariados', type: 'int', default: 0 })
  numeroTrabajadoresAsalariados: number;

  @ManyToOne(() => Municipio, municipio => municipio.datosPersonales, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'IdMunicipio' })
  municipio: Municipio;

  @OneToMany(() => Expediente, expediente => expediente.datosPersonales)
  expedientes: Expediente[];
}