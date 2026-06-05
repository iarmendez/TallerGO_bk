import { IsString } from 'class-validator';

export default class LoginRequestDto {
  @IsString({
    message: 'El usuario debe ser una cadena de texto',
  })
  usuario: string;
  @IsString({
    message: 'La contraseña debe ser una cadena de texto',
  })
  pwd: string;

  constructor(partial: Partial<LoginRequestDto>) {
    Object.assign(this, partial);
  }
}
