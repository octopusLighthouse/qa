import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(createAuthDto: CreateAuthDto) {
    return {};
  }

  async login() {
    return {
      token: 'jwerjwoeijfoijfwjefoiwejoiwjoijojoi32432j4oijjfsdofjsoijdf'
    };
  }

  async validateUser(email: string, password: string) {
    let user = undefined;
    if (email.includes('@gmail.com')) {
      user = {
        id: 1,
      }
    }
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = await this.generateToken(user);
    return { token };
  }

  async generateToken(user: { id: string}): Promise<string> {
    const payload = { userId: user.id };
    return this.jwtService.signAsync(payload);
  }
}
