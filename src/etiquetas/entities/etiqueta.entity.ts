import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('etiquetas')
export class Etiqueta {
  @PrimaryGeneratedColumn({ name: 'idetiqueta' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'SI', name: 'activo' })
  estaActivo: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'NO', name: 'eliminado' })
  estaEliminado: string;
}