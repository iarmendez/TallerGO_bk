import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoTalleresService } from './tipo-talleres.service';
import { TipoTalleresController } from './tipo-talleres.controller';
import { TipoTaller } from './entities/tipo-taller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoTaller])],
  providers: [TipoTalleresService],
  controllers: [TipoTalleresController],
})
export class TipoTalleresModule {}
