export default class UsuarioResponseDto {
  id: number;
  tipoUsuario: {
    id: number;
    nombre: string;
  };
  usuario: string;
  nombres: string;
  apellidos: string;
  estaActivo: string;

  constructor(partial: Partial<UsuarioResponseDto>) {
    Object.assign(this, partial);
  }
}
