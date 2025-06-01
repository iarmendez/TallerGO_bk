import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubcategoriaProdServ } from '../../subcategorias-prodserv/entities/subcategoria-prodserv.entity';

@Entity('producto_servicio')
export class ProductoServicio {
  @PrimaryGeneratedColumn({ name: 'idprodserv' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'longtext', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 16, scale: 2 })
  precio: number;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'SI', name: 'servicio' })
  esServicio: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'SI', name: 'activo' })
  estaActivo: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'NO', name: 'eliminado' })
  estaEliminado: string;

  @OneToMany(() => SubcategoriaProdServ, (subcatProdServ) => subcatProdServ.productoServicio)
  subcategorias: SubcategoriaProdServ[];
}