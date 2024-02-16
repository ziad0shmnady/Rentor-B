import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { LocalStrategy } from './user/local.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.startegy';

import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminStrategy } from './admin/admin.strategy';
import { AdminService } from 'src/admin/admin.service';
import { AdminModule } from 'src/admin/admin.module';
import { SupportStrategy } from './support/support.strategy';
import { SupportService } from 'src/support/support.service';
@Module({
  imports: [
    PassportModule,
    UserModule,

    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AdminStrategy,
    SupportStrategy,
    AdminService,
    SupportService,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
