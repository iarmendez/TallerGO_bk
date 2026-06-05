import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opinion } from './entities/opinion.entity';
import { Taller } from '../talleres/entities/talleres.entity';
import { Usuario } from '../usuarios/entities/usuarios.entity';

@Injectable()
export class OpinionesService {
  constructor(
    @InjectRepository(Opinion)
    private readonly opinionRepository: Repository<Opinion>,
    @InjectRepository(Taller)
    private readonly tallerRepository: Repository<Taller>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(
    userId: number,
    idtaller: number,
    estrellas: number,
    comentarios?: string,
  ): Promise<Opinion> {
    if (estrellas < 1 || estrellas > 5) {
      throw new BadRequestException('Las estrellas deben estar entre 1 y 5');
    }

    const taller = await this.tallerRepository.findOne({
      where: { id: idtaller, estaEliminado: 'NO' },
    });
    if (!taller) {
      throw new NotFoundException(`Taller con ID ${idtaller} no encontrado`);
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { id: userId, estaEliminado: 'NO' },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    // Verificar si el usuario ya registró una reseña para este taller
    const existing = await this.opinionRepository.findOne({
      where: {
        usuario: { id: userId },
        taller: { id: idtaller },
        estaEliminado: 'NO',
      },
    });

    if (existing) {
      throw new BadRequestException(
        'El usuario ya ha registrado una reseña para este taller',
      );
    }

    const opinion = this.opinionRepository.create({
      usuario,
      taller,
      estrellas,
      comentarios,
      estaActivo: 'SI',
      estaEliminado: 'NO',
    });

    return await this.opinionRepository.save(opinion);
  }

  async findAll(idtaller?: number, idusuario?: number): Promise<Opinion[]> {
    const whereClause: any = { estaEliminado: 'NO' };
    if (idtaller) {
      whereClause.taller = { id: idtaller };
    }
    if (idusuario) {
      whereClause.usuario = { id: idusuario };
    }

    return await this.opinionRepository.find({
      where: whereClause,
      relations: ['usuario', 'taller'],
    });
  }

  async findOne(id: number): Promise<Opinion> {
    const opinion = await this.opinionRepository.findOne({
      where: { id, estaEliminado: 'NO' },
      relations: ['usuario', 'taller'],
    });
    if (!opinion) {
      throw new NotFoundException(`Reseña con ID ${id} no encontrada`);
    }
    return opinion;
  }

  async update(
    id: number,
    userId: number,
    updateDto: { estrellas?: number; comentarios?: string },
  ): Promise<Opinion> {
    const opinion = await this.findOne(id);

    if (opinion.usuario.id !== userId) {
      throw new BadRequestException('No tienes permiso para editar esta reseña');
    }

    if (updateDto.estrellas !== undefined) {
      if (updateDto.estrellas < 1 || updateDto.estrellas > 5) {
        throw new BadRequestException('Las estrellas deben estar entre 1 y 5');
      }
      opinion.estrellas = updateDto.estrellas;
    }
    if (updateDto.comentarios !== undefined) {
      opinion.comentarios = updateDto.comentarios;
    }

    return await this.opinionRepository.save(opinion);
  }

  async remove(id: number, userId: number): Promise<void> {
    const opinion = await this.findOne(id);

    if (opinion.usuario.id !== userId) {
      throw new BadRequestException('No tienes permiso para eliminar esta reseña');
    }

    opinion.estaEliminado = 'SI';
    await this.opinionRepository.save(opinion);
  }
}
