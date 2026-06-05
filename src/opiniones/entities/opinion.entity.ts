import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuarios.entity';
import { Taller } from '../../talleres/entities/talleres.entity';

@Entity('opiniones')
export class Opinion {
  @PrimaryGeneratedColumn({ name: 'idopinion' })
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idusuario' })
  usuario: Usuario;

  @ManyToOne(() => Taller)
  @JoinColumn({ name: 'idtaller' })
  taller: Taller;

  @Column({ type: 'int', name: 'estrellas' })
  estrellas: number;

  @Column({ type: 'longtext', nullable: true, name: 'comentarios' })
  comentarios: string;

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
