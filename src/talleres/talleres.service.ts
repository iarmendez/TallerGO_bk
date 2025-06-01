import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taller } from './entities/talleres.entity';

@Injectable()
export class TalleresService {
  constructor(
    @InjectRepository(Taller)
    private readonly tallerRepository: Repository<Taller>,
  ) {}

  async create(createTallerDto: Partial<Taller>): Promise<Taller> {
    const taller = this.tallerRepository.create(createTallerDto);
    return await this.tallerRepository.save(taller);
  }

  async findAll(): Promise<Taller[]> {
    return await this.tallerRepository.find({
      relations: ['empresa', 'tipoTaller'],
    });
  }

  async findOne(id: number): Promise<Taller> {
    const taller = await this.tallerRepository.findOne({
      where: { id },
      relations: ['empresa', 'tipoTaller'],
    });
    if (!taller) throw new NotFoundException(`Taller con ID ${id} no encontrado`);
    return taller;
  }

  async update(id: number, updateTallerDto: Partial<Taller>): Promise<Taller> {
    await this.tallerRepository.update(id, updateTallerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tallerRepository.delete(id);
  }
}
