import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Taller } from '../../talleres/entities/talleres.entity';
import { ProductoServicio } from '../../producto-servicio/entities/producto-servicio.entity';
import { Etiqueta } from '../../etiquetas/entities/etiqueta.entity';

@Entity('promociones')
export class Promocion {
  @PrimaryGeneratedColumn({ name: 'idpromocion' })
  id: number;

  @ManyToOne(() => Taller)
  @JoinColumn({ name: 'idtaller' })
  taller: Taller;

  @ManyToOne(() => ProductoServicio)
  @JoinColumn({ name: 'idprodserv' })
  productoServicio: ProductoServicio;

  @Column({ type: 'datetime', name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column({ type: 'datetime', name: 'fecha_fin' })
  fechaFin: Date;

  @Column({ type: 'longtext', nullable: true })
  descripcion: string;

  @ManyToOne(() => Etiqueta, { nullable: true })
  @JoinColumn({ name: 'idetiqueta' })
  etiqueta: Etiqueta;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'SI', name: 'activo' })
  estaActivo: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'NO', name: 'eliminado' })
  estaEliminado: string;
}