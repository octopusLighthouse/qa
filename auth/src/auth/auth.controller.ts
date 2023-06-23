import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() createAuthDto: CreateAuthDto) {
    console.log(
      JSON.stringify(createAuthDto)
    );
    return await this.authService.register(createAuthDto);
  }

  @Post('sign-in')
  async signIn(@Body() createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    return await this.authService.validateUser(email, password);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return {
      permision: 'allowed',
      userId: '1',
    }
  }
}
