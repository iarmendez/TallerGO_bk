import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductoServicio } from '../../producto-servicio/entities/producto-servicio.entity';
import { Etiqueta } from './etiqueta.entity';

@Entity({ name: 'prodserv_etiquetas' })
export class ProdservEtiqueta {
  @PrimaryGeneratedColumn({ name: 'idprodservetiqueta' })
  id: number;

  @ManyToOne(() => ProductoServicio)
  @JoinColumn({ name: 'idprodserv' })
  productoServicio: ProductoServicio;

  @ManyToOne(() => Etiqueta)
  @JoinColumn({ name: 'idetiqueta' })
  etiqueta: Etiqueta;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'SI', name: 'activo' })
  estaActivo: string;

  @Column({
    type: 'enum',
    enum: ['SI', 'NO'],
    default: 'NO',
    name: 'eliminado',
  })
  estaEliminado: string;
}
