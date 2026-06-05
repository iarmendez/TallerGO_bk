import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TipoUsuariosService } from './tipo-usuarios.service';
import { TipoUsuario } from './entities/tipo-usuario.entity';

@Controller('tipo-usuarios')
export class TipoUsuariosController {
  constructor(private readonly tipoUsuariosService: TipoUsuariosService) {}

  @Get()
  async findAll() {
    return this.tipoUsuariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tipoUsuariosService.findOne(id);
  }

  @Post()
  async create(@Body() createTipoUsuarioDto: Partial<TipoUsuario>) {
    return this.tipoUsuariosService.create(createTipoUsuarioDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTipoUsuarioDto: Partial<TipoUsuario>,
  ) {
    return this.tipoUsuariosService.update(id, updateTipoUsuarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.tipoUsuariosService.remove(id);
  }
}
