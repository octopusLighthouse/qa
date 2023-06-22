import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return {};
  }

  login() {
    return {
      token: 'jwerjwoeijfoijfwjefoiwejoiwjoijojoi32432j4oijjfsdofjsoijdf'
    };
  }
}
