import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { DatosPersonales } from '../../datos-personales/entities/datos-personales.entity';
import { Municipio } from '../../municipios/entities/municipio.entity';

@Entity('Expedientes')
@Unique('idx_expediente_hoja', ['expediente', 'hoja'])
@Index('idx_fecha', ['fecha'])
export class Expediente {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'char', length: 8 })
  expediente: string;

  @Column({ type: 'int', default: 0 })
  hoja: number;

  @ManyToOne(() => DatosPersonales)
  @JoinColumn({ name: 'Dni' })
  datosPersonales: DatosPersonales;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ type: 'varchar', length: 50, default: '' })
  lugar: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  localidad: string;

  @ManyToOne(() => Municipio)
  @JoinColumn({ name: 'IdMunicipio' })
  municipio: Municipio;

  @Column({ type: 'varchar', length: 50, default: '' })
  contadorNombre: string;

  @Column({ type: 'varchar', length: 30, default: '' })
  contadorPoliza: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string | null;

  @Column({ type: 'varchar', length: 50, default: '' })
  tecnico: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaInforme: Date;

  @Column({ type: 'int', default: 0 })
  dias: number;

  @Column({ type: 'text', nullable: true })
  observacionesTecnico: string | null;

  @Column({ type: 'text', nullable: true })
  textoInforme: string | null;
}
