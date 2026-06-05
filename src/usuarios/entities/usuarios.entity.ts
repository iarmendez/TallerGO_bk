import { TipoUsuario } from 'src/tipo-usuarios/entities/tipo-usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'idusuario' })
  id: number;
  @ManyToOne(() => TipoUsuario)
  @JoinColumn({ name: 'idtipousuario' })
  tipoUsuario: TipoUsuario;
  @Column({ type: 'varchar', length: 255 })
  usuario: string;
  @Column({ type: 'varchar', length: 255 })
  nombres: string;
  @Column({ type: 'varchar', length: 255 })
  apellidos: string;
  @Column({ type: 'varbinary', length: 255 })
  pwd: string;
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
