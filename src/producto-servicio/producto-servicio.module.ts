import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoServicio } from './entities/producto-servicio.entity';
import { ProductoServicioService } from './producto-servicio.service';
import { ProductoServicioController } from './producto-servicio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoServicio])],
  providers: [ProductoServicioService],
  controllers: [ProductoServicioController],
})
export class ProductoServicioModule {}
