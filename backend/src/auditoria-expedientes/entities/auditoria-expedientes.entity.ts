import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('Auditoria_Expedientes')
@Index('idx_expediente_hoja', ['expediente', 'hoja'])
@Index('idx_fecha_modificacion', ['fechaModificacion'])
export class AuditoriaExpedientes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 8 })
  expediente: string;

  @Column({ type: 'int' })
  hoja: number;

  @Column({ type: 'varchar', length: 10 })
  accion: string;

  @Column({ type: 'varchar', length: 50 })
  usuarioModificacion: string;

  @Column({ type: 'datetime' })
  fechaModificacion: Date;

  @Column({ type: 'text', nullable: true })
  datosAnteriores: string | null;

  @Column({ type: 'text', nullable: true })
  datosNuevos: string | null;
}
