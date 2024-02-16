import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AdminService {
  constructor(private prismService: PrismaService) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<CreateAdminDto> {
    try {
      //check if admin already exists
      const emailExists = await this.prismService.admin.findUnique({
        where: {
          email: createAdminDto.email,
        },
        select: {
          email: true,
        },
      });

      if (emailExists) {
        throw new HttpException(
          'Email is already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const admin = await this.prismService.admin.create({
        data: {
          ...createAdminDto,
        },
      });
      console.log(admin);
      return admin;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<CreateAdminDto[]> {
    try {
      const admin = await this.prismService.admin.findMany();
      return admin;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async getAdminByEmail(email: string): Promise<any> {
    try {
      console.log(email);
      const admin = await this.prismService.admin.findUnique({
        where: {
          email,
        },
      });

      if (!admin) {
        return 'Admin not found';
      }

      return admin;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
