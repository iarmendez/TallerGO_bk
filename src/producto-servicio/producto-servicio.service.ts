import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoServicio } from './entities/producto-servicio.entity';

@Injectable()
export class ProductoServicioService {
  constructor(
    @InjectRepository(ProductoServicio)
    private readonly productoServicioRepository: Repository<ProductoServicio>,
  ) {}

  async create(data: Partial<ProductoServicio>): Promise<ProductoServicio> {
    const nuevo = this.productoServicioRepository.create(data);
    return await this.productoServicioRepository.save(nuevo);
  }

  async findAll(): Promise<ProductoServicio[]> {
    return await this.productoServicioRepository.find();
  }

  async findOne(id: number): Promise<ProductoServicio> {
    const prodServ = await this.productoServicioRepository.findOne({ 
      where: { id },
      relations: ['subcategorias'], 
    });
    if (!prodServ) {
      throw new NotFoundException(`Producto/Servicio con ID ${id} no encontrado`);
    }
    return prodServ;
  }

  async update(id: number, data: Partial<ProductoServicio>): Promise<ProductoServicio> {
    await this.productoServicioRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productoServicioRepository.delete(id);
  }
}
