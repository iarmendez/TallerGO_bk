import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tipo_usuarios' })
export class TipoUsuario {
  @PrimaryGeneratedColumn({ name: 'idtipousuario' })
  id: number;
  @Column({ type: 'varchar', length: 255 })
  nombre: string;
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
