import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoUsuario } from 'src/tipo-usuarios/entities/tipo-usuario.entity';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import { DataSource, Repository } from 'typeorm';
import LoginRequestDto from './dtos/request/login.dto';
import LoginResponseDto from './dtos/response/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(TipoUsuario)
    private readonly tipoUsuarioRepository: Repository<TipoUsuario>,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        usuario: loginDto.usuario,
        estaEliminado: 'NO',
        estaActivo: 'SI',
      },
      relations: ['tipoUsuario'],
    });
    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    const isValidPassword = await this.dataSource.query(
      'CALL ValidarPwd(?, ?)',
      [usuario.id, loginDto.pwd],
    );
    console.log(isValidPassword);
    if (isValidPassword[0][0].esPwdCorrecto === 'NO') {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    const token = this.jwtService.sign({
      id: usuario.id,
      idTipoUsuario: usuario.tipoUsuario.id,
      usuario: usuario.usuario,
    });
    return new LoginResponseDto({
      id: usuario.id,
      tipoUsuario: usuario.tipoUsuario,
      usuario: usuario.usuario,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      token: token,
    });
  }
}
