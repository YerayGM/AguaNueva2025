import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { DatosPersonales } from '../../datos-personales/entities/datos-personales.entity';
import { Municipio } from '../../municipios/entities/municipio.entity';

@Entity('Expedientes')
@Unique('idx_expediente_hoja', ['IdExpediente', 'Hoja'])
@Index('idx_fecha', ['Fecha'])
export class Expediente {
  @PrimaryColumn({ type: 'char', length: 10, name: 'IdExpediente' })
  IdExpediente: string;

  @PrimaryColumn({ type: 'int', default: 0 })
  Hoja: number;

  @ManyToOne(() => DatosPersonales)
  @JoinColumn({ name: 'Dni' })
  DatosPersonales: DatosPersonales;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  Fecha: Date;

  @Column({ type: 'varchar', length: 50, default: '' })
  Lugar: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  Localidad: string;

  @ManyToOne(() => Municipio)
  @JoinColumn({ name: 'IdMunicipio' })
  Municipio: Municipio;

  @Column({ type: 'varchar', length: 50, default: '' })
  ContadorNombre: string;

  @Column({ type: 'varchar', length: 30, default: '' })
  ContadorPoliza: string;

  @Column({ type: 'text', nullable: true })
  Observaciones: string | null;

  @Column({ type: 'varchar', length: 50, default: '' })
  Tecnico: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  FechaInforme: Date;

  @Column({ type: 'int', default: 0 })
  Dias: number;

  @Column({ type: 'text', nullable: true })
  ObservacionesTecnico: string | null;

  @Column({ type: 'text', nullable: true })
  TextoInforme: string | null;
}
