import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    console.log(
      JSON.stringify(createAuthDto)
    );
    return this.authService.create(createAuthDto);
  }

  @Post('sign-in')
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login();
  }
}
