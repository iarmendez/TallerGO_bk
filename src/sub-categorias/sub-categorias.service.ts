import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategoria } from './entities/sub-categoria.entity';

@Injectable()
export class SubCategoriasService {
  constructor(
    @InjectRepository(SubCategoria)
    private readonly subCategoriaRepository: Repository<SubCategoria>,
  ) {}

  async create(createSubCategoriaDto: Partial<SubCategoria>): Promise<SubCategoria> {
    const subCategoria = this.subCategoriaRepository.create(createSubCategoriaDto);
    return await this.subCategoriaRepository.save(subCategoria);
  }

  async findAll(): Promise<SubCategoria[]> {
    return await this.subCategoriaRepository.find({
      relations: ['categoria', 'productosServicios'],
    });
  }

  async findOne(id: number): Promise<SubCategoria> {
    const subCategoria = await this.subCategoriaRepository.findOne({
      where: { id },
      relations: ['categoria', 'productosServicios'],
    });
    if (!subCategoria) throw new NotFoundException(`SubCategoría con ID ${id} no encontrada`);
    return subCategoria;
  }

  async update(id: number, updateSubCategoriaDto: Partial<SubCategoria>): Promise<SubCategoria> {
    await this.subCategoriaRepository.update(id, updateSubCategoriaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.subCategoriaRepository.delete(id);
  }

  async findByCategoria(idCategoria: number): Promise<SubCategoria[]> {
    return await this.subCategoriaRepository.find({
      where: { categoria: { id: idCategoria } },
    });
  }


}