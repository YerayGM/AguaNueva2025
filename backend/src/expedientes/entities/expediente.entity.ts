import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Index, Unique } from 'typeorm';
import { DatosPersonales } from '../../datos-personales/entities/datos-personales.entity';
import { Municipio } from '../../municipios/entities/municipio.entity';
import { DatosExpediente } from '../../datos-expediente/entities/datos-expediente.entity';

@Entity('Expedientes')
@Unique('idx_expediente_hoja', ['expediente', 'hoja'])
export class Expediente {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Expediente', length: 50 })
  expediente: string;

  @Column({ name: 'Hoja', length: 50 })
  hoja: string;

  @Column({ name: 'DNI', length: 15 })
  dni: string;

  @Column({ name: 'Fecha', type: 'date' })
  @Index()
  fecha: Date;

  @Column({ name: 'Lugar', length: 100, nullable: true })
  lugar: string;

  @Column({ name: 'Localidad', length: 100, nullable: true })
  @Index('idx_expedientes_localidad')
  localidad: string;

  @Column({ name: 'IdMunicipio', nullable: true })
  idMunicipio: number;

  @Column({ name: 'ContNombre', length: 100, nullable: true })
  contadorNombre: string;

  @Column({ name: 'ContPoliza', length: 50, nullable: true })
  contadorPoliza: string;

  @Column({ name: 'Observaciones', type: 'text', nullable: true })
  observaciones: string;

  @Column({ name: 'Tecnico', length: 100, nullable: true })
  @Index('idx_expedientes_tecnico')
  tecnico: string;

  @Column({ name: 'FechaTecnico', type: 'date', nullable: true })
  fechaTecnico: Date;

  @Column({ name: 'Dias', type: 'int', default: 0 })
  dias: number;

  @Column({ name: 'ObTec', type: 'text', nullable: true })
  observacionesTecnico: string;

  @Column({ name: 'Dummy', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'InformeTXT', type: 'text', nullable: true })
  informeTXT: string;

  @ManyToOne(() => DatosPersonales, datosPersonales => datosPersonales.expedientes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'DNI' })
  datosPersonales: DatosPersonales;

  @ManyToOne(() => Municipio, municipio => municipio.expedientes, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'IdMunicipio' })
  municipio: Municipio;

  @OneToMany(() => DatosExpediente, datosExpediente => datosExpediente.expediente)
  datosExpedientes: DatosExpediente[];
}