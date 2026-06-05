import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuarios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUsuario } from 'src/tipo-usuarios/entities/tipo-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, TipoUsuario])],
  providers: [UsuariosService],
  controllers: [UsuariosController],
})
export class UsuariosModule {}
