import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './user.dto';
@Injectable()
export class UserService {
  constructor(private prismService: PrismaService) {}
  async createUser(req, res, User): Promise<UserDto> {
    try {
      const salt = await bcrypt.genSalt();
      //check if user already exists

      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const user = await this.prismService.user.create({
        data: {
          ...User,
          password: hashPassword,
        },
      });
      return res.status(HttpStatus.CREATED).send(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    try {
      const user = await this.prismService.user.findUnique({
        where: {
          email: email,
        },
      });
      // console.log(user);
      if (!user) {
        return 'User not found';
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getAdminByEmail(email: string): Promise<any> {
    try {
      const user = await this.prismService.user.findUnique({
        where: {
          email: email,
        },
      });
      console.log(user);
      if (!user) {
        return 'User not found';
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(req, res, id) {
    try {
      const user = await this.prismService.user.findUnique({
        where: {
          id: id,
        },
      });
      return res.status(HttpStatus.OK).send(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getAllUsers(req, res, filter_name, sort_type): Promise<UserDto> {
    try {
      const users = await this.prismService.user.findMany({
        where: {
          firstName: {
            contains: filter_name,
            mode: 'insensitive',
          },
        },
        orderBy: {
          createdAt: sort_type,
        },
      });

      // check if user returm empty array
      if (users.length === 0) {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND);
      }

      return res.status(HttpStatus.OK).send(users);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async updateUser(req, res, id, UpdateUserDto): Promise<UserDto> {
    try {
      //check if user exists
      const userExists = await this.prismService.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!userExists) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const user = await this.prismService.user.update({
        where: {
          id: id,
        },
        data: {
          ...UpdateUserDto,
        },
      });
      return res.status(HttpStatus.OK).send(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  //delete user
  async deleteUser(req, res, id): Promise<UserDto> {
    try {
      //check if user exists
      const userExists = await this.prismService.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!userExists) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const user = await this.prismService.user.delete({
        where: {
          id: id,
        },
      });
      return res.status(HttpStatus.OK).send('User deleted successfully');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // switch to user
  async getUser(req, res) {
    const userId = req.user.userId;
    console.log(req.user.type);
    const user = await this.prismService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    return res.status(200).json({
      message: 'User found',
      data: user,
      newToken: res.locals.newToken,
    });
  }
}
