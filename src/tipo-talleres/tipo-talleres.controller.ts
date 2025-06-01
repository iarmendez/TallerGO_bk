import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TipoTalleresService } from './tipo-talleres.service';
import { TipoTaller } from './entities/tipo-taller.entity';

@Controller('tipo-talleres')
export class TipoTalleresController {
  constructor(private readonly tipoTalleresService: TipoTalleresService) {}

  @Post()
  async create(@Body() createTipoTallerDto: Partial<TipoTaller>): Promise<TipoTaller> {
    return this.tipoTalleresService.create(createTipoTallerDto);
  }

  @Get()
  async findAll(): Promise<TipoTaller[]> {
    return this.tipoTalleresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TipoTaller> {
    return this.tipoTalleresService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTipoTallerDto: Partial<TipoTaller>,
  ): Promise<TipoTaller> {
    return this.tipoTalleresService.update(id, updateTipoTallerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.tipoTalleresService.remove(id);
  }
}
