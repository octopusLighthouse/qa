import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

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

  @Get(':token')
  async findAll(
    @Param('token') token: string,
  ) {
    return {
      permision: 'allowed',
      userId: '1',
    }
  }
}
