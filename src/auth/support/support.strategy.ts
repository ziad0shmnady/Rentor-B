import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
@Injectable()
export class SupportStrategy extends PassportStrategy(Strategy, 'support') {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(email: string, password: string): Promise<any> {
    const support = await this.authService.validateSupport(email, password);
    if (!support) {
      throw new UnauthorizedException();
    }
    return support;
  }
}
