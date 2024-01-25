import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<any | undefined> {
    const user = await this.userService.getUserByEmail(email);

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
}
