import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

enum Role {
  MASTER = 'master',
  ADMIN = 'admin',
  USER = 'user',
}

class User {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  constructor(auth: {email: string, hash: string, role: Role}) {
    this.id = uuidv4();
    this.email = auth.email;
    this.passwordHash = auth.hash;
    this.role = auth.role;
  }
}

@Injectable()
export class AuthService {
  private systemUsers: User[] = [];  
  constructor(private readonly jwtService: JwtService) {}

  async hashing(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);  
    } catch (error) {
      throw new Error(`Name: ${error.name}, message: ${error.message}, password: ${password}`);
    }
  }

  async register(createAuthDto: CreateAuthDto) {
    if (this.systemUsers.some(user => user.email === createAuthDto.email)) {
      throw new Error('user error');
    }

    const hashedPassword = await this.hashing(createAuthDto.password);
    console.log(`Password ${createAuthDto.password} hash is ${hashedPassword}.`);

    const user = new User({
      email: createAuthDto.email,
      hash: hashedPassword,
      role: Role.MASTER,
    });
    this.systemUsers.push(user);

    console.table(this.systemUsers);
    return {};
  }

  async login(email: string, password: string) {
    const user: User | undefined = this.systemUsers.find(user => user.email === email);
    if (!user) throw new Error('user exist error');
    const hh = await this.hashing(password);
    console.log(`Hash existed in db: ${user.passwordHash}, Hashed on check: ${hh}`);
    // if (user.passwordHash !== await this.hashing(password)) throw new Error('user hash error');

    if (!await(bcrypt.compare(password, user.passwordHash))) throw new Error(`bsc`);

    const token = await this.generateToken(user);
    return {
      token,
    };
  }

  async generateToken(user: User): Promise<string> {
    console.log(JSON.stringify(user));
    return await this.jwtService.signAsync({ id: user.id });
  }

  async jwtTokenCheck(token) {
    try {
      const decoded = this.jwtService.verify(token['authorization']?.split(' ')[1]);
      const user: User | undefined = this.systemUsers.find(user => user.id === decoded.id);

      if (!user) throw new Error('no such user');
      return {
        permision: 'allowed',
        userId: user.id,
        email: user.email,
        role: user.role,
      }

      
    } catch (error) {
      throw new Error('jwt error');
    }
  }
}
