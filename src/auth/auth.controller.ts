import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, signupDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userData: signupDto) {
    return this.authService.signup(userData);
  }

  @Post('login')
  async login(@Body() userData: loginDto) {
    return this.authService.login(userData);
  }
}
