import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Contadores')
export class Contador {
  @PrimaryGeneratedColumn({ name: 'Contador' })
  id: number;

  @Column({ name: 'Descripcion', length: 100, nullable: true })
  descripcion: string;

  @Column({ name: 'Dummy', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
