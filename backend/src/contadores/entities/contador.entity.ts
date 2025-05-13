import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contadores')
export class Contador {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'int', default: 0 })
  CONTADOR: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  DUMMY: Date;
}