import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { TalleresService } from './talleres.service';
import { Taller } from './entities/talleres.entity';

@Controller('talleres')
export class TalleresController {
  constructor(private readonly talleresService: TalleresService) { }

  @Post()
  async create(@Body() createTallerDto: Partial<Taller>): Promise<Taller> {
    return this.talleresService.create(createTallerDto);
  }

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('maxDistance') maxDistance?: number,
    @Query('latitud') latitude?: number,
    @Query('longitud') longitude?: number,
  ): Promise<Taller[]> {
    return this.talleresService.findSearch(
      search,
      maxDistance,
      latitude,
      longitude,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Taller> {
    return this.talleresService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTallerDto: Partial<Taller>,
  ): Promise<Taller> {
    return this.talleresService.update(id, updateTallerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.talleresService.remove(id);
  }
}
