import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Municipio } from '../../municipios/entities/municipio.entity';

@Entity('DatosPersonales')
@Index('idx_nombre_apellidos', ['nombre', 'apellidos'])
export class DatosPersonales {
  @PrimaryColumn({ type: 'varchar', length: 12 })
  dni: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellidos: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  direccion: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  localidad: string;

  @ManyToOne(() => Municipio)
  @JoinColumn({ name: 'IdMunicipio' })
  municipio: Municipio;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'enum', enum: ['si', 'no'], default: 'no' })
  actividadAgropecuaria: 'si' | 'no';

  @Column({ type: 'boolean', nullable: true })
  personaFiscal: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  personaJuridica: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  agricultorProfesional: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  agricultorlTiempoParcial: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  trabajadorAsalariado: boolean | null;

  @Column({ type: 'smallint', nullable: true })
  numeroasAlariados: number | null;

  @Column({ type: 'boolean', nullable: true })
  discapacidadAgricultorProfesional: boolean | null;

  @Column({ type: 'smallint', nullable: true })
  numeroAgriculresProfesionales: number | null;

  @Column({ type: 'smallint', nullable: true })
  numeroTrabajadoresAsalariados: number | null;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;
}
