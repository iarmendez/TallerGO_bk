import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalleresService } from './talleres.service';
import { TalleresController } from './talleres.controller';
import { Taller } from './entities/talleres.entity';
import { Empresa } from '../empresas/entities/empresas.entity'; // Asegúrate de importar las entidades relacionadas
import { TipoTaller } from '../tipo-talleres/entities/tipo-taller.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Taller, Empresa, TipoTaller]), // 👈 Registra todas las entidades usadas
  ],
  providers: [TalleresService],
  controllers: [TalleresController],
})
export class TalleresModule {}