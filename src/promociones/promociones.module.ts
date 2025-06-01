import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromocionesService } from './promociones.service';
import { PromocionesController } from './promociones.controller';
import { Promocion } from './entities/promocion.entity';
import { Taller } from '../talleres/entities/talleres.entity';
import { ProductoServicio } from '../producto-servicio/entities/producto-servicio.entity';
import { Etiqueta } from '../etiquetas/entities/etiqueta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Promocion, Taller, ProductoServicio, Etiqueta]),
  ],
  providers: [PromocionesService],
  controllers: [PromocionesController],
})
export class PromocionesModule {}