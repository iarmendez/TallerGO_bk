import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categoria } from './entities/categoria.entity';
import { Taller } from '../talleres/entities/talleres.entity';
import { SubCategoria } from '../sub-categorias/entities/sub-categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria, Taller, SubCategoria]),
  ],
  providers: [CategoriasService],
  controllers: [CategoriasController],
})
export class CategoriasModule {}