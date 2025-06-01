import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Taller } from '../../talleres/entities/talleres.entity';
import { SubCategoria } from '../../sub-categorias/entities/sub-categoria.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn({ name: 'idcategoria' })
  id: number;

  @ManyToOne(() => Taller, (taller) => taller.categorias)
  @JoinColumn({ name: 'idtaller' })
  taller: Taller;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'SI', name: 'activo' })
  estaActivo: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'NO', name: 'eliminado' })
  estaEliminado: string;

  @OneToMany(() => SubCategoria, (subCategoria) => subCategoria.categoria)
  subCategorias: SubCategoria[];
}