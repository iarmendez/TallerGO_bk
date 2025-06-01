import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Taller } from '../../talleres/entities/talleres.entity';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn({ name: 'idempresa' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  latitud: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  longitud: number;

  @Column({ type: 'longtext', name: 'direccion_principal' })
  direccionPrincipal: string;

  @Column({ type: 'varchar', length: 35, name: 'telefono_principal' })
  telefonoPrincipal: string;

  @Column({ type: 'varchar', length: 255, name: 'correo_principal' })
  correoPrincipal: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'SI', name: 'activo' })
  estaActivo: string;

  @Column({ type: 'enum', enum: ['SI', 'NO'], default: 'NO', name: 'eliminado' })
  estaEliminado: string;

  @OneToMany(() => Taller, (taller) => taller.empresa)
  talleres: Taller[];
}