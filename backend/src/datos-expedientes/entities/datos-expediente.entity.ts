import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Expediente } from '../../expedientes/entities/expedientes.entity';
import { Materia } from '../../materias/entities/materia.entity';

@Entity('DatosExpediente')
@Index('idx_expediente_completo', ['expediente', 'hoja', 'orden'])
@Index('idx_materia', ['materia'])
export class DatosExpediente {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Expediente)
  @JoinColumn([
    { name: 'Expediente', referencedColumnName: 'expediente' },
    { name: 'Hoja', referencedColumnName: 'hoja' },
  ])
  expediente: Expediente;

  @Column({ type: 'int', default: 0 })
  hoja: number;

  @Column({ type: 'int', default: 0 })
  orden: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cultivo: string | null;

  @Column({ type: 'int', nullable: true })
  poligono: number | null;

  @Column({ type: 'int', nullable: true })
  parcela: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  recinto: string | null;

  @ManyToOne(() => Materia)
  @JoinColumn({ name: 'IdMateria' })
  materia: Materia;

  @Column({ type: 'double', default: 0 })
  multiplicador: number;

  @Column({ type: 'int', default: 0 })
  minimo: number;

  @Column({ type: 'int', default: 0 })
  maximo: number;

  @Column({ type: 'int', default: 0 })
  cantidad: number;

  @Column({ type: 'int', default: 0 })
  cantidadInicial: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  desde: Date;

  @Column({ type: 'datetime', nullable: true })
  hasta: Date | null;

  @Column({ type: 'tinyint', nullable: true })
  cuatrimestre: number | null;
}
