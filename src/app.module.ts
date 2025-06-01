import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductoServicioModule } from './producto-servicio/producto-servicio.module';
import { TalleresModule } from './talleres/talleres.module';
import { EmpresasModule } from './empresas/empresas.module';
import { TipoTalleresModule } from './tipo-talleres/tipo-talleres.module';
import { CategoriasModule } from './categorias/categorias.module';
import { SubCategoriasModule } from './sub-categorias/sub-categorias.module';
import { PromocionesModule } from './promociones/promociones.module';
import { EtiquetasModule } from './etiquetas/etiquetas.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Solo en desarrollo
      }),
      inject: [ConfigService],
    }), ProductoServicioModule, TalleresModule, EmpresasModule, TipoTalleresModule, CategoriasModule, SubCategoriasModule, PromocionesModule, EtiquetasModule,
  ],
})
export class AppModule {}
