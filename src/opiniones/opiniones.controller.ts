import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { OpinionesService } from './opiniones.service';

@Controller('opiniones')
export class OpinionesController {
  constructor(private readonly opinionesService: OpinionesService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body('idtaller', ParseIntPipe) idtaller: number,
    @Body('estrellas', ParseIntPipe) estrellas: number,
    @Body('comentarios') comentarios?: string,
  ) {
    const userId = req['user'].id;
    return this.opinionesService.create(
      userId,
      idtaller,
      estrellas,
      comentarios,
    );
  }

  @Get()
  async findAll(
    @Query('idtaller') idtaller?: string,
    @Query('idusuario') idusuario?: string,
  ) {
    return this.opinionesService.findAll(
      idtaller ? Number(idtaller) : undefined,
      idusuario ? Number(idusuario) : undefined,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.opinionesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Body() updateDto: { estrellas?: number; comentarios?: string },
  ) {
    const userId = req['user'].id;
    return this.opinionesService.update(id, userId, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const userId = req['user'].id;
    await this.opinionesService.remove(id, userId);
    return { message: 'Reseña eliminada con éxito' };
  }
}
