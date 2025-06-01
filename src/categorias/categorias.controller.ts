import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Categoria } from './entities/categoria.entity';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  async create(@Body() createCategoriaDto: Partial<Categoria>): Promise<Categoria> {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  async findAll(): Promise<Categoria[]> {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Categoria> {
    return this.categoriasService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoriaDto: Partial<Categoria>,
  ): Promise<Categoria> {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoriasService.remove(id);
  }
}