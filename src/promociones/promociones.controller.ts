import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PromocionesService } from './promociones.service';
import { Promocion } from './entities/promocion.entity';

@Controller('promociones')
export class PromocionesController {
  constructor(private readonly promocionesService: PromocionesService) {}

  @Post()
  async create(@Body() createPromocionDto: Partial<Promocion>): Promise<Promocion> {
    return this.promocionesService.create(createPromocionDto);
  }

  @Get()
  async findAll(): Promise<Promocion[]> {
    return this.promocionesService.findAll();
  }

  @Get('activas')
  async findActive(): Promise<Promocion[]> {
    return this.promocionesService.findActivePromotions();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Promocion> {
    return this.promocionesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePromocionDto: Partial<Promocion>,
  ): Promise<Promocion> {
    return this.promocionesService.update(id, updatePromocionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.promocionesService.remove(id);
  }
}