import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class SupportService {
  constructor(private prismService: PrismaService) {}
  //
  async createSupport(
    createSupportDto: CreateSupportDto,
  ): Promise<CreateSupportDto> {
    try {
      //check if support already exists
      const emailExists = await this.prismService.support.findUnique({
        where: {
          email: createSupportDto.email,
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
      const support = await this.prismService.support.create({
        data: {
          ...createSupportDto,
        },
      });
      return support;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<CreateSupportDto[]> {
    try {
      const support = await this.prismService.support.findMany();
      return support;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: string): Promise<CreateSupportDto> {
    try {
      const support = this.prismService.support.findUnique({
        where: {
          id,
        },
      });
      return support;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    updateSupportDto: UpdateSupportDto,
  ): Promise<UpdateSupportDto> {
    try {
      const support = await this.prismService.support.update({
        where: {
          id,
        },
        data: {
          ...updateSupportDto,
        },
      });
      return support;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<CreateSupportDto> {
    try {
      const support = this.prismService.support.delete({
        where: {
          id,
        },
      });
      return support;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getSupportByEmail(email: string): Promise<any> {
    try {
      const support = await this.prismService.support.findUnique({
        where: {
          email: email,
        },
      });

      if (!support) {
        return 'support not found';
      }
      return support;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
