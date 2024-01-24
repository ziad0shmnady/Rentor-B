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

  async getUserByEmail(email: string) {
    try {
      const user = await this.prismService.user.findUnique({
        where: {
          email: email,
        },
      });
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
      console.log(filter_name);
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
  async updateUser(user_Id,req, res, UpdateUserDto): Promise<UserDto> {
    try {
      
      //check if user exists
      const userExists = await this.prismService.user.findUnique({
        where: {
          id: req.user.userId,
        },
      });
      if (!userExists) {
        var userId = user_Id;
      } else {
        var userId = req.user.userId;
      }
      const user = await this.prismService.user.update({
        where: {
          id: userId,
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


}
