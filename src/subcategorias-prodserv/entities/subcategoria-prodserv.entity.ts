import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { SubCategoria } from '../../sub-categorias/entities/sub-categoria.entity';
import { ProductoServicio } from '../../producto-servicio/entities/producto-servicio.entity';

@Entity('subcategorias_prodserv')
export class SubcategoriaProdServ {
  @PrimaryGeneratedColumn({ name: 'idsubcategoriaprodserv' })
  id: number;

  @ManyToOne(() => SubCategoria, (subCategoria) => subCategoria.productosServicios)
  @JoinColumn({ name: 'idsubcategoria' })
  subCategoria: SubCategoria;

  @ManyToOne(() => ProductoServicio, (prodServ) => prodServ.subcategorias)
  @JoinColumn({ name: 'idprodserv' })
  productoServicio: ProductoServicio;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'SI', name: 'activo' })
  estaActivo: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'NO', name: 'eliminado' })
  estaEliminado: string;
}