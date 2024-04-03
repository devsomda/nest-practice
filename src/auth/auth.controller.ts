import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, signupDto } from './auth.dto';
import { AuthGuard } from './auth.guard';

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

  @UseGuards(AuthGuard)
  @Get('login')
  async helloUser(@Request() req) {
    return this.authService.helloUser(req.user);
  }
}
