import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { UsuariosModule } from './usuarios/usuarios.module';
import { TipoUsuariosModule } from './tipo-usuarios/tipo-usuarios.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './common/middlewares/jwt/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';

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
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'default_secret',
        // signOptions: { expiresIn: '8h' },
      }),
      inject: [ConfigService],
    }),
    ProductoServicioModule,
    TalleresModule,
    EmpresasModule,
    TipoTalleresModule,
    CategoriasModule,
    SubCategoriasModule,
    PromocionesModule,
    EtiquetasModule,
    UsuariosModule,
    TipoUsuariosModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/usuarios', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
