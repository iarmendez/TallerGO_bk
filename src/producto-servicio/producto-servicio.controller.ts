import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductoServicioService } from './producto-servicio.service';
import { ProductoServicio } from './entities/producto-servicio.entity';

@Controller('producto-servicio')
export class ProductoServicioController {
  constructor(private readonly service: ProductoServicioService) {}

  @Post()
  async create(@Body() data: Partial<ProductoServicio>): Promise<ProductoServicio> {
    return this.service.create(data);
  }

  @Get()
  async findAll(): Promise<ProductoServicio[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductoServicio> {
    return this.service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<ProductoServicio>,
  ): Promise<ProductoServicio> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }
}