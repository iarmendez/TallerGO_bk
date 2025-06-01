import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { Empresa } from './entities/empresas.entity';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  async create(@Body() createEmpresaDto: Partial<Empresa>): Promise<Empresa> {
    return this.empresasService.create(createEmpresaDto);
  }

  @Get()
  async findAll(): Promise<Empresa[]> {
    return this.empresasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Empresa> {
    return this.empresasService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEmpresaDto: Partial<Empresa>,
  ): Promise<Empresa> {
    return this.empresasService.update(id, updateEmpresaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.empresasService.remove(id);
  }
}