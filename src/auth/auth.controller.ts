import { Controller, Request, Post, UseGuards, Get, Res } from '@nestjs/common';
import { LocalAuthGuard } from './user/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminAuthGuard } from './admin/admin-auth.guard';
import { SupportAuthGuard } from './support/support-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('user/login')
  async login(@Request() req, @Res() res): Promise<any> {
    return this.authService.generateJwt(req.user, res);
  }
  @UseGuards(AdminAuthGuard)
  @Post('admin/login')
  async adminLogin(@Request() req, @Res() res): Promise<any> {
    return this.authService.generateJwt(req.user, res);
  }
  @UseGuards(SupportAuthGuard)
  @Post('support/login')
  async supportLogin(@Request() req, @Res() res): Promise<any> {
    return this.authService.generateJwt(req.user, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Request() req): Promise<any> {
    return req.user;
  }
}
