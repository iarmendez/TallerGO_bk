import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoUsuario } from './entities/tipo-usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoUsuariosService {
  constructor(
    @InjectRepository(TipoUsuario)
    private tipoUsuarioRepository: Repository<TipoUsuario>,
  ) {}

  async findAll() {
    const tipoUsuarios = await this.tipoUsuarioRepository.find({
      where: {
        estaActivo: 'SI',
        estaEliminado: 'NO',
      },
    });
    return tipoUsuarios;
  }

  async findOne(id: number) {
    const tipoUsuario = await this.tipoUsuarioRepository.findOne({
      where: {
        id,
        estaActivo: 'SI',
        estaEliminado: 'NO',
      },
    });
    if (!tipoUsuario) {
      throw new NotFoundException(`TipoUsuario con ID ${id} no encontrado`);
    }
    return tipoUsuario;
  }

  async create(createTipoUsuarioDto: Partial<TipoUsuario>) {
    const tipoUsuario = this.tipoUsuarioRepository.create(createTipoUsuarioDto);
    return await this.tipoUsuarioRepository.save(tipoUsuario);
  }

  async update(id: number, updateTipoUsuarioDto: Partial<TipoUsuario>) {
    await this.tipoUsuarioRepository.update(id, updateTipoUsuarioDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.tipoUsuarioRepository.delete(id);
  }
}
