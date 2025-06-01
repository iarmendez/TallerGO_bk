import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promocion } from './entities/promocion.entity';

@Injectable()
export class PromocionesService {
  constructor(
    @InjectRepository(Promocion)
    private readonly promocionRepository: Repository<Promocion>,
  ) {}

  async create(createPromocionDto: Partial<Promocion>): Promise<Promocion> {
    const promocion = this.promocionRepository.create(createPromocionDto);
    return await this.promocionRepository.save(promocion);
  }

  async findAll(): Promise<Promocion[]> {
    return await this.promocionRepository.find({
      relations: ['taller', 'productoServicio', 'etiqueta'],
    });
  }

  async findOne(id: number): Promise<Promocion> {
    const promocion = await this.promocionRepository.findOne({
      where: { id },
      relations: ['taller', 'productoServicio', 'etiqueta'],
    });
    if (!promocion) throw new NotFoundException(`Promoción con ID ${id} no encontrada`);
    return promocion;
  }

  async update(id: number, updatePromocionDto: Partial<Promocion>): Promise<Promocion> {
    await this.promocionRepository.update(id, updatePromocionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.promocionRepository.delete(id);
  }

  async findActivePromotions(): Promise<Promocion[]> {
    const now = new Date();
    return await this.promocionRepository
      .createQueryBuilder('promocion')
      .where('promocion.fecha_inicio <= :now', { now })
      .andWhere('promocion.fecha_fin >= :now', { now })
      .andWhere('promocion.activo = "SI"')
      .leftJoinAndSelect('promocion.productoServicio', 'productoServicio')
      .getMany();
  }
}
