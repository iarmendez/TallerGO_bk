import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: Partial<Categoria>): Promise<Categoria> {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: ['taller', 'subCategorias'],
    });
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: ['taller', 'subCategorias'],
    });
    if (!categoria) throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    return categoria;
  }

  async update(id: number, updateCategoriaDto: Partial<Categoria>): Promise<Categoria> {
    await this.categoriaRepository.update(id, updateCategoriaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.categoriaRepository.delete(id);
  }
}