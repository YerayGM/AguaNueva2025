import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Expediente } from '../../expedientes/entities/expedientes.entity';
import { Materia } from '../../materias/entities/materia.entity';

@Entity('DatosExpediente')
@Index('idx_expediente_completo', ['IdExpediente', 'Hoja', 'Orden'])
@Index('idx_materia', ['IdMateria'])
export class DatosExpediente {
  @PrimaryColumn({ type: 'char', length: 10, name: 'IdExpediente' })
  IdExpediente: string;

  @PrimaryColumn({ type: 'int', default: 0 })
  Hoja: number;

  @PrimaryColumn({ type: 'int', default: 0 })
  Orden: number;

  @ManyToOne(() => Expediente)
  @JoinColumn([
    { name: 'IdExpediente', referencedColumnName: 'IdExpediente' },
    { name: 'Hoja', referencedColumnName: 'Hoja' },
  ])
  Expediente: Expediente;

  @Column({ type: 'varchar', length: 100, nullable: true })
  Cultivo: string | null;

  @Column({ type: 'int', nullable: true })
  Poligono: number | null;

  @Column({ type: 'int', nullable: true })
  Parcela: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Recinto: string | null;

  @Column({ type: 'int', name: 'IdMateria' })
  IdMateria: number;

  @ManyToOne(() => Materia)
  @JoinColumn({ name: 'IdMateria' })
  Materia: Materia;

  @Column({ type: 'double', default: 0 })
  Multiplicador: number;

  @Column({ type: 'int', default: 0 })
  Minimo: number;

  @Column({ type: 'int', default: 0 })
  Maximo: number;

  @Column({ type: 'int', default: 0 })
  Cantidad: number;

  @Column({ type: 'int', default: 0 })
  CantidadInicial: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  Desde: Date;

  @Column({ type: 'datetime', nullable: true })
  Hasta: Date | null;

  @Column({ type: 'tinyint', nullable: true })
  Cuatrimestre: number | null;
}
