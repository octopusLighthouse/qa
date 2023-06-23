import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ProxyController],
  providers: [ProxyService]
})
export class ProxyModule {}
