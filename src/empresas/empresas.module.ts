import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { Empresa } from './entities/empresas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa])],
  providers: [EmpresasService],
  controllers: [EmpresasController],
})
export class EmpresasModule {}