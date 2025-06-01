import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoriasService } from './sub-categorias.service';
import { SubCategoriasController } from './sub-categorias.controller';
import { SubCategoria } from './entities/sub-categoria.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { SubcategoriaProdServ } from '../subcategorias-prodserv/entities/subcategoria-prodserv.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubCategoria, Categoria, SubcategoriaProdServ]),
  ],
  providers: [SubCategoriasService],
  controllers: [SubCategoriasController],
})
export class SubCategoriasModule {}