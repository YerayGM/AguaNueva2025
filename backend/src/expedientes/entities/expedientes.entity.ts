import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { DatosPersonales } from '../../datos-personales/entities/datos-personales.entity';
import { Municipio } from '../../municipios/entities/municipio.entity';

@Entity('Expedientes')
@Index('idx_fecha', ['fecha'])
export class Expediente {
  @PrimaryColumn({ type: 'char', length: 10 })
  idExpediente: string;

  @PrimaryColumn({ type: 'int' })
  hoja: number;

  @ManyToOne(() => DatosPersonales, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'dni' })
  datosPersonales: DatosPersonales;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ type: 'varchar', length: 50, default: '' })
  lugar: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  localidad: string;

  @ManyToOne(() => Municipio, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idMunicipio' })
  municipio: Municipio;

  @Column({ type: 'varchar', length: 50, default: '' })
  contadorNombre: string;

  @Column({ type: 'varchar', length: 30, default: '' })
  contadorPoliza: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  tecnico: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaInforme: Date;

  @Column({ type: 'int', default: 0 })
  dias: number;

  @Column({ type: 'text', nullable: true })
  observacionesTecnico: string;

  @Column({ type: 'text', nullable: true })
  textoInforme: string;
}