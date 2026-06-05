import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginRequestDto from './dtos/request/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginRequestDto) {
    return this.authService.login(loginDto);
  }
}
