import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { SubcategoriaProdServ } from '../../subcategorias-prodserv/entities/subcategoria-prodserv.entity';

@Entity('sub_categorias')
export class SubCategoria {
  @PrimaryGeneratedColumn({ name: 'idsubcategoria' })
  id: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.subCategorias)
  @JoinColumn({ name: 'idcategoria' })
  categoria: Categoria;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'SI', name: 'activo' })
  estaActivo: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'NO', name: 'eliminado' })
  estaEliminado: string;

  @OneToMany(() => SubcategoriaProdServ, (subcatProdServ) => subcatProdServ.subCategoria)
  productosServicios: SubcategoriaProdServ[];
}