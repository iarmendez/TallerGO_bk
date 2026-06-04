import { Module } from '@nestjs/common';
import { TipoUsuariosService } from './tipo-usuarios.service';
import { TipoUsuariosController } from './tipo-usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUsuario } from './entities/tipo-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoUsuario])],
  providers: [TipoUsuariosService],
  controllers: [TipoUsuariosController],
})
export class TipoUsuariosModule {}
