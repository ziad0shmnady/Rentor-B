import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';


import { LocalStrategy } from './local.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import{JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from './jwt.startegy';

import{JwtAuthGuard} from './jwt-auth.guard';
@Module({
  imports: [PassportModule,UserModule,JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' },
  })],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService,JwtStrategy],
})
export class AuthModule {}
