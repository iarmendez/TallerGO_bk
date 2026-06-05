import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  @Post()
  async create(@Body() usuarioData: Partial<Usuario>) {
    return this.usuariosService.create(usuarioData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<Usuario>) {
    return this.usuariosService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usuariosService.remove(id);
  }
}
