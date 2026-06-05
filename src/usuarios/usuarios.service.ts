import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuarios.entity';
import { DataSource, Repository } from 'typeorm';
import { TipoUsuario } from 'src/tipo-usuarios/entities/tipo-usuario.entity';
import UsuarioResponseDto from './dtos/response/usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(TipoUsuario)
    private readonly tipoUsuarioRepository: Repository<TipoUsuario>,
    private readonly dataSource: DataSource,
  ) {}

  async create(usuarioData: Partial<Usuario>): Promise<UsuarioResponseDto> {
    const tipoUsuario = await this.tipoUsuarioRepository.findOne({
      where: {
        id: usuarioData.tipoUsuario?.id,
        estaEliminado: 'NO',
        estaActivo: 'SI',
      },
    });
    if (!tipoUsuario) {
      throw new NotFoundException('Tipo de usuario no válido');
    }
    await this.dataSource.query('CALL CreateUser(?, ?, ?, ?, ?)', [
      usuarioData.tipoUsuario?.id,
      usuarioData.usuario,
      usuarioData.nombres,
      usuarioData.apellidos,
      usuarioData.pwd,
    ]);
    const usuario = await this.usuarioRepository.findOne({
      where: {
        usuario: usuarioData.usuario,
        estaEliminado: 'NO',
        estaActivo: 'SI',
      },
      relations: ['tipoUsuario'],
    });
    if (!usuario) {
      throw new Error('Error al crear el usuario');
    }
    return new UsuarioResponseDto({
      id: usuario.id,
      tipoUsuario: {
        id: usuario.tipoUsuario.id,
        nombre: usuario.tipoUsuario.nombre,
      },
      usuario: usuario.usuario,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      estaActivo: usuario.estaActivo,
    });
  }

  async findAll(): Promise<UsuarioResponseDto[]> {
    const usuarios = await this.usuarioRepository.find({
      where: { estaEliminado: 'NO', estaActivo: 'SI' },
      relations: ['tipoUsuario'],
    });
    return usuarios.map(
      (usuario) =>
        new UsuarioResponseDto({
          id: usuario.id,
          tipoUsuario: {
            id: usuario.tipoUsuario.id,
            nombre: usuario.tipoUsuario.nombre,
          },
          usuario: usuario.usuario,
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          estaActivo: usuario.estaActivo,
        }),
    );
  }

  async findOne(id: number): Promise<UsuarioResponseDto> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id, estaEliminado: 'NO', estaActivo: 'SI' },
      relations: ['tipoUsuario'],
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return new UsuarioResponseDto({
      id: usuario.id,
      tipoUsuario: {
        id: usuario.tipoUsuario.id,
        nombre: usuario.tipoUsuario.nombre,
      },
      usuario: usuario.usuario,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      estaActivo: usuario.estaActivo,
    });
  }

  async update(
    id: number,
    updateData: Partial<Usuario>,
  ): Promise<UsuarioResponseDto> {
    const usuario = await this.findOne(id);
    if (updateData.tipoUsuario?.id) {
      const tipoUsuario = await this.tipoUsuarioRepository.findOne({
        where: {
          id: updateData.tipoUsuario.id,
          estaEliminado: 'NO',
          estaActivo: 'SI',
        },
      });
      if (!tipoUsuario) {
        throw new NotFoundException('Tipo de usuario no válido');
      }
      usuario.tipoUsuario = tipoUsuario;
    }
    if (updateData.usuario) usuario.usuario = updateData.usuario;
    if (updateData.nombres) usuario.nombres = updateData.nombres;
    if (updateData.apellidos) usuario.apellidos = updateData.apellidos;
    await this.dataSource.query('CALL CreatePwd(?, ?)', [
      usuario.id,
      updateData.pwd,
    ]);
    await this.usuarioRepository.save(usuario);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id, estaEliminado: 'NO', estaActivo: 'SI' },
      relations: ['tipoUsuario'],
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    usuario.estaEliminado = 'SI';
    await this.usuarioRepository.save(usuario);
  }
}
