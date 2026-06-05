import { TipoUsuario } from 'src/tipo-usuarios/entities/tipo-usuario.entity';

export default class LoginResponseDto {
  id: number;
  tipoUsuario: TipoUsuario;
  usuario: string;
  nombres: string;
  apellidos: string;
  token: string;

  constructor(partial: Partial<LoginResponseDto>) {
    Object.assign(this, partial);
  }
}
