import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SubCategoriasService } from './sub-categorias.service';
import { SubCategoria } from './entities/sub-categoria.entity';

@Controller('sub-categorias')
export class SubCategoriasController {
  constructor(private readonly subCategoriasService: SubCategoriasService) {}

  @Post()
  async create(@Body() createSubCategoriaDto: Partial<SubCategoria>): Promise<SubCategoria> {
    return this.subCategoriasService.create(createSubCategoriaDto);
  }

  @Get()
  async findAll(): Promise<SubCategoria[]> {
    return this.subCategoriasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SubCategoria> {
    return this.subCategoriasService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSubCategoriaDto: Partial<SubCategoria>,
  ): Promise<SubCategoria> {
    return this.subCategoriasService.update(id, updateSubCategoriaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.subCategoriasService.remove(id);
  }
}