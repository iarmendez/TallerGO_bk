// subcategorias-prodserv.module.ts (opcional, solo si necesitas servicios específicos)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoriaProdServ } from './entities/subcategoria-prodserv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubcategoriaProdServ])],
})
export class SubcategoriasProdservModule {}
