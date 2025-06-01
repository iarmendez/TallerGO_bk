import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Empresa } from '../../empresas/entities/empresas.entity'; 
import { TipoTaller } from '../../tipo-talleres/entities/tipo-taller.entity'; 
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity('talleres')
export class Taller {
  @PrimaryGeneratedColumn({ name: 'idtaller' })
  id: number;

  @ManyToOne(() => Empresa)
  @JoinColumn({ name: 'idempresa' })
  empresa: Empresa;

  @ManyToOne(() => TipoTaller)
  @JoinColumn({ name: 'idtipotaller' })
  tipoTaller: TipoTaller;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  latitud: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  longitud: number;

  @Column({ type: 'longtext', nullable: true })
  direccion: string;

  @Column({ type: 'varchar', length: 35, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 35, nullable: true, name: 'whatsapp' })
  whatsapp: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'email' })
  email: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'SI', name: 'activo' })
  estaActivo: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'NO', name: 'eliminado' })
  estaEliminado: string;

  @OneToMany(() => Categoria, categoria => categoria.taller)
  categorias: Categoria[];
  
}