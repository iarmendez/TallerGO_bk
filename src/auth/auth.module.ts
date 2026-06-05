import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TipoUsuario } from 'src/tipo-usuarios/entities/tipo-usuario.entity';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'default_secret',
        // signOptions: { expiresIn: '8h' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Usuario, TipoUsuario]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
