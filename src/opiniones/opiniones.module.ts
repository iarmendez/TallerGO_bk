import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpinionesController } from './opiniones.controller';
import { OpinionesService } from './opiniones.service';
import { Opinion } from './entities/opinion.entity';
import { Taller } from '../talleres/entities/talleres.entity';
import { Usuario } from '../usuarios/entities/usuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Opinion, Taller, Usuario])],
  controllers: [OpinionesController],
  providers: [OpinionesService],
  exports: [OpinionesService],
})
export class OpinionesModule {}
