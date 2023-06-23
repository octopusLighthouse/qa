import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'YOUR_SECRET_KEY', // Replace with your own secret key
    });
  }

  async validate(payload) {
    console.log(`Validation: ${JSON.stringify(payload)}`);
    //const user = await this.authService.validateUserById(payload.sub);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    return {};
  }
}
