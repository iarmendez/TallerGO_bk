import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoTaller } from './entities/tipo-taller.entity';

@Injectable()
export class TipoTalleresService {
  constructor(
    @InjectRepository(TipoTaller)
    private readonly tipoTallerRepository: Repository<TipoTaller>,
  ) {}

  async create(createTipoTallerDto: Partial<TipoTaller>): Promise<TipoTaller> {
    const tipoTaller = this.tipoTallerRepository.create(createTipoTallerDto);
    return await this.tipoTallerRepository.save(tipoTaller);
  }

  async findAll(): Promise<TipoTaller[]> {
    return await this.tipoTallerRepository.find();
  }

  async findOne(id: number): Promise<TipoTaller> {
    const tipoTaller = await this.tipoTallerRepository.findOne({ where: { id } });
    if (!tipoTaller) throw new NotFoundException(`TipoTaller con ID ${id} no encontrado`);
    return tipoTaller;
  }

  async update(id: number, updateTipoTallerDto: Partial<TipoTaller>): Promise<TipoTaller> {
    await this.tipoTallerRepository.update(id, updateTipoTallerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tipoTallerRepository.delete(id);
  }
}