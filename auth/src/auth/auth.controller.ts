import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
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
    return await this.authService.login(email, password);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
<<<<<<< HEAD
  async findAll() {
    return {
      permision: 'allowed',
      userId: '2',
    }
=======
  async findAll(@Req() req: Request) {
    const { headers } = req;
    return await this.authService.jwtTokenCheck(headers);
>>>>>>> 23f5aa08425426f97af13915982a41603195df57
  }
}
