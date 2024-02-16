import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { SupportService } from 'src/support/support.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly supportService: SupportService,
    private jwtService: JwtService,
    private prismService: PrismaService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<any | undefined> {
    const user = await this.prismService.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(user);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    return user;
  }

  async generateJwt(user, res) {
    const payload = {
      email: user.email,
      sub: user.id,
      name: user.firstName,
      type: 'user',
    };

    return res.json({
      access_token: this.jwtService.sign(payload),
    });
  }

  async validateAdmin(
    email: string,
    password: string,
  ): Promise<any | undefined> {
    const admin = await this.adminService.getAdminByEmail(email);

    if (!admin) {
      throw new BadRequestException('Admin not found');
    }

    if (admin.password !== password) {
      throw new BadRequestException('Invalid password');
    }
    return admin;
  }

  async validateSupport(
    email: string,
    password: string,
  ): Promise<any | undefined> {
    const support = await this.supportService.getSupportByEmail(email);
    if (!support) {
      throw new BadRequestException('Support not found');
    }
    if (support.password !== password) {
      throw new BadRequestException('Invalid password');
    }
    return support;
  }

  async generateAdminJwt(admin, res) {
    const payload = {
      email: admin.email,
      sub: admin.id,
      name: admin.firstName,
      type: 'admin',
    };

    return res.json({
      access_token: this.jwtService.sign(payload),
    });
  }

  async generateSupportJwt(support, res) {
    const payload = {
      email: support.email,
      sub: support.id,
      name: support.firstName,
      type: 'support',
    };

    return res.json({
      access_token: this.jwtService.sign(payload),
    });
  }
}
