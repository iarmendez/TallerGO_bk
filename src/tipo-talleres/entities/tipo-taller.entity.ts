import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Taller } from '../../talleres/entities/talleres.entity';

@Entity('tipo_talleres')
export class TipoTaller {
  @PrimaryGeneratedColumn({ name: 'idtipotaller' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'SI', name: 'activo' })
  estaActivo: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'NO', name: 'eliminado' })
  estaEliminado: string;

  @OneToMany(() => Taller, (taller) => taller.tipoTaller)
  talleres: Taller[];
}