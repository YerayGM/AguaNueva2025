import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Municipio } from '../../municipios/entities/municipio.entity';

@Entity('DatosPersonales')
export class DatosPersonales {
  @PrimaryColumn({ type: 'varchar', length: 12 })
  dni: string;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellidos: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  direccion: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  localidad: string;

  @Column({ type: 'char', length: 5 })
  codigoPostal: string;

  @ManyToOne(() => Municipio, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idMunicipio' })
  municipio: Municipio;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({
    type: 'enum',
    enum: ['si', 'no'],
    default: 'no',
  })
  actividadAgropecuaria: 'si' | 'no';
}